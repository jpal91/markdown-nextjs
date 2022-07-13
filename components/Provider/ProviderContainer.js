import { ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";

import theme from "../../styles/theme";

const ProviderContainer = (props) => {
    const { isDarkMode } = props;

    return (
        <ThemeProvider theme={isDarkMode ? null : theme}>
            {props.children}
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => {
    return {
        isDarkMode: state.isDarkMode,
    };
};

export default connect(mapStateToProps)(ProviderContainer);
