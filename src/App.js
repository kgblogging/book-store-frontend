import React, { useEffect } from "react";
import Toast from "./components/ui/toast";
import MyLoader from "./components/ui/overlay"
import Routes from './routes'
import { onReload } from './store/auth/actions'
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.onReload()
  }, [])
  return (
    <div>
      {props.notification.loading ? <MyLoader active={props.notification.loading} /> : null}
      <Routes token={props.auth?.auth?.token} />
      <Toast />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notification: state.Notification,
    auth: state.Auth,
  }
}

export default connect(mapStateToProps, {onReload})(App);
