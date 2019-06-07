import { handleActions } from "@letapp/redux-actions";
import * as actions from "./todosActions";
const initialState = {
  todos: [],
  isLoading: true,
  isError: false
};

export default handleActions(
  {
    [actions.addToDo.start]: state => {
      return {
        ...state,
        isError: false
      };
    },
    [actions.addToDo.success]: (state, action) => {
      const newState = { ...state };
      let newToDoList = newState.todos.concat(action.payload);
      return {
        ...state,
        todos: newToDoList
      };
    },
    [actions.addToDo.error]: state => {
      return {
        ...state,
        isError: true
      };
    },

    [actions.removeTodo.start]: state => {
      return {
        ...state,
        isError: false
      };
    },
    [actions.removeTodo.success]: (state, action) => {
      const newState = { ...state };
      function isId(element) {
        return element.id === action.payload;
      }
      let indexChecked = newState.todos.findIndex(isId);
      newState.todos.splice(indexChecked, 1);
      return {
        ...state,
        todos: [...newState.todos]
      };
    },
    [actions.removeTodo.error]: state => {
      return {
        ...state,
        isError: true
      };
    },
    [actions.listTodos.start]: state => {
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    },
    [actions.listTodos.success]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        todos: action.payload
      };
    },
    [actions.listTodos.error]: state => {
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    },

    [actions.changeTodoStatus.success]: (state, action) => {
      const newStateTodos = [...state.todos];
      function isChecked(element) {
        return element.id === action.payload;
      }
      let indexChecked = newStateTodos.findIndex(isChecked);
      newStateTodos[indexChecked].checked = !newStateTodos[indexChecked]
        .checked;
      return {
        ...state,
        todos: newStateTodos
      };
    },
    [actions.changeTodoStatus.start]: state => {
      return {
        ...state,
        isError: false
      };
    },

    [actions.changeTodoStatus.error]: state => {
      return {
        ...state,
        isError: true
      };
    }
  },
  initialState
);
