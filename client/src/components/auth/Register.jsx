import React, { useEffect, Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { registerUser, clearError } from "../../actions/authAction";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alertAction";

const Register = ({
  auth: { isAuthenticated, error },
  clearError,
  registerUser,
  setAlert
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  useEffect(
    () => {
      if (error) {
        setAlert(error, "danger");
        clearError();
      }
    },
    [error]
  );

  const { name, email, password, password2 } = formData;
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords do not match", "danger");
    } else {
      registerUser({ name, email, password });
    }
    setFormData({
      name: "",
      email: "",
      password: "",
      password2: ""
    });
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="my-3">
        <Link to="/" className="btn btn-secondary">
          {" "}
          Back
        </Link>
      </div>
      <div>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              onChange={onChange}
              value={email}
              name="email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { clearError, registerUser, setAlert })(
  Register
);
