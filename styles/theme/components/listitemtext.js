import typography from "../base/typography";

const { sideNavText } = typography;

const listItemText = {
  styleOverrides: {
    root: {},
    primary: { ...sideNavText }
  }
};

export default listItemText;
