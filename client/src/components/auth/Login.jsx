import React, { useEffect, Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, clearError } from "../../actions/authAction";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alertAction";

const Login = ({
  setAlert,
  login,
  clearError,
  auth: { isAuthenticated, error }
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

  const { email, password } = formData;
  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
    setFormData({
      email: "",
      password: ""
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
        <h1 className="large text-primary">Log In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Login to your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
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

          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
      </div>
    </Fragment>
  );
};

const mapStatToProps = state => ({
  auth: state.auth
});
export default connect(mapStatToProps, { clearError, login, setAlert })(Login);
