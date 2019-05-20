import React from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem/PostListItem";

import "../../styles.css";

function PostList({ posts, loadMore, checkboxHandler, loadMoreCount, value }) {
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
PostList.propTypes = {
  posts: PropTypes.array,
  loadMoreCount: PropTypes.number
};
PostList.defaultProps = {
  posts: [],
  loadMoreCount: 0
};

export default PostList;
