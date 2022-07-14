let alertObj = {
  open: false,
  message: "",
  severity: ""
};

export default (state = alertObj, action) => {
  if (action.type === "ALERT_STATUS") {
    if (!action.payload) {
      return alertObj;
    }
    return action.payload;
  } else {
    return state;
  }
};
