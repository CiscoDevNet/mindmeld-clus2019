import { combineReducers } from 'redux';

import { recognition } from 'recognition/reducer';
import { app } from 'app/reducer';


export default combineReducers({
  recognition,
  app,
});
