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
        loading: true,
        loadMoreCount: 0,
        valueAddNew: ""
      },
      {
        onComponentDidMount: (state, props) => data => {
          data.forEach(function(element) {
            element.checked = Math.floor(Math.random() * Math.floor(2))
              ? true
              : false;
          });
          if (!props.list.length) props.addToDo(data);
          props.handleChecked(props.checkedPosts);
          return {
            loading: false,
            loadMoreCount: props.list.length - 10
          };
        },
        loadMore: (state, props) => () => {
          return {
            loadMoreCount:
              state.loadMoreCount - 10 > 0 ? state.loadMoreCount - 10 : 0
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
            loadMoreCount:
              state.loadMoreCount - 10 > 0 ? state.loadMoreCount - 10 : 0
          };
        }
      }
    ),
    lifeCycleData,
    pure,
    branch(props => props.loading, renderComponent(EnhancedModal)),
    withProps(props => {
      console.log("withProps = ", props);
    })
  );

const mapDispatchToProps = {
  addToDo: todosOperations.actions.addToDo,
  changePostStatus: todosOperations.actions.changePostStatus,
  handleChecked: searchOperations.actions.handleChecked
};

const mapStateToProps = state => ({
  list: todosSelectors.getTodos(state), //state.todos.todos,
  value: state.search.value
});

export default withLogic;
