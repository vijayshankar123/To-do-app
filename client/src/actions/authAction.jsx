import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  USER_LOADED,
  ERROR,
  CLEAR_ERROR,
  CLEAR_TODO
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { setAlert } from "./alertAction";

//LOAD USER
export const loadUser = () => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//REGISTER USER

export const registerUser = ({ name, email, password }) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch(setAlert("User successfully registered", "success"));
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//login user
export const login = ({ email, password }) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
      dispatch(setAlert("successfully logged in", "success"));
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

export const clearError = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_ERROR
    });
  };
};

//LOGOUT
export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    });
    dispatch({
      type: CLEAR_TODO
    });
    dispatch(setAlert("successfully logged out", "success"));
  };
};
