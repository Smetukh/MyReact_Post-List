import React from "react";
import withLogic from "./logic";
import PostList from "../PostList/PostList";
import Search from "../Search/Search";
import NewPost from "../NewPost/NewPost";
import ButtonsStatus from "../ButtonsStatus/ButtonsStatus";
import "../../styles.css";

function Home({
  loadMore,
  handleAddNewChange,
  checkboxHandler,
  value,
  valueAddNew,
  renderedPosts,
  loadMoreCount,
  checkedPosts,
  handleFilter,
  handleSubmitNew,
  list,
  handleChecked
  // setCurrentValue
}) {
  return (
    <>
      <Search />
      <NewPost
        handleSubmitNew={handleSubmitNew}
        handleAddNewChange={handleAddNewChange}
        valueAddNew={valueAddNew}
      />
      <ButtonsStatus />
      <PostList
        // value={value}
        // posts={[...list]
        //   .slice(0, list.length - loadMoreCount)
        //   .reverse()
        //   .filter(function(post, index) {
        //     let searchTitle = post.title
        //       .toLowerCase()
        //       .indexOf(value.toLowerCase());
        //     let searchBody = post.body
        //       .toLowerCase()
        //       .indexOf(value.toLowerCase());
        //       //filter by checked value
        //     return (checkedPosts === '' || post.checked === checkedPosts)
        //       //filter by search value
        //       && (searchTitle > -1 || searchBody > -1);
        // })}
        loadMore={loadMore}
        loadMoreCount={loadMoreCount}
        checkboxHandler={checkboxHandler}
      />
    </>
  );
}
// }

Home = withLogic()(Home);
export default Home;
