import actions from '_common/actions';
import * as APP from './constants';

import { query as apiQuery } from './api';

const DEFAULT_CONTEXT = {
};

export default store => next => async action => {
  switch (action.type) {
    case APP.EXECUTE_QUERY: {
      const state = store.getState();
      const { query, frame, history, params } = state.app;
      const body = {
        text: query,
        context: DEFAULT_CONTEXT,
        frame,
        history,
        params,
        verbose: true,
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
