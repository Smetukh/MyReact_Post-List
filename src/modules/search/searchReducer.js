import { handleActions } from "@letapp/redux-actions";
import * as actions from "./searchActions";
const initialState = {
  value: "",
  checkedPosts: ""
};

export default handleActions(
  {
    [actions.setCurrentSearch]: (state, action) => {
      return {
        value: action.payload
      };
    },
    [actions.handleChecked]: (state, action) => {
      return {
        checkedPosts: action.payload
      };
    }
  },
  initialState
);
