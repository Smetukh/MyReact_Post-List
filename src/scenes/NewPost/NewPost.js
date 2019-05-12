import React from "react";
import PropTypes from "prop-types";

function NewPost({ handleSubmitNew, handleAddNewChange, valueAddNew }) {
  const handleSubmit = e => handleSubmitNew(e);
  const handleChange = e => handleAddNewChange(e);
  return (
    <form className="form_input" onSubmit={handleSubmit}>
      <label>
        Add New Post:
        <input
          className="header_input add_post"
          placeholder="Add something good here..."
          type="text"
          value={valueAddNew}
          onChange={handleChange}
        />
      </label>
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
}
NewPost.propTypes = {
  valueAddNew: PropTypes.string
};
NewPost.defaultProps = {
  valueAddNew: ""
};

export default NewPost;
