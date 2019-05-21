import {
  compose,
  withStateHandlers,
  withProps,
  branch,
  renderComponent,
  pure
} from "recompose";

import lifeCycleData from "./lifeCycleData";
import Modal from "../../Modal/Modal";
import withSubscription from "../../withSubscription";

const EnhancedModal = withSubscription("Loading content...")(Modal);

const withLogic = () =>
  compose(
    withStateHandlers(
      {
        fetchedPosts: [],
        renderedPosts: [],
        checkedPosts: "",
        loading: true,
        loadMoreCount: 0,
        value: "",
        valueAddNew: ""
      },
      {
        onComponentDidMount: (state, props) => data => {
          data.forEach(function(element) {
            element.checked = Math.floor(Math.random() * Math.floor(2))
              ? true
              : false;
          });
          return {
            fetchedPosts: data,
            renderedPosts: data,
            loading: false,
            loadMoreCount: data.length - 10
          };
        },
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
            checkedPosts:
              !event.target && !searchValue ? event : state.checkedPosts,
            value: searchValue,
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
          let newObj = {
            userId: 1,
            id: 0,
            title:
              valueAddNew.length > 10
                ? valueAddNew.substring(0, 10) + "..."
                : valueAddNew,
            body: valueAddNew,
            checked: false
          };

          let newArray = [...fetchedPosts];
          newArray.unshift(newObj);
          event.preventDefault();
          return {
            fetchedPosts: newArray,
            renderedPosts: newArray,
            valueAddNew: "",
            value: ""
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
