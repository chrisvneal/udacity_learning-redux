function createStore() {
  // manage the state
  // provide API  to get access to state
  // listen to changes on state
  // update state

  let state;

  const getState = () => state;

  return {
    getState,
  };
}
