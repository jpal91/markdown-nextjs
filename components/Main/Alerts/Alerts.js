import { useEffect } from 'react'
import { connect } from "react-redux";
import { useSnackbar } from 'notistack'


import AlertBuilder from './AlertBuilder';
import { setAlert, setLoading } from "../../../actions";

//Component which holds the functionality of creating alerts
//Reads the incoming alertState sent from Redux and builds 
//a new alert with notistack
const Alerts = (props) => {
  const { setAlert, setLoading } = props
  const { message, severity } = props.alertState;
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!message) {
      return
    }
    
    enqueueSnackbar(message, { content: (key, message) => <AlertBuilder id={key} message={message} severity={severity} setLoading={setLoading}/> })
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

export default connect(mapStateToProps, { setAlert, setLoading })(Alerts);
