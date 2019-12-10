import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addTodo, updateTodo } from "../../actions/todoAction";

const TodoForm = ({ todo: { current }, updateTodo, addTodo, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    from: "",
    to: ""
  });

  useEffect(() => {
    if (current !== null) {
      setFormData(current);
    }
  }, []);

  const { title, from, to } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current !== null) {
      updateTodo(formData, history);
    } else {
      addTodo(formData, history);
    }
    setFormData({
      title: "",
      from: "",
      to: ""
    });
  };

  return (
    <div>
      {current !== null ? (
        <h1 className="large text-primary">Edit Your New To-Do</h1>
      ) : (
        <h1 className="large text-primary">Create Your New To-Do</h1>
      )}

      <small>* = required field</small>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your To-Do"
            name="title"
            onChange={onChange}
            value={title}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="date"
            placeholder="From"
            name="from"
            onChange={onChange}
            value={from}
          />
        </div>
        <div className="form-group">
          <input
            type="Date"
            placeholder="To"
            name="to"
            onChange={onChange}
            value={to}
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="/dashboard">
          Go Back
        </a>
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  todo: state.todo
});
export default connect(mapStateToProps, { updateTodo, addTodo })(TodoForm);
