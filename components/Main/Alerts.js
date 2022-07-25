import { useEffect } from 'react'
import { connect } from "react-redux";
import { useSnackbar } from 'notistack'


import SB from './SB';
import { setAlert } from "../../actions";

const Alerts = (props) => {
  const { setAlert } = props
  const { message, severity } = props.alertState;
  const { enqueueSnackbar } = useSnackbar()
  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   props.setAlert({ open: false });
  // };

  useEffect(() => {
    if (!message) {
      return
    }
    
    enqueueSnackbar(message, { content: (key, message) => <SB id={key} message={message} severity={severity}/> })
    setAlert({ open: false, message: '', severity: ''})
  }, [message])

  return (
    // <Snackbar
    //   open={open}
    //   autoHideDuration={5000}
    //   onClose={handleClose}
    //   key="snack-1"
    //   TransitionComponent={Slide}
    // >
    //   <Alert severity={severity || "success"} sx={{ px: 5 }}>
    //     {message}
    //   </Alert>
    // </Snackbar>
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    alertState: state.alertState
  };
};

export default connect(mapStateToProps, { setAlert })(Alerts);
