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
    }
  },
  initialState
);
