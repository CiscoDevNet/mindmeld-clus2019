import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import recognition from 'recognition/middleware';
import app from 'app/middleware';


export default [
  createLogger(),
  thunk,
  recognition,
  app,
];
