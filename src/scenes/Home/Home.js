import React from "react";
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

function Home({
  loadMore,
  handleAddNewChange,
  checkboxHandler,
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
  return (
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
            handleSubmitNew={handleSubmitNew}
            handleAddNewChange={handleAddNewChange}
            valueAddNew={valueAddNew}
          />
          <ButtonsStatus
            checkedPosts={checkedPosts}
            handleFilter={handleFilter}
          />
          <PostList
            value={value}
            posts={renderedPosts.slice(0, renderedPosts.length - loadMoreCount)}
            loadMore={loadMore}
            loadMoreCount={loadMoreCount}
            checkboxHandler={checkboxHandler}
          />
          {!loadMoreCount ? <EnhancedModalMore /> : null}
        </>
      )}
    </>
  );
}
// }

Home = withLogic()(Home);
export default Home;
