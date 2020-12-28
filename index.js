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

function goals(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);

    case "REMOVE_GOAL":
      return state.filter((goal) => goal.id !== action.id);

    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.todos, action),
  };
}

const store = createStore(app);

store.subscribe(() => {
  console.log("The new state is: " + store.getState());
});

// example dispatch() calls

function addTodoAction(todo) {
  return {
    type: "ADD_TODO",
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: "REMOVE_TODO",
    id,
  };
}

function toggleTodoAction(id) {
  return {
    type: "TOGGLE_TODO",
    id,
  };
}

function addGoalAction(goal) {
  return {
    type: "ADD_GOAL",
    goal,
  };
}

function removeGoalAction(id) {
  return {
    type: "REMOVE_GOAL",
    id,
  };
}

store.dispatch(
  addTodoAction({
    id: 0,
    name: "Learn Redux",
    complete: false,
  })
);

store.dispatch(
  addTodoAction({
    id: 1,
    name: "Dinner w/ Nicole",
    complete: false,
  })
);

store.dispatch(
  addTodoAction({
    id: 2,
    name: "Shop at Walmart",
    complete: false,
  })
);

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(
  addGoalAction({
    id: 0,
    name: "Get with Shannon",
  })
);

store.dispatch(
  addGoalAction({
    id: 1,
    name: "Get with Lisa",
  })
);

store.dispatch(removeGoalAction(1));
