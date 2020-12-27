// Library Code
function createStore(reducer) {
  // create state variable
  let state;
  let listeners = [];

  // access the current state
  const getState = () => state;

  // subscribe to state updates
  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners.filter((l) => l !== listener);
    };
  };

  // update state with  dispatch function
  const dispatch = (action) => {
    state = reducer((state = []), action);
    listeners.forEach((listener) => listener());
  };

  // return all user variables
  return { getState, subscribe, dispatch };
}

// App Code

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);

    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );

    default:
      return state;
  }

  const store = createStore(todos);

  store.subscribe(() => {
    console.log("The new state is: " + store.getState());
  });

  const unsubscribe = store.subscribe(() => {
    console.log("The store changed");
  });
}

const store = createStore(todos);

store.subscribe(() => {
  console.log("The new state is: " + store.getState());
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false,
  },
});

// example dispatch() call
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 1,
    name: "Learn Redux",
    complete: false,
  },
});
