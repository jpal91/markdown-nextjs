export default (state = "", action) => {
  if (action.type === "AUTH_USER") {
    return action.payload;
  } else {
    return state;
  }
};
