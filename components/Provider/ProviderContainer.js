import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { connect } from "react-redux";
import { SnackbarProvider } from "notistack";

import theme from "../../styles/theme";
import themeDark from "../../styles/theme-dark";
import { getLocalData, setLightMode, setAlert } from "../../actions";

//Holds several provider components for theme, auth session, and alerts.
//Components were wrapped and put into this sub-component in _app so they
//would have access to redux state
const ProviderContainer = (props) => {
    const { isLightMode, getLocalData, session, setLightMode, setAlert } =
        props;

    //Handles a few initial calls on mount.
    //Checks if new user and sends alert with new user info.
    //Checks if user prefers lightmode and updates state is preference exists
    useEffect(() => {
        getLocalData();

        const newUser = localStorage.getItem("isNewUser");

        if (!newUser) {
            setAlert({
                open: true,
                message: "Looks like you're new here!",
                severity: "new",
            });
            localStorage.setItem("isNewUser", "true");
        }

        const prefTheme = localStorage.getItem("isLightMode");
        const resParse = prefTheme ? JSON.parse(prefTheme) : null;
        resParse && setLightMode(resParse);
    }, []);

    return (
        <ThemeProvider theme={isLightMode ? theme : themeDark}>
            <SessionProvider session={session}>
                <SnackbarProvider>{props.children}</SnackbarProvider>
            </SessionProvider>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => {
    return {
        isLightMode: state.isLightMode,
    };
};

export default connect(mapStateToProps, {
    getLocalData,
    setLightMode,
    setAlert,
})(ProviderContainer);
