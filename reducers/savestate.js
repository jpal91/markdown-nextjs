export default (state = "local", action) => {
  if (action.type === "SAVE_STATE") {
    return action.payload;
  } else {
    return state;
  }
};
