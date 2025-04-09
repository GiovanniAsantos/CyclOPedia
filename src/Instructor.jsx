import React from "react";

class Instructor extends React.Component {
  constructor(props) {
    super(props);
  }

    componentDidMount() {
        console.log("Instructor Component Did Mount");
    }

    componentDidUpdate() {
        console.log("Instructor componentDidUpdate");
    }

    componentWillUnmount() {
        console.log("Instructor componentWillUnmount");
    }

  render() {
    console.log("Instructor render component");
    return (
      <div>
        Name: {this.props.instructor.name}
        <br />
        Email: {this.props.instructor.email}
        <br />
        Phone: {this.props.instructor.phone}
      </div>
    );
  }
}

export default Instructor;
