import React from "react";
// import {
//   compose,
//   withState,
//   withHandlers,
//   lifecycle,
//   withProps
// } from "recompose";
import withSubscription from "../withSubscription";

import withLogic from "./logic";
import PostList from "../PostList/PostList";
import Search from "../Search/Search";
import NewPost from "../NewPost/NewPost";
import ButtonsStatus from "../ButtonsStatus/ButtonsStatus";
import "../../styles.css";
import Modal from "../Modal/Modal";

const EnhancedModal = withSubscription("Loading content...")(Modal);
const EnhancedModalMore = withSubscription("Out of posts")(Modal);
// const url = "https://jsonplaceholder.typicode.com/posts";
/*
const Home = () =>
  compose(
    withState("fetchedPosts", "fetchedPostsHandler", []),
    withState("allPosts", "allPostsHandler", []),
    withState("renderedPosts", "renderedPostsHandler", []),
    withState("outOfPosts", "outOfPostsHandler", false),
    withState("loading", "loadingHandler", true),
    withState("loadMoreCount", "loadMoreCountHandler", 20),
    withState("value", "valueHandler", ""),
    withState("valueAddNew", "valueAddNewHandler", ""),
    withState("checkedPosts", "checkedPostsHandler", ""),
    withHandlers({
      handleFilter: (event) => {
        // let { fetchedPosts, checkedPosts } = this.state;
        let filtered = [];
        const searchValue = event.target ? event.target.value : "";
        //show all posts
        if (event === "") {
          filtered = [...this.props.fetchedPosts];
        } else {
          //show checked/unchecked
          if (!event.target && !searchValue) {
            filtered = this.props.fetchedPosts.filter(function(post, index) {
              return post.checked === event;
            });
          } else {
            // filter results in search bar
            filtered = this.props.fetchedPosts.filter(function(post, index) {
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
      },
    }),

    lifecycle({
      componentDidMount() {
        console.log("aaaa");
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
              this.props.allPostsHandler(allPosts);
              this.props.fetchedPostsHandler(allPosts);
              this.props.renderedPostsHandler(allPosts.slice(0, 10));
              this.props.loadingHandler(false);

              // this.setState(
              //   {
              //     fetchedPosts: allPosts,
              //     allPosts,
              //     renderedPosts: allPosts.slice(0, 10),
              //     loading: false
              //   },
              //   () => {
              //     this.handleFilter(this.props.checkedPosts);
              //   }
              // );
            })
            .catch(error => console.error(error));
        }, 500);
      }
    }),
    withProps(props => {
      console.log("props = ", props);
    })
  );
*/
/*
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outOfPosts: false,
      fetchedPosts: [],
      allPosts: [],
      renderedPosts: [],
      loading: true,
      loadMoreCount: 20,
      value: "",
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

//
  handleAddNewChange(event) {
    this.setState({
      valueAddNew: event.target.value
    });
  }

  handleSubmitNew(event) {
    let { fetchedPosts, valueAddNew } = this.state;
    let newObj = {
      userId: 1,
      id: 0,
      title:
        valueAddNew.length > 10
          ? valueAddNew.substring(0, 10) + "..."
          : valueAddNew,
      body: valueAddNew,
      checked: false
    };
    let newArray = [...fetchedPosts];
    newArray.unshift(newObj);
    this.setState({
      fetchedPosts: newArray,
      allPosts: newArray,
      renderedPosts: newArray.slice(0, 10),
      valueAddNew: "",
      value: ""
    });
    event.preventDefault();
  }

  checkboxHandler = (event, id) => {
    let { allPosts } = this.state;
    const target = event.target;
    let allPostsSpread = [...allPosts];
    allPostsSpread[id].checked = target.checked;
    this.setState(
      {
        allPosts: allPostsSpread
      },
      console.log("allPosts[id].checked = ", allPosts[id].checked)
    );
  };

  render() {
    let {
      value,
      valueAddNew,
      renderedPosts,
      loading,
      loadMoreCount,
      fetchedPosts,
      outOfPosts,
      checkedPosts
    } = this.state;
    return (
      */
function Home({
  value,
  valueAddNew,
  renderedPosts,
  loading,
  loadMoreCount,
  fetchedPosts,
  outOfPosts,
  checkedPosts,
  handleFilter,
  handleSubmitNew
}) {
  console.log(
    "home props = ",
    value,
    valueAddNew,
    renderedPosts,
    loading,
    loadMoreCount,
    fetchedPosts,
    outOfPosts,
    checkedPosts,
    handleFilter
  );
  return (
    // <div>
    //   ++++++++++++
    // </div>
    <>
      {loading || !fetchedPosts.length ? (
        <div>
          Loading content...
          <EnhancedModal />
        </div>
      ) : (
        <>
          <Search handleFilter={handleFilter} value={value} />
          <NewPost
            // handleSubmitNew={this.handleSubmitNew}
            // handleAddNewChange={this.handleAddNewChange}
            valueAddNew={valueAddNew}
          />
          <ButtonsStatus
            checkedPosts={checkedPosts}
            handleFilter={handleFilter}
          />
          <PostList
            value={value}
            posts={renderedPosts}
            // loadMore={this.loadMore}
            loadMoreCount={loadMoreCount}
            // checkboxHandler={this.checkboxHandler}
          />
          {outOfPosts ? <EnhancedModalMore /> : null}
        </>
      )}
    </>
  );
}
// }

Home = withLogic()(Home);
export default Home;
