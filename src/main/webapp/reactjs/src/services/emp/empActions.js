import * as BT from "./empTypes";
import axios from "axios";

export const saveEmp = (emp) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_EMP_REQUEST,
    });
    axios
      .post("http://localhost:8081/rest/emps", emp)
      .then((response) => {
        dispatch(empSuccess(response.data));
      })
      .catch((error) => {
        dispatch(empFailure(error));
      });
  };
};

export const fetchEmp = (empId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_EMP_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/emps/" + empId)
      .then((response) => {
        dispatch(empSuccess(response.data));
      })
      .catch((error) => {
        dispatch(empFailure(error));
      });
  };
};

export const updateEmp = (emp) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_EMP_REQUEST,
    });
    axios
      .put("http://localhost:8081/rest/emps", emp)
      .then((response) => {
        dispatch(empSuccess(response.data));
      })
      .catch((error) => {
        dispatch(empFailure(error));
        console.log(error);
      });
  };
};

export const deleteEmp = (empId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_EMP_REQUEST,
    });
    axios
      .delete("http://localhost:8081/rest/emps/" + empId)
      .then((response) => {
        dispatch(empSuccess(response.data));
      })
      .catch((error) => {
        dispatch(empFailure(error));
      });
  };
};

const empSuccess = (emp) => {
  return {
    type: BT.EMP_SUCCESS,
    payload: emp,
  };
};

const empFailure = (error) => {
  return {
    type: BT.EMP_FAILURE,
    payload: error,
  };
};

export const fetchDesignations = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_DESIGNATIONS_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/emps/designations")
      .then((response) => {
        dispatch({
          type: BT.DESIGNATIONS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.DESIGNATIONS_FAILURE,
          payload: error,
        });
      });
  };
};

export const fetchDepts = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_DEPTS_REQUEST,
    });
    axios
      .get("http://localhost:8081/rest/emps/depts")
      .then((response) => {
        dispatch({
          type: BT.DEPTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: BT.DEPTS_FAILURE,
          payload: error,
        });
      });
  };
};
/*Genres= Dept
Languages = Designation
title=name
price=experience
author=reportsTo
URL = email
isbn = contact number*/