import * as actions from "./todosActions";
import Api from "../../api/Api";

export function addToDo(todo) {
  return async function addToDoThunk(dispatch, getState) {
    try {
      dispatch(actions.addToDo.start());
      dispatch(actions.addToDo.success(todo));
      await Api.add(todo);
    } catch (err) {
      dispatch(actions.addToDo.error());
    }
  };
}
export function removeTodo(todo) {
  return async function removeTodoThunk(dispatch, getState) {
    try {
      dispatch(actions.removeTodo.start());
      dispatch(actions.removeTodo.success(todo));
      await Api.remove(todo);
    } catch (err) {
      dispatch(actions.removeTodo.error());
    }
  };
}

export function listTodos(todos) {
  return async function listTodoThunk(dispatch, getState) {
    try {
      dispatch(actions.listTodos.start());
      const res = await Api.getAll(todos);
      dispatch(actions.listTodos.success(res));
    } catch (err) {
      dispatch(actions.listTodos.error(err));
    }
  };
}

export function changeTodoStatus(todo) {
  return async function changeTodoStatusThunk(dispatch, getState) {
    try {
      dispatch(actions.changeTodoStatus.start());
      dispatch(actions.changeTodoStatus.success(todo));
    } catch (err) {
      dispatch(actions.changeTodoStatus.error());
    }
  };
}

export { actions };
