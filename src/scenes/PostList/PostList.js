import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import PostListItem from "./PostListItem/PostListItem";
import * as todosOperations from "../../modules/todos/todosOperations";

import "../../styles.css";

function PostList({
  list,
  loadMore,
  changePostStatus,
  loadMoreCount,
  value = "",
  checkedPosts
}) {
  console.log("loadMoreCount = ", loadMoreCount);
  const posts = [...list]
    .reverse()
    .slice(0, list.length - loadMoreCount)

    .filter(function(post, index) {
      let searchTitle = value
        ? post.title.toLowerCase().indexOf(value.toLowerCase())
        : 1;
      let searchBody = value
        ? post.body.toLowerCase().indexOf(value.toLowerCase())
        : 1;
      //filter by checked value
      return (
        (checkedPosts === undefined ||
          checkedPosts === "" ||
          post.checked === checkedPosts) &&
        //filter by search value
        (searchTitle > -1 || searchBody > -1)
      );
    });
  return (
    <>
      <ul>
        {posts &&
          posts.map((post, key) => (
            <div key={post + key} className="posts">
              <li>
                <form className="posts">
                  <label className="inline_block">
                    Done:
                    <input
                      name="isGoing"
                      type="checkbox"
                      checked={post.checked}
                      onChange={e => changePostStatus(post.id)}
                    />
                  </label>
                  {/* <br /> */}
                  <PostListItem
                    className="inline_block"
                    post={post}
                    value={value}
                  />
                </form>
              </li>
            </div>
          ))}
      </ul>

      <button
        className="buttonMore"
        onClick={loadMore}
        disabled={!loadMoreCount}
        style={{ background: loadMoreCount ? "#40a9f3" : "#D3D3D3" }}
      >
        Load more
      </button>
    </>
  );
}

const mapStateToProps = state => ({
  list: state.todos.todos,
  value: state.search.value,
  checkedPosts: state.search.checkedPosts
});
const mapDispatchToProps = {
  changePostStatus: todosOperations.actions.changePostStatus
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

PostList.propTypes = {
  posts: PropTypes.array,
  loadMoreCount: PropTypes.number
};
PostList.defaultProps = {
  posts: [],
  loadMoreCount: 0
};

export default enhancer(PostList);
