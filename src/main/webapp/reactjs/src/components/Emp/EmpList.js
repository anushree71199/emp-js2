import React, { Component } from "react";

import { connect } from "react-redux";
import { deleteEmp } from "../../services/index";

import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";

class EmpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emps: [],
      search: "",
      currentPage: 1,
      empsPerPage: 5,
      sortDir: "asc",
    };
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
        ? this.setState({ sortDir: "desc" })
        : this.setState({ sortDir: "asc" });
      this.findAllEmps(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllEmps(this.state.currentPage);
  }

  findAllEmps(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/rest/emps?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.empsPerPage +
          "&sortBy=experience&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          emps: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  deleteEmp = (empId) => {
    this.props.deleteEmp(empId);
    setTimeout(() => {
      if (this.props.empObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllEmps(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllEmps(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllEmps(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllEmps(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.empsPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllEmps(condition);
      }
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.empsPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllEmps(this.state.currentPage + 1);
      }
    }
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancelSearch = () => {
    this.setState({ search: "" });
    this.findAllEmps(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/rest/emps/search/" +
          this.state.search +
          "?page=" +
          currentPage +
          "&size=" +
          this.state.empsPerPage
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          emps: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  };

  render() {
    const { emps, currentPage, totalPages, search } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Deleted Successfully."}
            type={"danger"}
          />
        </div>
        {/* <Card className={"border border-dark bg-dark text-white"}> */}
        <Card className={"border text-white"} style={{backgroundColor: '#060b26'}}>
          <Card.Header>
            <div style={{ float: "left" }}>
              <FontAwesomeIcon icon={faList} /> Employee List
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="sm">
                <FormControl
                  placeholder="Search"
                  name="search"
                  value={search}
                  className={"info-border bg-dark text-white"}
                  onChange={this.searchChange}
                />
                <InputGroup.Append>
                  <Button
                    size="sm"
                    variant="outline-info"
                    type="button"
                    onClick={this.searchData}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    type="button"
                    onClick={this.cancelSearch}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped style={{backgroundColor: '#060b26'}} variant="dark">
            
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reports To</th>
                  <th>Contact Number</th>
                  <th onClick={this.sortData}>
                    Experience{" "}
                    <div
                      className={
                        this.state.sortDir === "asc"
                          ? "arrow arrow-up"
                          : "arrow arrow-down"
                      }
                    >
                      {" "}
                    </div>
                  </th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {emps.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">No Such Employee Found.</td>
                  </tr>
                ) : (
                  emps.map((emp) => (
                    <tr key={emp.id}>
                      <td>
                        {emp.name}
                      </td>
                      <td>{emp.reportsTo}</td>
                      <td>{emp.contactNumber}</td>
                      <td>{emp.experience}</td>
                      <td>{emp.designation}</td>
                      <td>{emp.dept}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"edit/" + emp.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => this.deleteEmp(emp.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          {emps.length > 0 ? (
            <Card.Footer>
              <div style={{ float: "left" }}>
                Showing Page {currentPage} of {totalPages}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button
                    style={{color: 'white'}}
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.firstPage}
                    >
                      <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl
                    className={"page-num bg-dark"}
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  <InputGroup.Append>
                    <Button
                    style={{color: 'white'}}
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      <FontAwesomeIcon icon={faStepForward} /> Next
                    </Button>
                    <Button
                    style={{color: 'white'}}
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.lastPage}
                    >
                      <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Footer>
          ) : null}
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
    deleteEmp: (empId) => dispatch(deleteEmp(empId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmpList);
