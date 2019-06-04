import { createAsyncActions } from "@letapp/redux-actions";

export const addToDo = createAsyncActions("todos/ADD_TODO");
export const changePostStatus = createAction("todos/CHANGE_POST_STATUS");
