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
