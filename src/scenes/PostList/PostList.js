import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import PostListItem from "./PostListItem/PostListItem";

import "../../styles.css";

function PostList({
  list,
  loadMore,
  checkboxHandler,
  loadMoreCount,
  value,
  checkedPosts
}) {
  const posts = value
    ? [...list]
        .slice(0, list.length - loadMoreCount)
        .reverse()
        .filter(function(post, index) {
          let searchTitle = post.title
            .toLowerCase()
            .indexOf(value.toLowerCase());
          let searchBody = post.body.toLowerCase().indexOf(value.toLowerCase());
          //filter by checked value
          console.log("checkedPosts = ", checkedPosts);
          console.log("searchTitle = ", searchTitle);
          console.log("searchBody = ", searchBody);
          return (
            (checkedPosts === undefined ||
              checkedPosts === "" ||
              post.checked === checkedPosts) &&
            //filter by search value
            (searchTitle > -1 || searchBody > -1)
          );
        })
    : [...list].reverse();
  console.log("checkedPosts11 =  ", checkedPosts);
  console.log("value11 =  ", value);
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
                      onChange={e => checkboxHandler(e, key)}
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

const enhancer = compose(connect(mapStateToProps));

PostList.propTypes = {
  posts: PropTypes.array,
  loadMoreCount: PropTypes.number
};
PostList.defaultProps = {
  posts: [],
  loadMoreCount: 0
};

export default enhancer(PostList);
