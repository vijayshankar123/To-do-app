import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getTodo } from "../../actions/todoAction";
import { loadUser } from "../../actions/authAction";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";
import { Link } from "react-router-dom";

const Dashboard = ({
  clearCurrent,
  loadUser,
  getTodo,
  todo: { loading, todo }
}) => {
  useEffect(
    () => {
      loadUser();
      getTodo();
    },
    [loadUser, getTodo]
  );

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="large text-primary">DASHBOARD {"      "}</h1>
      <h2 className="text-secondary my-1">Your To-Dos</h2>
      {todo !== null && todo.length > 0 ? (
        <div>
          {todo.map(todo => <TodoItem key={todo._id} todo={todo} />)}
          <Link className="btn btn-dark" to="/create-todo">
            {" "}
            Create new To-do
          </Link>
        </div>
      ) : (
        <div>
          <p>You have not yet created To-Do, Please create your To-Do</p>
          <Link className="btn btn-secondary" to="/create-todo">
            Create new To-do
          </Link>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  todo: state.todo
});
export default connect(mapStateToProps, { loadUser, getTodo })(Dashboard);
