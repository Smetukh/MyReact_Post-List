import { handleActions } from "@letapp/redux-actions";
import * as actions from "./todosActions";
const initialState = {
  todos: []
};

export default handleActions(
  {
    [actions.addToDo]: (state, action) => {
      console.log("action.payload = ", action.payload);
      console.log("state = ", state);
      let new1 = state.todos.concat(action.payload);
      console.log("new1= ", new1);
      return {
        todos: new1
      };
    },
    [actions.changePostStatus]: (state, action) => {
      const newStateTodos = [...state.todos];
      function isChecked(element) {
        return element.id === action.payload;
      }
      let indexChecked = newStateTodos.findIndex(isChecked);
      newStateTodos[indexChecked].checked = !newStateTodos[indexChecked]
        .checked;
      return {
        todos: newStateTodos
      };
    }
  },
  initialState
);
