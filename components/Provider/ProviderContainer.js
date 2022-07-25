import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { connect } from "react-redux";
import { SnackbarProvider } from "notistack";

import theme from "../../styles/theme";
import themeDark from "../../styles/theme-dark";
import { getLocalData, setLightMode, setAlert } from "../../actions";

const ProviderContainer = (props) => {
    const { isLightMode, getLocalData, session, setLightMode, setAlert } =
        props;

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
