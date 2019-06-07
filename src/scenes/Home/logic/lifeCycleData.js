import { compose, lifecycle } from "recompose";

const lifeCycleData = compose(
  lifecycle({
    componentDidMount() {
      const url = "https://jsonplaceholder.typicode.com/posts";
      setTimeout(() => {
        fetch(url)
          .then(response => response.json())
          .then(this.props.onComponentDidMount)
          .then(this.handleFilter(this.props.checkedPosts))
          .catch(error => console.error(error));
      }, 0);
    }
  })
);

export default lifeCycleData;
