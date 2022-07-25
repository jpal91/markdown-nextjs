import { useEffect } from 'react'
import { connect } from "react-redux";
import { useSnackbar } from 'notistack'


import AlertBuilder from './AlertBuilder';
import { setAlert } from "../../../actions";

const Alerts = (props) => {
  const { setAlert } = props
  const { message, severity } = props.alertState;
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!message) {
      return
    }
    
    enqueueSnackbar(message, { content: (key, message) => <AlertBuilder id={key} message={message} severity={severity}/> })
    setAlert({ open: false, message: '', severity: ''})
  }, [message])

  return (
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    alertState: state.alertState
  };
};

export default connect(mapStateToProps, { setAlert })(Alerts);
