import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";

import theme from "../../styles/theme";
import { getLocalData } from "../../actions";

const ProviderContainer = (props) => {
  const { isDarkMode, getLocalData } = props;

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? null : theme}>
      {props.children}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    isDarkMode: state.isDarkMode
  };
};

export default connect(mapStateToProps, { getLocalData })(ProviderContainer);
