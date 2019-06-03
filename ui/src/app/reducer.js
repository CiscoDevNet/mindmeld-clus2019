import { getInitialState, getSaveState } from '_common/stores/util';
import { APP } from '_common/constants';


const APP_KEY = 'app';
const initialResult = {
  domain: null,
  intent: null,
  entities: [],
  scores: {
    domains: {},
    intents: {},
  },
};
const initialState = getInitialState(APP_KEY, {
  query: '',
  executingQuery: false,
  error: '',
  result: null,
  conversation: [],
  frame: {},
  history: [],
  params: {},
});

const getPreviousPage = (conversation) => {
  for (let i = conversation.length - 1; i >= 0; i--) {
    const turn = conversation[i];
    for (let j = 0; j < turn.directives.length; j++) {
      const directive = turn.directives[j];
      if ((directive.name === 'user-carousel') || (directive.name === 'pmr-carousel')) {
        let previousPage = 0;
        if ('currentPage' in directive) {
          return directive.currentPage;
        }
        return previousPage;
      }
    }
  }
  return 0;
};

const injectCarousel = (response, previousPage) => {
  let newResponse = JSON.parse(JSON.stringify(response));
  let addCarousel = false;
  let nextPage = previousPage;
  const maxPages = parseInt(newResponse.frame.carousel.payload.length/4);
  console.log(maxPages);
  newResponse.directives.map((directive) => {
    if (directive.name === 'page-up') {
      addCarousel = true;
      if (nextPage < maxPages) {
        nextPage = nextPage + 1;
      }
    }
    if (directive.name === 'page-down') {
      addCarousel = true;
      if (nextPage > 0) {
        nextPage = nextPage - 1;
      }
    }
  });

  if (addCarousel) {
    newResponse.frame.carousel['currentPage'] = nextPage;
    newResponse.directives.push(newResponse.frame.carousel);
  }

  return newResponse;
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case APP.UPDATE_QUERY: {
      return {
        ...state,
        query: action.query,
      };
    }


    case APP.ON_EXECUTE_QUERY_START: {
      return {
        ...state,
        executingQuery: true,
      };
    }

    case APP.ON_EXECUTE_QUERY_END: {
      let response = {...action.data.response};

      // If page-up or page-down directive present, inject
      // a carousel directive for the UI. We also inject the
      // page to be displayed to the carousel.
      if ('payload' in response.frame.carousel) {
        let previousPage = getPreviousPage(state.conversation);
        response = injectCarousel(response, previousPage);
      }

      let conversation = [
        ...(state.conversation || []),
        response,
      ];

      return {
        ...state,
        executingQuery: false,
        result: {
          ...initialResult,
          ...action.data,
        },
        conversation,
        frame: response.frame,
        history: response.history,
        params: response.params,
      };
    }

    case APP.RESET_STATE: {

      return {
        ...state,
        query: '',
        executingQuery: false,
        error: '',
        result: null,
        conversation: [],
        frame: {},
        history: [],
        params: {},
      };
    }

    case APP.ON_EXECUTE_QUERY_ERROR: {
      return {
        ...state,
        executingQuery: false,
        result: null,
        error: action.error
      };
    }

    default:
      return state;
  }
};
