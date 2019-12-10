import {
  GET_TODO,
  TODO_ERROR,
  UPDATE_TODO,
  DELETE_TODO,
  CREATE_TODO,
  SET_CURRENT,
  CLEAR_CURRENT
} from "./types";
import axios from "axios";
import { setAlert } from "./alertAction";
//get todos
export const getTodo = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/todo");
      dispatch({
        type: GET_TODO,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: TODO_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//add a todo

export const addTodo = (formData, history) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/todo", formData, config);
      dispatch({
        type: CREATE_TODO,
        payload: res.data
      });
      history.push("/dashboard");
      dispatch(setAlert("To-Do successfully created", "success"));
    } catch (err) {
      dispatch({
        type: TODO_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//SET CURRENT
export const setCurrent = todo => {
  return dispatch => {
    dispatch({
      type: SET_CURRENT,
      payload: todo
    });
  };
};

//clear CURRENT
export const clearCurrent = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };
};

//update todo
export const updateTodo = (formData, history) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        "/api/todo/" + formData._id,
        formData,
        config
      );
      dispatch({
        type: UPDATE_TODO,
        payload: res.data
      });
      history.push("/dashboard");
      dispatch(clearCurrent());
      dispatch(setAlert("To-Do successfully updated", "success"));
    } catch (err) {
      dispatch({
        type: TODO_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};

//delete todo
export const deleteTodo = id => {
  return async dispatch => {
    try {
      const res = await axios.delete("/api/todo/" + id);
      dispatch({
        type: DELETE_TODO,
        payload: id
      });

      dispatch(clearCurrent());
      dispatch(setAlert("To-Do successfully deleted", "success"));
    } catch (err) {
      dispatch({
        type: TODO_ERROR,
        payload: err.response.data.msg
      });
    }
  };
};
