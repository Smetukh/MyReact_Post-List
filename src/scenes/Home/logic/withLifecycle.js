import {
  compose,
  withHandlers,
  withState,
  mapProps,
  withProps,
  lifecycle
} from "recompose";
const withLifecycle = () =>
  compose(
    withState("fetchedPosts", "fetchedPostsHandler", []),
    withState("allPosts", "allPostsHandler", []),
    withState("renderedPosts", "renderedPostsHandler", []),
    withState("outOfPosts", "outOfPostsHandler", false),
    withState("loading", "loadingHandler", true),
    withState("loadMoreCount", "loadMoreCountHandler", 10),
    withState("value", "valueHandler", ""),
    withState("valueAddNew", "valueAddNewHandler", ""),
    withState("checkedPosts", "checkedPostsHandler", ""),
    withHandlers({
      onComponentDidMount: props => () => {},
      handleFilter: props => event => {
        console.log("handleFilter props = ", props);

        // let { fetchedPosts, checkedPosts } = this.state;
        let filtered = [];
        const searchValue = event.target ? event.target.value : "";
        //show all posts
        if (event === "") {
          filtered = [...props.fetchedPosts];
        } else {
          //show checked/unchecked
          if (!event.target && !searchValue) {
            filtered = props.fetchedPosts.filter(function(post, index) {
              return post.checked === event;
            });
          } else {
            console.log("event1 = ", event.target.value);
            // filter results in search bar
            filtered = props.fetchedPosts.filter(function(post, index) {
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
        props.checkedPostsHandler(
          !event.target && !searchValue ? event : props.checkedPosts
        );
        props.valueHandler(searchValue);
        props.allPostsHandler(filtered);
        props.renderedPostsHandler(filtered.slice(0, 10));
        props.loadMoreCountHandler(filtered.length > 10 ? 20 : 0);
      },
      loadMore: props => () => {
        console.log("loadmore props = ", props);
        props.loadMoreCountHandler(
          props.loadMoreCount && props.loadMoreCount < props.allPosts.length
            ? props.loadMoreCount + 10
            : 0
        );
        props.renderedPostsHandler(
          props.loadMoreCount
            ? props.allPosts.slice(0, props.loadMoreCount)
            : props.renderedPosts
        );
        if (!props.loadMoreCount) {
          props.outOfPostsHandler(true);
        } else {
          setTimeout(() => {
            props.outOfPostsHandler(false);
          }, 2000);
        }
      },
      handleAddNewChange: props => event => {
        props.valueAddNewHandler(event.target.value);
      },
      handleSubmitNew: props => event => {
        // let { fetchedPosts, valueAddNew } = this.state;
        let newObj = {
          userId: 1,
          id: 0,
          title:
            props.valueAddNew.length > 10
              ? props.valueAddNew.substring(0, 10) + "..."
              : props.valueAddNew,
          body: props.valueAddNew,
          checked: false
        };

        let newArray = [...props.fetchedPosts];
        newArray.unshift(newObj);
        // this.setState({
        //   fetchedPosts: newArray,
        //   allPosts: newArray,
        //   renderedPosts: newArray.slice(0, 10),
        //   valueAddNew: "",
        //   value: ""
        // });
        console.log("newArray = ", newArray);
        props.fetchedPostsHandler(newArray);
        props.allPostsHandler(newArray);
        props.renderedPostsHandler(newArray.slice(0, 10));
        props.valueAddNewHandler("");
        props.valueHandler("");
        event.preventDefault();
      },
      checkboxHandler: props => (event, id) => {
        // let { allPosts } = this.state;
        const target = event.target;
        let allPostsSpread = [...props.allPosts];
        allPostsSpread[id].checked = target.checked;
        props.allPostsHandler(allPostsSpread);
      }
    }),

    lifecycle({
      componentDidMount() {
        console.log("componentDidMount props = ", this.props);
        // }}),
        const url = "https://jsonplaceholder.typicode.com/posts";
        setTimeout(() => {
          fetch(url)
            .then(response => response.json())
            .then(allPosts => {
              allPosts.forEach(function(element) {
                element.checked = Math.floor(Math.random() * Math.floor(2))
                  ? true
                  : false;
              });
              this.props.allPostsHandler(allPosts);
              this.props.fetchedPostsHandler(allPosts);
              this.props.renderedPostsHandler(allPosts.slice(0, 10));
              this.props.loadingHandler(false);
              this.props.handleFilter(this.props.checkedPosts);
            })
            .catch(error => console.error(error));
        }, 1500);
      }
    }),
    // mapProps(props => ({})),
    withProps(props => {
      // console.log("withProps props = ", props);
    })
  );
export default withLifecycle;
