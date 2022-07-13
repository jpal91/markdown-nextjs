import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import reduxThunk from "redux-thunk";
import { CssBaseline } from "@mui/material";

import ProviderContainer from "../components/Provider/ProviderContainer";
import NavBar from "../components/NavBar";
import reducers from "../reducers";
import '../public/theme.css'

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(reduxThunk))
)

function MyApp({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Provider store={store}>
                <ProviderContainer>
                    <CssBaseline />
                    <NavBar />
                    <Component {...pageProps} />
                </ProviderContainer>
            </Provider>
        </React.Fragment>
    );
}

export default MyApp;
