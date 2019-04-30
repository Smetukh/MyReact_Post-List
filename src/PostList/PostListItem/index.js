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
  componentDidMount() {
    this.setState({
      // titleYellow: getHighlightedText(this.props.post.title, this.props.value)
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.title !== this.props.title || nextProps.body !== this.props.body
    );
  }

  getHighlightedText(text, higlight) {
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, "gi"));
    let htext = (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === higlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
    console.log("text = ", text);
    console.log("higlight = ", higlight);
    return htext;
  }
  render() {
    return (
      <div className="postItem">
        <h3>Author Id: {this.props.post.id}</h3>
        {/* <h4> */}
        Title:{" "}
        {this.getHighlightedText(this.props.post.title, this.props.value)}
        {/* </h4> */}
        {this.props.post.body}
      </div>
    );
  }
}

export default PostListItem;
