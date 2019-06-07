import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import PostListItem from "./PostListItem/PostListItem";
import { todosOperations, todosSelectors } from "../../modules/todos";
import "../../styles.css";

function PostList({
  list,
  loadMore,
  changeTodoStatus,
  removeTodo,
  loadMoreCount,
  value = "",
  checkedPosts
}) {
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
  let shownPosts = posts.slice(0, 10 + loadMoreCount * 10); //|| list.length > posts.length
  return (
    <>
      <ul>
        {shownPosts &&
          shownPosts.map((post, key) => (
            <div key={post + key} className="posts">
              <li>
                <form className="posts">
                  <div className="leftSide">
                    <button
                      className="buttonMore buttonRed"
                      type="button"
                      onClick={() => removeTodo(post.id)}
                    >
                      Remove
                    </button>
                    <label className="inline_block">
                      Done:
                      <input
                        name="isGoing"
                        type="checkbox"
                        checked={post.checked}
                        onChange={e => changeTodoStatus(post.id)}
                      />
                    </label>
                  </div>
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
        disabled={shownPosts.length >= posts.length}
        style={{
          background: shownPosts.length >= posts.length ? "#D3D3D3" : "#40a9f3"
        }}
      >
        Load more
      </button>
    </>
  );
}

const mapStateToProps = state => ({
  list: todosSelectors.getTodos(state),
  value: state.search.value,
  checkedPosts: state.search.checkedPosts
});
const mapDispatchToProps = {
  changeTodoStatus: todosOperations.changeTodoStatus,
  removeTodo: todosOperations.removeTodo
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
