import React from "react";
import { render } from "react-dom";
import PostList from "./PostList";
import "./styles.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedPosts: null,
      allPosts: null,
      posts: null,
      loading: true,
      loadMoreCount: 20,
      value: "",
      searchResult: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
      .then(response => response.json())
      .then(allPosts =>
        this.setState({
          fetchedPosts: allPosts,
          allPosts,
          posts: allPosts.slice(0, 10),
          loading: false
        })
      )
      .catch(error => console.error(error));
  }
  loadMore = () => {
    const { loadMoreCount, allPosts } = this.state;
    this.setState({
      loadMoreCount: loadMoreCount < allPosts.length ? loadMoreCount + 10 : 0,
      posts: allPosts.slice(0, loadMoreCount)
    });
  };
  handleChange(event) {
    let { fetchedPosts } = this.state;
    this.setState({ value: event.target.value });
    let filtered = fetchedPosts.filter(function(post, index) {
      let searchTitle = post.title.indexOf(event.target.value);
      let searchBody = post.body.indexOf(event.target.value);
      return searchTitle > -1 || searchBody > -1;
    });

    this.setState({
      allPosts: filtered,
      posts: filtered.slice(0, 10),
      loadMoreCount: filtered.length > 10 ? 20 : 0
    });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  render() {
    let { value, posts, loading, loadMoreCount, fetchedPosts } = this.state;
    return (
      <>
        {loading || !fetchedPosts.length ? (
          <div>Loading...</div>
        ) : (
          <>
            <form className="form_input" onSubmit={this.handleSubmit}>
              <label>
                Search title/post:
                <input
                  className="header_input"
                  placeholder="Type something good here..."
                  type="text"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
            </form>
            <PostList
              value={value}
              posts={posts}
              loadMore={this.loadMore}
              loadMoreCount={loadMoreCount}
            />
          </>
        )}
      </>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
