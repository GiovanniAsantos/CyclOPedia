import React from "react";
import { getRandomUser } from "./Utility/Api.jsx";
import Instructor from "./Instructor.jsx";

class CyclOPediaClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
      instructor: undefined,
      studentsList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  }

  componentDidMount = async () => {
    if (JSON.parse(localStorage.getItem("cyclopediaState"))) {
    } else {
      const response = await getRandomUser();
      this.setState((prevState) => {
        return {
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    }
  };

  componentDidUpdate = async (previousProps, previousState) => {
    console.log("componentDidUpdate");
    localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
    console.log(
      "componentDidUpdate previousState: " + previousState.studentCount
    );
    console.log("componentDidUpdate currentState: " + this.state.studentCount);

    if (previousState.studentCount < this.state.studentCount) {
      const response = await getRandomUser();
      this.setState((prevState) => {
        return {
          studentsList: [
            ...prevState.studentsList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    } else if (previousState.studentCount > this.state.studentCount) {
      this.setState((prevState) => {
        return {
          studentsList: [],
        };
      });
    }
  };

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleAllStudents = () => {
    this.setState((prevState) => {
      return {
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  handleRemoveAllStudents = () => {
    this.setState((prevState) => {
      return {
        studentCount: 0,
      };
    });
  };

  handleToggleInstructor = () => {
    this.setState((prevState) => {
      return {
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  render() {
    console.log("render component");
    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success">Instructor </span>
          <i
            className={`bi ${
              this.state.hideInstructor && this.state.instructor ? "bi-toggle-off" : "bi-toggle-on"
            }  btn btn-success btn-sm`}
            onClick={this.handleToggleInstructor}
          ></i>
          <br />
          {!this.state.hideInstructor ? (
            <Instructor instructor={this.state.instructor} />
          ) : null}
        </div>

        <div className="p-3">
          <span className="h4 text-success">Feedback</span>
          <br />
          <input
            type="text"
            placeholder="Name..."
            value={this.state.inputName}
            onChange={(e) => this.setState({ inputName: e.target.value })}
          />{" "}
          Value: {this.state.inputName}
          <br />
          <textarea
            placeholder="Feedback..."
            value={this.state.inputFeedback}
            onChange={(e) => this.setState({ inputFeedback: e.target.value })}
          />{" "}
          Value: {this.state.inputFeedback}
        </div>

        <div className="p-3">
          <span className="h4 text-success">Students</span>
          <br />
          <div>Student Coun : {this.state.studentCount}</div>
          <button
            className="btn btn-success btn-sm"
            onClick={() => this.handleAllStudents()}
          >
            Add Student
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.handleRemoveAllStudents()}
          >
            Remove All Students
          </button>

          {this.state.studentsList.map((student, index) => {
            return (
              <div className="text-white" key={index}>
                <span> - {student.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default CyclOPediaClassPage;
