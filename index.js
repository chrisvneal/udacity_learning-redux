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
  };

  return {
    getState,
    subscribe,
  };
}

const store = createStore();

store.subscribe(() => {
  console.log("The new state is: " + store.getState());
});

store.subscribe(() => {
  console.log("The store changed!");
});
