import store from 'store';


export const getState = (key) => {
  return store.get(key) || {};
};

export const getInitialState = (key, toExtend) => {
  const storedState = getState(key);
  return {
    ...toExtend,
    ...storedState,
  };
};

// TODO: Turn this into a middleware
export const saveState = (key, state) => {
  store.set(key, state);
  return state;
};

export const getSaveState = (key) => {
  return (state) => {
    return saveState(key, state);
  };
};

export function getQueueSave(saveFunction, keys) {
  let saveTimeout = 0;

  return function(options={}) {
    clearTimeout(saveTimeout);
    const timeout = typeof(options.timeout) === 'undefined' ? 500 : options.timeout;

    saveTimeout = setTimeout(function() {
      let saveState = {};
      const extension = options.extension || {};
      for (let key of (keys || Object.keys(this.state))) {
        saveState[key] = this.state[key];
      }
      saveState = {
        ...saveState,
        ...extension,
      };

      saveFunction(saveState);
    }.bind(this), timeout);
  };
}
