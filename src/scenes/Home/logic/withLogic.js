import {
  compose,
  withStateHandlers,
  withProps,
  branch,
  renderComponent,
  pure
} from "recompose";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import lifeCycleData from "./lifeCycleData";
import { todosOperations, todosSelectors } from "../../../modules/todos";
import * as searchOperations from "../../../modules/search/searchOperations";
import Modal from "../../Modal/Modal";
import withSubscription from "../../withSubscription";

const EnhancedModal = withSubscription("Loading content...")(Modal);

const withLogic = () =>
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    withStateHandlers(
      {
        loadMoreCount: 0,
        valueAddNew: ""
      },
      {
        onComponentDidMount: (state, props) => data => {
          if (!props.list.length) props.listTodos();
          // filter todo status
          props.handleChecked(props.checkedPosts);
        },
        loadMore: (state, props) => () => {
          return {
            loadMoreCount: state.loadMoreCount + 1
          };
        },
        handleAddNewChange: (state, props) => event => ({
          valueAddNew: event.target.value
        }),
        handleSubmitNew: (state, props) => event => {
          let { valueAddNew } = state;
          let newToDo = {
            userId: uuid(),
            id: uuid(),
            title:
              valueAddNew.length > 10
                ? valueAddNew.substring(0, 10) + "..."
                : valueAddNew,
            body: valueAddNew,
            checked: false
          };
          props.addToDo(newToDo);
          event.preventDefault();
          return {
            valueAddNew: "",
            loadMoreCount: 0
          };
        }
      }
    ),
    lifeCycleData,
    pure,
    branch(
      props => props.isLoading || props.isLoading === undefined,
      renderComponent(EnhancedModal)
    ),
    withProps(props => {
      console.log("withProps = ", props);
    })
  );

const mapDispatchToProps = {
  addToDo: todosOperations.addToDo,
  listTodos: todosOperations.listTodos,
  handleChecked: searchOperations.actions.handleChecked
};

const mapStateToProps = state => ({
  list: todosSelectors.getTodos(state), //state.todos.todos,
  isLoading: todosSelectors.getLoadingStatus(state), //state.todos.todos,
  value: state.search.value
});

export default withLogic;
