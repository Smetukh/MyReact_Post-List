import { createSelector } from "reselect";

const todos = state => state.todos.todos;

export const getTodos = createSelector(
  todos,
  state => state
);
