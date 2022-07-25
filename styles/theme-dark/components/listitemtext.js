import typography from "../base/typography";

const { sideNavText, sideNavSubText } = typography;

const listItemText = {
  styleOverrides: {
    root: {},
    primary: { ...sideNavText },
    secondary: { ...sideNavSubText }
  }
};

export default listItemText;
