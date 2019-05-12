import React from "react";
import PropTypes from "prop-types";

function Search({ handleFilter, value }) {
  const handleInput = e => handleFilter(e);
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

export default Search;
