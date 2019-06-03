import actions from '_common/actions';
import * as RECOGNITION from './constants';
import * as recognition from './speech-recognition';
import GoogleAsr from './google-asr';

const asr = new GoogleAsr();

export default store => next => async action => {
  switch (action.type) {
    case RECOGNITION.START: {
      store.dispatch(actions.recognition.onStart());

      const key = process.env.GOOGLE_KEY || null;
      asr.key = key;
      asr.maxTranscripts = process.env.MAX_ALTERNATIVES || 8;

      try {
        let transcripts = [];
        if (key) {
          transcripts = await asr.recognize();
        } else {
          console.log("Using webkitSpeechRecognition.")
          transcripts = await recognition.recognize();
        }
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
