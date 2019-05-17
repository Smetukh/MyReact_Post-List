import React from "react";

function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{props.data}</p>
      </div>
    </div>
  );
}
export default Modal;
