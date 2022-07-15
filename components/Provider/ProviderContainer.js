import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";

import theme from "../../styles/theme";
import themeDark from '../../styles/theme-dark'
import { getLocalData } from "../../actions";

const ProviderContainer = (props) => {
  const { isLightMode, getLocalData } = props;

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <ThemeProvider theme={isLightMode ? theme : themeDark}>
      {props.children}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    isLightMode: state.isLightMode
  };
};

export default connect(mapStateToProps, { getLocalData })(ProviderContainer);
