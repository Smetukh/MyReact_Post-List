import { createAsyncActions } from "@letapp/redux-actions";

export const addToDo = createAsyncActions("todos/ADD_TODO");
export const removeTodo = createAsyncActions("todos/REMOVE_TODO");
export const listTodos = createAsyncActions("todos/LIST_TODOS");
export const changeTodoStatus = createAsyncActions("todos/CHANGE_TODO_STATUS");
