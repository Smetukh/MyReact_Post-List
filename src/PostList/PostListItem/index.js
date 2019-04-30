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
    console.log("text = ", text);
    console.log("higlight = ", higlight);
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === higlight.toLowerCase()
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
          {this.getHighlightedText(this.props.post.title, this.props.value)}
        </h4>
        {this.getHighlightedText(this.props.post.body, this.props.value)}
      </div>
    );
  }
}

export default PostListItem;
