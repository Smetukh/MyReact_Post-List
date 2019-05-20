import { withHandlers } from "recompose";

const withLoadMore = withHandlers({
  // handleClick: props => e => {
  //   let { times, onClick, setTimes } = props;
  //   e.preventDefault()
  //   setTimes( ++times );
  //   onClick && onClick();
  // }
  loadMore: props => () => {
    console.log("#################loadmore props = ", props);
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
      console.log("========================");
      props.outOfPostsHandler(true);
    } else {
      setTimeout(() => {
        props.outOfPostsHandler(false);
      }, 2000);
    }
  }
});

export default withLoadMore;
