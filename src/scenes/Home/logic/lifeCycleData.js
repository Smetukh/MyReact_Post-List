import { compose, lifecycle } from "recompose";

const lifeCycleData = compose(
  lifecycle({
    componentDidMount() {
      const url = "https://jsonplaceholder.typicode.com/posts";
      setTimeout(() => {
        fetch(url)
          .then(response => response.json())
          .then(
            this.props.onComponentDidMount
            // this.props.handleFilter(this.props.checkedPosts),
          )
          .then(this.handleFilter(this.props.checkedPosts))
          .catch(error => console.error(error));
      }, 1500);
    }
  })
);

export default lifeCycleData;
