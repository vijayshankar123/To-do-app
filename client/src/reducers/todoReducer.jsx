import {
  GET_TODO,
  TODO_ERROR,
  UPDATE_TODO,
  DELETE_TODO,
  CREATE_TODO,
  CLEAR_TODO,
  SET_CURRENT,
  CLEAR_CURRENT
} from "../actions/types";

const initialState = {
  todo: [],
  loading: true,
  current: null,
  error: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODO:
      return {
        ...state,
        todo: action.payload,
        loading: false
      };
    case CREATE_TODO:
      return {
        ...state,
        todo: [action.payload, ...state.todo],
        loading: false
      };
    case UPDATE_TODO:
      return {
        ...state,
        todo: state.todo.filter(
          todo => (todo._id === action.payload._id ? action.payload : todo)
        ),
        loading: false
      };
    case DELETE_TODO:
      return {
        ...state,
        todo: state.todo.filter(todo => todo._id !== action.payload),
        loading: false
      };
    case TODO_ERROR:
    case CLEAR_TODO:
      return {
        ...state,
        error: action.payload,
        loading: false,
        todo: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false
      };
    default:
      return state;
  }
}
