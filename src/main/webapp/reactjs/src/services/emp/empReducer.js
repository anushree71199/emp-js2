import * as BT from "./empTypes";

const initialState = {
  emp: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_EMP_REQUEST:
    case BT.FETCH_EMP_REQUEST:
    case BT.UPDATE_EMP_REQUEST:
    case BT.DELETE_EMP_REQUEST:
    case BT.FETCH_DESIGNATIONS_REQUEST:
    case BT.FETCH_DEPTS_REQUEST:
      return {
        ...state,
      };
    case BT.EMP_SUCCESS:
      return {
        emp: action.payload,
        error: "",
      };
    case BT.EMP_FAILURE:
      return {
        emp: "",
        error: action.payload,
      };
    case BT.DESIGNATIONS_SUCCESS:
      return {
        designations: action.payload,
        error: "",
      };
    case BT.DESIGNATIONS_FAILURE:
      return {
        designations: "",
        error: action.payload,
      };
    case BT.DEPTS_SUCCESS:
      return {
        depts: action.payload,
        error: "",
      };
    case BT.DEPTS_FAILURE:
      return {
        depts: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
