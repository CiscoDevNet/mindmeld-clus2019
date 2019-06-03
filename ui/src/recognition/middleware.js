import actions from '_common/actions';
import * as RECOGNITION from './constants';
import * as recognition from './speech-recognition';


export default store => next => async action => {
  switch (action.type) {
    case RECOGNITION.START: {
      store.dispatch(actions.recognition.onStart());

      try {
        const transcripts = await recognition.recognize();
        store.dispatch(actions.recognition.onEnd(transcripts));
        if (action.handler) {
          action.handler(transcripts);
        }
      } catch (error) {
        store.dispatch(actions.recognition.onError(error));
      }
    }
  }

  return next(action);
};
