import * as RECOGNITION from './constants';


export const start = (handler) => {
  return {
    type: RECOGNITION.START,
    handler,
  };
};

export const onStart = () => {
  return {
    type: RECOGNITION.ON_START,
  };
};

export const onEnd = (transcripts) => {
  return {
    type: RECOGNITION.ON_END,
    transcripts,
  };
};

export const onError = () => {
  return {
    type: RECOGNITION.ON_ERROR,
  };
};
