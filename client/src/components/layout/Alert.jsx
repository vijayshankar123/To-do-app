import React from "react";
import { connect } from "react-redux";
const Alert = ({ alert }) => {
  return (
    <div>
      {alert !== null &&
        alert.length > 0 &&
        alert.map(item => (
          <div key={item.id} className={"alert alert-" + item.type}>
            {item.msg}
          </div>
        ))}
    </div>
  );
};
const mapStateToProps = state => ({
  alert: state.alert
});
export default connect(mapStateToProps)(Alert);
