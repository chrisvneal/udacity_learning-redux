function createStore() {
  // manage the state
  // provide API  to get access to state
  // listen to changes on state
  // update state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter((l) => {
        l !== listener;
      });
    };
  };

  return {
    getState,
    subscribe,
  };
}
