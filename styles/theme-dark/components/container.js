const container = {
  styleOverrides: {
    root: {
      display: "flex",
    }
  },
  variants: [
    {
      props: { variant: 'main' },
      style: {
        maxWidth: "100% !important",
        height: "calc(100vh - 114px)",
        justifyContent: "space-evenly",
        p: "0px !important",
      }
    }
  ]
};

export default container;