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
  valueAddNew,
  loadMoreCount,
  handleSubmitNew
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
      <PostList loadMore={loadMore} loadMoreCount={loadMoreCount} />
    </>
  );
}

Home = withLogic()(Home);
export default Home;
