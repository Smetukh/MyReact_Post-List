import React from "react";

export class PostListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      loading: true,
      titleYellow: this.props.post.title,
      bodyYellow: this.props.post.body
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.post.title !== this.props.post.title ||
      nextProps.post.body !== this.props.post.body ||
      nextProps.value !== this.props.value
    );
  }

  getHighlightedText(text, higlight) {
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
  }
  render() {
    return (
      <div className="postItem">
        <h3>Author Id: {this.props.post.id}</h3>
        <h4>
          Title:{" "}
          {this.props.value && this.props.post.title
            ? this.getHighlightedText(this.props.post.title, this.props.value)
            : this.props.post.title}
        </h4>
        {this.props.value && this.props.post.body
          ? this.getHighlightedText(this.props.post.body, this.props.value)
          : this.props.post.body}
      </div>
    );
  }
}

export default PostListItem;
