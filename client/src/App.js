import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./routing/PrivateRoute";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import TodoForm from "./components/dashboard/TodoForm";
import { loadUser } from "./actions/authAction";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Alert />
          <Switch>
            <Route exact path="/Register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-todo" component={TodoForm} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
