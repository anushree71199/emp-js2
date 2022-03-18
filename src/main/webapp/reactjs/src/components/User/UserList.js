import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../services/index";
import { Tree, TreeNode } from 'react-organizational-chart';
import  styled  from 'styled-components';
import Hierarchy from './Hierarchy';
import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers
} from "@fortawesome/free-solid-svg-icons";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

 
  render() {
        return (
   
      <div>
       
          <Card className={"text-black"} style={{borderColor: '#060b26'}}>
            <Card.Header>
              <FontAwesomeIcon icon={faUsers}/> Hierarchy
            </Card.Header>
            <Card.Body style={{translateX: '0px', overflow: 'hidden'}}>
              <Hierarchy /> 
             
            </Card.Body>
           
          </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
