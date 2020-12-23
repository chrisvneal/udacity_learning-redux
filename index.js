function createStore() {
  let state;

  const getState = () => state;

  return { getState };
}

const store = createStore();

store.subscribe(() => {
  console.log("The new state is: " + store.getState());
});

store.subscribe(() => {
  console.log("The strore changed");
});
