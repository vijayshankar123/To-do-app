import React, { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { setCurrent, deleteTodo } from "../../actions/todoAction";
import { connect } from "react-redux";

const TodoItem = ({ deleteTodo, setCurrent, todo }) => {
  const onCurrent = () => {
    setCurrent(todo);
  };
  const onDelete = () => {
    deleteTodo(todo._id);
  };
  return (
    <Fragment>
      <div className="profile-github">
        <div className="repo bg-light p-1 my-1">
          <div>
            {todo.title && <h4 className="text-primary">{todo.title}</h4>}
            {todo.from && (
              <p>
                From : <Moment format="DD/MM/YYYY">{todo.from}</Moment>
              </p>
            )}
            {todo.to && (
              <p>
                To : <Moment format="DD/MM/YYYY">{todo.to}</Moment>
              </p>
            )}{" "}
            {todo.date && (
              <small>
                Created On : <Moment format="DD/MM/YYYY">{todo.date}</Moment>
              </small>
            )}
          </div>
          <div>
            <ul>
              <Link to="/create-todo" onClick={onCurrent}>
                <li className="badge badge-primary">EDIT</li>
              </Link>
              <Link onClick={onDelete}>
                <li className="badge badge-dark">DELETE</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default connect(null, { deleteTodo, setCurrent })(TodoItem);
