import React from "react";
import PropTypes from "prop-types";
import PostListItem from "./PostListItem";

import "../styles.css";

function PostList({ posts, loadMore, loadMoreCount, value }) {
  return (
    <>
      <ul>
        {posts &&
          posts.map((post, key) => (
            <div key={post + key} className="c-contactlist__contact">
              <li>
                <PostListItem post={post} value={value} />
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
