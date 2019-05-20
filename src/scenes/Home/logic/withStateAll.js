import {
  compose,
  withHandlers,
  withState,
  mapProps,
  withProps,
  lifecycle
} from "recompose";
const withStateAll = () => {
  compose(
    lifecycle({
      componentDidMount() {
        console.log("componentDidMount props = ", this.props);
        // }}),
        const url = "https://jsonplaceholder.typicode.com/posts";
        let self = this;
        setTimeout(() => {
          fetch(url)
            .then(response => response.json())
            .then(
              // let self = this.props,
              // setTimeout(() => {

              // function(){
              this.props.onComponentDidMount
              // }

              // }, 1500)
            )
            .then(this.props.handleFilter(this.props.checkedPosts))
            .catch(error => console.error(error));
        }, 1500);
      }
    })
  );
};

export default withStateAll;
