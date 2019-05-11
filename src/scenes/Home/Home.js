import React from "react";
import PostList from "../PostList/PostList";
import { routes } from "../router";
import { Link } from "react-router-dom";
import "../../styles.css";
import withSubscription from "../withSubscription";

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

export class Home extends React.Component {
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
      checkedPosts: this.props.checkedPosts
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

          this.setState(
            {
              fetchedPosts: allPosts,
              allPosts,
              renderedPosts: allPosts.slice(0, 10),
              loading: false
            },
            () => {
              this.handleFilter(this.props.checkedPosts);
            }
          );
        })
        .catch(error => console.error(error));
    }, 500);
    // this.handleFilter('')
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
  handleFilter = event => {
    let { fetchedPosts, checkedPosts } = this.state;
    let filtered = [];
    const searchValue = event.target ? event.target.value : "";
    //show all posts
    if (event === "") {
      filtered = [...fetchedPosts];
    } else {
      //show checked/unchecked
      if (!event.target && !searchValue) {
        console.log("fetchedPosts = ", fetchedPosts);
        filtered = fetchedPosts.filter(function(post, index) {
          return post.checked === event;
        });
      } else {
        // filter results in search bar
        filtered = fetchedPosts.filter(function(post, index) {
          let searchTitle = post.title
            .toLowerCase()
            .indexOf(searchValue.toLowerCase());
          let searchBody = post.body
            .toLowerCase()
            .indexOf(searchValue.toLowerCase());
          return searchTitle > -1 || searchBody > -1;
        });
      }
    }

    this.setState({
      checkedPosts: !event.target && !searchValue ? event : checkedPosts,
      value: searchValue,
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
    let newObj = {
      userId: 1,
      id: 0,
      title: "aaa",
      body: valueAddNew,
      checked: false
      // loadMoreCount: ++loadMoreCount
    };
    fetchedPosts.unshift(newObj);

    this.setState({
      fetchedPosts: fetchedPosts,
      allPosts: fetchedPosts,
      renderedPosts: allPosts.slice(0, 10),
      valueAddNew: "",
      value: ""
    });
    event.preventDefault();
  }
  checkboxHandler = (event, id) => {
    // console.log('this.state = ' + this.state)
    let { allPosts } = this.state;
    const target = event.target;
    let allPostsSpread = [...allPosts];
    allPostsSpread[id].checked = target.checked;
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
              onClick={() => this.handleFilter("")}
            >
              <Link to={routes.home}> All </Link>
            </button>
            <button
              disabled={checkedPosts === false}
              onClick={() => this.handleFilter(false)}
            >
              <Link to={routes.active}>Active</Link>
            </button>
            <button
              disabled={checkedPosts}
              onClick={() => this.handleFilter(true)}
            >
              <Link to={routes.completed}>Completed</Link>
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
export default Home;
