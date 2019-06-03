import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as searchOperations from "../../modules/search/searchOperations";

function Search({ setCurrentSearch, value }) {
  const handleInput = e => setCurrentSearch(e.target.value);
  return (
    <>
      <form className="form_input">
        <label>
          Search title/post:
          <input
            className="header_input"
            placeholder="Search something good here..."
            type="text"
            value={value}
            onChange={handleInput}
          />
        </label>
      </form>
    </>
  );
}
Search.propTypes = {
  value: PropTypes.string
};
Search.defaultProps = {
  value: ""
};

const mapDispatchToProps = {
  setCurrentSearch: searchOperations.actions.setCurrentSearch
};

const mapStateToProps = state => ({
  value: state.search.value
});
const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhancer(Search);
