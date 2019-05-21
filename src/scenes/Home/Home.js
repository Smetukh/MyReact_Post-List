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
  handleSubmitNew
}) {
  return (
    <>
      <Search handleFilter={handleFilter} value={value} />
      <NewPost
        handleSubmitNew={handleSubmitNew}
        handleAddNewChange={handleAddNewChange}
        valueAddNew={valueAddNew}
      />
      <ButtonsStatus checkedPosts={checkedPosts} handleFilter={handleFilter} />
      <PostList
        value={value}
        posts={renderedPosts.slice(0, renderedPosts.length - loadMoreCount)}
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
