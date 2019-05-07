import React from "react";
import { render } from "react-dom";
import PostList from "./PostList";
import "./styles.css";
import withSubscription from "./withSubscription";

function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* <span className="close" onClick={props.closeModal}>&times;</span> */}
        <p>{props.data}</p>
      </div>
    </div>
  );
}
const EnhancedModal = withSubscription("Loading content...")(Modal);
const EnhancedModalMore = withSubscription("Out of posts")(Modal);

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outOfPosts: false,
      fetchedPosts: null,
      allPosts: null,
      renderedPosts: null,
      loading: true,
      loadMoreCount: 20,
      value: "",
      searchResult: {},
      valueAddNew: "",
      checkedPosts: null
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleAddNewChange = this.handleAddNewChange.bind(this);
    this.handleSubmitNew = this.handleSubmitNew.bind(this);
  }
  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(allPosts => {
          allPosts.forEach(function(element) {
            element.checked = Math.floor(Math.random() * Math.floor(2))
              ? true
              : false;
          });

          this.setState({
            fetchedPosts: allPosts,
            allPosts,
            renderedPosts: allPosts.slice(0, 10),
            loading: false
          });
        })
        .catch(error => console.error(error));
    }, 500);
  }
  loadMore = () => {
    const { loadMoreCount, allPosts, renderedPosts } = this.state;
    this.setState({
      loadMoreCount:
        loadMoreCount && loadMoreCount < allPosts.length
          ? loadMoreCount + 10
          : 0,
      renderedPosts: loadMoreCount
        ? allPosts.slice(0, loadMoreCount)
        : renderedPosts
    });
    if (!loadMoreCount) {
      this.setState({
        outOfPosts: true
      });
      setTimeout(() => {
        this.setState({
          outOfPosts: false
        });
      }, 2000);
    }
  };
  handleFilter = (event, checkedValue) => {
    let { fetchedPosts, allPosts, checkedPosts } = this.state;
    let filtered = [];

    //show all posts
    if (checkedValue === null) {
      filtered = [...fetchedPosts];
    } else {
      //show checked/unchecked
      if (!event.target.value) {
        filtered = fetchedPosts.filter(function(post, index) {
          return post.checked === checkedValue;
        });
      } else {
        // filter results in search bar
        filtered = allPosts.filter(function(post, index) {
          let searchTitle = post.title
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase());
          let searchBody = post.body
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase());
          return searchTitle > -1 || searchBody > -1;
        });
      }
    }

    this.setState({
      checkedPosts: !event.target.value ? checkedValue : checkedPosts,
      value: event.target.value,
      allPosts: filtered,
      renderedPosts: filtered.slice(0, 10),
      loadMoreCount: filtered.length > 10 ? 20 : 0
    });
  };

  handleAddNewChange(event) {
    this.setState({
      valueAddNew: event.target.value
      // allPosts: filtered,
      // renderedPosts: filtered.slice(0, 10),
      // loadMoreCount: filtered.length > 10 ? 20 : 0
    });
  }
  handleSubmitNew(event) {
    let { fetchedPosts, allPosts, valueAddNew } = this.state;
    // console.log('renderedPosts = ', renderedPosts)
    let newObj = {
      userId: 1,
      id: 0,
      title: "aaa",
      body: valueAddNew,
      checked: false
      // loadMoreCount: ++loadMoreCount
    };
    let newArray = [...fetchedPosts];
    fetchedPosts.unshift(newObj);

    this.setState({
      fetchedPosts: fetchedPosts,
      allPosts: fetchedPosts,
      renderedPosts: allPosts.slice(0, 10),
      valueAddNew: "",
      value: ""
    });
    // console.log('newArr = ', newArr)
    // alert("A name was submitted: " + valueAddNew);
    event.preventDefault();
  }
  checkboxHandler = (event, id) => {
    // console.log('this.state = ' + this.state)
    let { allPosts } = this.state;
    const target = event.target;
    // const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = target.name;
    // console.log("key = ", key);

    let allPostsSpread = [...allPosts];
    console.log("allPosts = ", allPosts);
    allPostsSpread[id].checked = target.checked;
    console.log("allPostsSpread[id] = ", allPostsSpread[id]);
    // console.log("value = ", id);
    // console.log("target = ", target.checked);
    this.setState({
      allPosts: allPostsSpread
    });
  };
  render() {
    let {
      value,
      renderedPosts,
      loading,
      loadMoreCount,
      fetchedPosts,
      outOfPosts,
      checkedPosts
    } = this.state;
    return (
      <>
        {loading || !fetchedPosts.length ? (
          <div>
            Loading content...
            <EnhancedModal />
          </div>
        ) : (
          <>
            <form className="form_input">
              <label>
                Search title/post:
                <input
                  className="header_input"
                  placeholder="Type something good here..."
                  type="text"
                  value={this.state.value}
                  onChange={this.handleFilter}
                />
              </label>
            </form>
            <form className="form_input" onSubmit={this.handleSubmitNew}>
              <label>
                Add New Post:
                <input
                  className="header_input"
                  placeholder="Type something good here..."
                  type="text"
                  value={this.state.valueAddNew}
                  onChange={this.handleAddNewChange}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <button
              disabled={checkedPosts === null}
              onClick={e => this.handleFilter(e, null)}
            >
              All
            </button>
            <button
              disabled={checkedPosts === false}
              onClick={e => this.handleFilter(e, false)}
            >
              Active
            </button>
            <button
              disabled={checkedPosts}
              onClick={e => this.handleFilter(e, true)}
            >
              Completed
            </button>
            <PostList
              value={value}
              posts={renderedPosts}
              loadMore={this.loadMore}
              loadMoreCount={loadMoreCount}
              checkboxHandler={this.checkboxHandler}
            />
            {outOfPosts ? <EnhancedModalMore /> : null}
          </>
        )}
      </>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
