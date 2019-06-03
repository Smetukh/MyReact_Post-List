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
import * as todosOperations from "../../../modules/todos/todosOperations";
import * as searchOperations from "../../../modules/search/searchOperations";
import Modal from "../../Modal/Modal";
import withSubscription from "../../withSubscription";

const EnhancedModal = withSubscription("Loading content...")(Modal);

const mapDispatchToProps = {
  addToDo: todosOperations.actions.addToDo,
  handleChecked: searchOperations.actions.handleChecked
  // setCurrentValue: searchOperations.actions.setCurrentValue
};

const mapStateToProps = state => ({
  list: state.todos.todos,
  value: state.search.value
});
const withLogic = () =>
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    withStateHandlers(
      {
        fetchedPosts: [],
        renderedPosts: [],
        // checkedPosts: "",
        loading: true,
        loadMoreCount: 0,
        // value: "",
        valueAddNew: ""
      },
      {
        onComponentDidMount: (state, props) => data => {
          data.forEach(function(element) {
            element.checked = Math.floor(Math.random() * Math.floor(2))
              ? true
              : false;
          });
          if (!props.list.length) props.addToDo(data.slice(1, 5));
          props.handleChecked(props.checkedPosts);
          console.log("props didmount = ", props);
          return {
            fetchedPosts: props.list,
            renderedPosts: props.list,
            loading: false,
            loadMoreCount: props.list.length - 10
          };
        },
        // handleChecked: (state, props) => event => {
        //   return {
        //     checkedPosts: event
        //   }
        // },
        handleFilter: (state, props) => event => {
          let filtered = [];
          const searchValue = event.target ? event.target.value : "";
          //show all posts
          if (event === "") {
            filtered = [...state.fetchedPosts];
          } else {
            //show checked/unchecked
            if (!event.target && !searchValue) {
              filtered = state.fetchedPosts.filter(function(post, index) {
                return post.checked === event;
              });
            } else {
              // filter results in search bar
              filtered = state.fetchedPosts.filter(function(post, index) {
                let searchTitle = post.title
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase());
                let searchBody = post.body
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase());
                return searchTitle > -1 || searchBody > -1;
              });
            }
          }
          return {
            // value: searchValue,
            renderedPosts: filtered,
            loadMoreCount: filtered.length > 10 ? 20 : 0
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
          let { fetchedPosts, valueAddNew } = state;
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

          let newArray = [...fetchedPosts];
          props.addToDo(newToDo);
          console.log("list[last] = ", props.list[props.list.length - 1]);
          console.log("list = ", props.list);
          // newArray.unshift(newToDo);
          // props.handleAddNewChange("");
          event.preventDefault();
          return {
            fetchedPosts: props.list,
            renderedPosts: props.list,
            valueAddNew: ""
          };
        },
        checkboxHandler: (state, props) => (event, id) => {
          let allPostsSpread = [...state.fetchedPosts];
          allPostsSpread[id].checked = event.target.checked;
          return {
            fetchedPosts: allPostsSpread
          };
          // props.allPostsHandler(allPostsSpread);
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
export default withLogic;
