import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveEmp,
  fetchEmp,
  updateEmp,
  fetchDesignations,
  fetchDepts,
} from "../../services/index";

import { Card, Form, Button, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Emp extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      depts: [],
      designations: [],
      show: false,
    };
  }

  initialState = {
    id: "",
    name: "",
    reportsTo: "",
    email: "",
    contactNumber: "",
    experience: "",
    designation: "",
    dept: "",
  };

  componentDidMount() {
    const empId = +this.props.match.params.id;
    if (empId) {
      this.findEmpById(empId);
    }
    this.findAllDesignations();
  }

  findAllDesignations = () => {
    this.props.fetchDesignations();
    setTimeout(() => {
      let empDesignations = this.props.empObject.designations;
      if (empDesignations) {
        this.setState({
          designations: [{ value: "", display: "Select Designation" }].concat(
            empDesignations.map((designation) => {
              return { value: designation, display: designation };
            })
          ),
        });
        this.findAllDepts();
      }
    }, 100);
  };

  findAllDepts = () => {
    this.props.fetchDepts();
    setTimeout(() => {
      let empDepts = this.props.empObject.depts;
      if (empDepts) {
        this.setState({
          depts: [{ value: "", display: "Select Department" }].concat(
            empDepts.map((dept) => {
              return { value: dept, display: dept };
            })
          ),
        });
      }
    }, 100);
  };

  findEmpById = (empId) => {
    this.props.fetchEmp(empId);
    setTimeout(() => {
      let emp = this.props.empObject.emp;
      if (emp != null) {
        this.setState({
          id: emp.id,
          name: emp.name,
          reportsTo: emp.reportsTo,
          email: emp.email,
          contactNumber: emp.contactNumber,
          experience: emp.experience,
          designation: emp.designation,
          dept: emp.dept,
        });
      }
    }, 1000);
  };

  resetEmp = () => {
    this.setState(() => this.initialState);
  };

  submitEmp = (event) => {
    event.preventDefault();

    const emp = {
      name: this.state.name,
      reportsTo: this.state.reportsTo,
     email: this.state.email, 
      contactNumber: this.state.contactNumber,
      experience: this.state.experience,
      designation: this.state.designation,
      dept: this.state.dept,
    };

    this.props.saveEmp(emp);
    setTimeout(() => {
      if (this.props.empObject.emp != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateEmp = (event) => {
    event.preventDefault();

    const emp = {
      id: this.state.id,
      name: this.state.name,
      reportsTo: this.state.reportsTo,
      email: this.state.email,
      contactNumber: this.state.contactNumber,
      experience: this.state.experience,
      // designation: this.state.designation,
      // dept: this.state.dept,
    };
    this.props.updateEmp(emp);
    setTimeout(() => {
      if (this.props.empObject.emp != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  empChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  empList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { name, reportsTo, email, contactNumber, experience, designation, dept } =
      this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Updated Successfully."
                : "Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card style={{backgroundColor: '#060b26', color: 'white'}}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Update Employee Details" : "Add New Employee Details"}
          </Card.Header>
          <Form
            onReset={this.resetEmp}
            onSubmit={this.state.id ? this.updateEmp : this.submitEmp}
            id="empFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Enter Employee Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="name"
                    value={name}
                    onChange={this.empChange}
                    className={" text-black"}
                    placeholder="Enter Employee Name"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridReportsTo">
                  <Form.Label>Reports To</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="reportsTo"
                    value={reportsTo}
                    onChange={this.empChange}
                    className={" text-black"}
                    placeholder="Reports To"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="email"
                      value={email}
                      onChange={this.empChange}
                      className={" text-black"}
                      placeholder="Enter Employee `Email`"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridContactNumber">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={this.empChange}
                    className={" text-black"}
                    placeholder="Enter Contact Number"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridExperience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="experience"
                    value={experience}
                    onChange={this.empChange}
                    className={" text-black"}
                    placeholder="In years"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDesignation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.empChange}
                    name="designation"
                    value={designation}
                    className={"text-black"}
                  >
                    {this.state.designations.map((designation) => (
                      <option key={designation.value} value={designation.value}>
                        {designation.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDept">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    onChange={this.empChange}
                    name="dept"
                    value={dept}
                    className={"text-black"}
                  >
                    {this.state.depts.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.display}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.empList()}
              >
                <FontAwesomeIcon icon={faList} /> Employee List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    empObject: state.emp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveEmp: (emp) => dispatch(saveEmp(emp)),
    fetchEmp: (empId) => dispatch(fetchEmp(empId)),
    updateEmp: (emp) => dispatch(updateEmp(emp)),
    fetchDesignations: () => dispatch(fetchDesignations()),
    fetchDepts: () => dispatch(fetchDepts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Emp);
