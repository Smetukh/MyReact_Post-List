import React from "react";
import { routes } from "../router";
import { Link } from "react-router-dom";

function ButtonsStatus({ handleFilter, checkedPosts }) {
  const clickHandler = e => handleFilter(e);
  return (
    <>
      <button
        className="buttonMore"
        style={{
          background: checkedPosts === "" ? "#D3D3D3" : "#40a9f3"
        }}
        disabled={checkedPosts === ""}
        onClick={() => clickHandler("")}
      >
        <Link to={routes.home}> All </Link>
      </button>
      <button
        className="buttonMore"
        style={{
          background: checkedPosts === false ? "#D3D3D3" : "#c1ffc1"
        }}
        disabled={checkedPosts === false}
        onClick={() => clickHandler(false)}
      >
        <Link to={routes.active}>New</Link>
      </button>
      <button
        className="buttonMore"
        style={{ background: checkedPosts === true ? "#D3D3D3" : "#F08080" }}
        disabled={checkedPosts === true}
        onClick={() => clickHandler(true)}
      >
        <Link to={routes.completed}>Done</Link>
      </button>
    </>
  );
}
ButtonsStatus.propTypes = {};
ButtonsStatus.defaultProps = {};

export default ButtonsStatus;
