let obj = {
  user: "",
  docs: {}
};

export default (state = obj, action) => {
  if (action.type === "LOCAL_DATA") {
    return action.payload;
  } else {
    return state;
  }
};
