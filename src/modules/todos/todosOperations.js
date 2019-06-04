import * as actions from "./todosActions";

export function addTodo(todo) {
  return async function addTodoThunk(dispatch, getState) {
    try {
      dispatch(actions.addToDo.start());
    } catch (err) {}
  };
}

export { actions };
