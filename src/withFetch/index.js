import React from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");
const withFetch = entity => BaseComponent => {
  class WithFetch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: entity
      };
      this.el = document.createElement("div");
    }

    componentDidMount() {
      // Append the element into the DOM on mount. We'll render
      // into the modal container element (see the HTML tab).
      modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
      // Remove the element from the DOM when we unmount
      modalRoot.removeChild(this.el);
    }
    render() {
      return ReactDOM.createPortal(
        // Any valid React child: JSX, strings, arrays, etc.
        <BaseComponent {...this.props} data={this.state.data} />,
        // A DOM element
        this.el
      );
    }
  }
  return WithFetch;
};
export default withFetch;
