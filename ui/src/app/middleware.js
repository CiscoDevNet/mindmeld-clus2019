import actions from '_common/actions';
import * as APP from './constants';

import { query as apiQuery } from './api';

const DEFAULT_CONTEXT = {
  "capabilities": {
    "camera": true,
    "display": true,
    "hintConfigs": true,
    "whiteboard": false,
    "wiredScreenShare": true
  },
  "deviceFamily": "Room Kit",
  "deviceName": "Mac Assistant UI",
  "isBluetoothEnabled": false,
  "isMicMutable": false,
  "isScreenShareActive": false,
  "isWiredForScreenShare": false,
  "maxPnelResult": 100,
  "numWhiteboards": 0,
  "whiteboardIsOpen": false,
  "supportedDirectives": [
    "set-volume",
    "start-screen-sharing",
    "start-recording",
    "disable-do-not-disturb",
    "enable-speaker-tracking",
    "pmr-carousel",
    "ignore-call",
    "turn-on-selfview",
    "delete-whiteboard",
    "minimize-selfview",
    "mute-microphone",
    "call-pstn",
    "user-carousel",
    "reply",
    "end-call",
    "unmute-microphone",
    "join-meeting",
    "decrease-volume",
    "enable-bluetooth",
    "ui-hint",
    "speak",
    "accept-call",
    "meeting-carousel",
    "listen",
    "sleep",
    "stop-recording",
    "disable-speaker-tracking",
    "find-available-rooms",
    "enable-camera",
    "help",
    "enable-do-not-disturb",
    "enable-speakers",
    "save-whiteboard",
    "delete-all-whiteboards",
    "create-whiteboard",
    "display-information-page",
    "confirm-item",
    "disable-camera",
    "increase-volume",
    "initial-view",
    "page-down",
    "add-person-to-call",
    "maximize-selfview",
    "page-up",
    "asr-hint",
    "check-room-availability",
    "select-item",
    "open-whiteboard",
    "close-whiteboard",
    "disable-speakers",
    "reject-call",
    "turn-off-selfview",
    "call-person",
    "disable-bluetooth",
    "stop-screen-sharing",
    "join-pmr",
    "whiteboard-carousel"
  ]
};

export default store => next => async action => {
  switch (action.type) {
    case APP.EXECUTE_QUERY: {
      const dateTime = Date.now();
      const timestamp = Math.floor(dateTime / 1000);

      const state = store.getState();
      const { query, frame, history, params } = state.app;
      params['timestamp'] = timestamp;
      params['time_zone'] = "Europe/Brussels";
      const body = {
        text: query,
        context: DEFAULT_CONTEXT,
        frame,
        history,
        params
      };

      return await makeQuery(body, store.dispatch);
    }
  }

  return next(action);
};

const makeQuery = async (body, dispatch) => {
  dispatch(actions.app.onExecuteQueryStart());

  try {
    const result = await apiQuery(body);
    return dispatch(actions.app.onExecuteQueryEnd(result));
  } catch (error) {
    return dispatch(actions.app.onExecuteQueryError(error));
  }
};
