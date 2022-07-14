import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { connect } from "react-redux";

import { setAlert } from "../../actions";

const Alerts = (props) => {
  const { message, severity, open } = props.alertState;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setAlert({ open: false });
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      key="snack-1"
    >
      <Alert severity={severity || "success"} sx={{ px: 5 }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => {
  return {
    alertState: state.alertState
  };
};

export default connect(mapStateToProps, { setAlert })(Alerts);
