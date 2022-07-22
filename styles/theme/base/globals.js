const globals = {
  html: {
    scrollBehavior: "smooth"
  },
  "::-webkit-scrollbar": {
    width: "5px"
  },
  "::-webkit-scrollbar-track": {
    visibility: "hidden"
  },
  "::-webkit-scrollbar-thumb": {
    visibility: "hidden"
  },
  ":hover": {
    "::-webkit-scrollbar-thumb": {
      border: "5px solid gray",
      borderRadius: "10px",
      visibility: "visible"
    }
  },
  "a:link": {
    color: 'cornflowerblue'
  },
  "a:visited": {
    color: 'cornflowerblue'
  }
};

export default globals;
