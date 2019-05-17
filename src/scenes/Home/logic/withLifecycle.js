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
    withState("loadMoreCount", "loadMoreCountHandler", 20),
    withState("value", "valueHandler", ""),
    withState("valueAddNew", "valueAddNewHandler", ""),
    withState("checkedPosts", "checkedPostsHandler", ""),
    withHandlers({
      handleFilter: props => event => {
        console.log("props = ", props);
        // let { fetchedPosts, checkedPosts } = this.state;
        let filtered = [];
        const searchValue = event.target ? event.target.value : "";
        //show all posts
        if (event === "") {
          filtered = [...this.props.fetchedPosts];
        } else {
          //show checked/unchecked
          if (!event.target && !searchValue) {
            filtered = this.props.fetchedPosts.filter(function(post, index) {
              return post.checked === event;
            });
          } else {
            // filter results in search bar
            filtered = this.props.fetchedPosts.filter(function(post, index) {
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
        this.props.checkedPostsHandler(
          !event.target && !searchValue ? event : this.props.checkedPosts
        );
        this.props.valueHandler(this.props.searchValue);
        this.props.allPostsHandler(filtered);
        this.props.renderedPostsHandler(filtered.slice(0, 10));
        this.props.loadMoreCountHandler(filtered.length > 10 ? 20 : 0);
        // this.setState({
        //   checkedPosts: !event.target && !searchValue ? event : checkedPosts,
        //   value: searchValue,
        //   allPosts: filtered,
        //   renderedPosts: filtered.slice(0, 10),
        //   loadMoreCount: filtered.length > 10 ? 20 : 0
        // });
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
              // this.setState(
              // {
              //   fetchedPosts: allPosts,
              //   allPosts,
              //   renderedPosts: allPosts.slice(0, 10),
              //   loading: false
              // },
              // () => {
              //   this.handleFilter(this.props.checkedPosts);
              // }
              // );
            })
            .catch(error => console.error(error));
        }, 1500);
      }
    }),
    // mapProps(props => ({})),
    withProps(props => {
      console.log("props = ", props);
    })
  );
export default withLifecycle;