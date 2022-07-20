import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from 'next-auth/react'
import { connect } from "react-redux";
import { SnackbarProvider } from 'notistack'

import theme from "../../styles/theme";
import themeDark from '../../styles/theme-dark'
import { getLocalData } from "../../actions";

const ProviderContainer = (props) => {
  const { isLightMode, getLocalData, session } = props;

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <ThemeProvider theme={isLightMode ? theme : themeDark}>
      <SessionProvider session={session}>
        <SnackbarProvider>
          {props.children}
        </SnackbarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    isLightMode: state.isLightMode
  };
};

export default connect(mapStateToProps, { getLocalData })(ProviderContainer);
