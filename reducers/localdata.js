let obj = {
  user: "",
  data: {}
};

export default (state = obj, action) => {
  if (action.type === "LOCAL_DATA") {
    return action.payload;
  } else {
    return state;
  }
};
