import React from "react";

const PostListItem = ({ post, value }) => {
  const getHighlightedText = (text, higlight) => {
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part && higlight && part.toLowerCase() === higlight.toLowerCase()
                ? { fontWeight: "bold", backgroundColor: "yellow" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };
  return (
    <div
      className="postItem"
      style={{
        background: post.checked ? "#F08080" : "#c1ffc1"
      }}
    >
      <h3>Author Id: {post.id}</h3>
      <h4>
        Title:{" "}
        {value && post.title
          ? getHighlightedText(post.title, value)
          : post.title}
      </h4>
      {value && post.body ? getHighlightedText(post.body, value) : post.body}
    </div>
  );
};

export default PostListItem;
