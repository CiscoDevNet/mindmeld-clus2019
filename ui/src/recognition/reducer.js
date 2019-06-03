import * as RECOGNITION from './constants';


const initialState = {
  enabled: ('webkitSpeechRecognition' in window),
  recognizing: false,
};

export const recognition = (state = initialState, action) => {
  switch (action.type) {
    case RECOGNITION.ON_START: {
      return {
        ...state,
        recognizing: true,
      };
    }

    case RECOGNITION.ON_END: {
      return {
        ...state,
        recognizing: false,
      };
    }

    case RECOGNITION.ON_ERROR: {
      return {
        ...state,
        recognizing: false,
      };
    }

    default:
      return state;
  }
};
