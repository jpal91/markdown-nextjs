import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ScrollSync } from "react-scroll-sync";
import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { setData, setButtonStatus, getDBData } from "../../actions";
import TextArea from "./TextArea";
import Preview from "./Preview";
import MainModal from "./Modals/MainModal";

//Main component holding the application
//Includes Editor(TextArea) and Preview sub-components

const MainApp = (props) => {
    const { isMenuOpen, setData, isScrollSync, loading } = props;

    useEffect(() => {
        const textId = document.querySelector("textarea");

        textId.addEventListener("keydown", (e) => {
            if (e.code === "Tab") {
                e.preventDefault();
                textId.setRangeText(
                    "\t",
                    textId.selectionStart,
                    textId.selectionStart,
                    "end"
                );
                setData(e.target.value);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <ScrollSync enabled={isScrollSync}>
                <Container
                    variant='main'
                    sx={{
                        width: {lg: isMenuOpen ? "calc(100% - 240px)" : "100%", xs: '100%'},
                        ml: { lg: isMenuOpen ? "240px" : 0, xs: 0} ,
                    }}
                >
                    <TextArea />
                    <Preview />
                </Container>
            </ScrollSync>
            <MainModal />
            <Backdrop open={loading}>
                <CircularProgress sx={{ color: "primary.lOrange" }} />
            </Backdrop>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isMenuOpen: state.isMenuOpen,
        isScrollSync: state.isScrollSync,
        loading: state.loading,
    };
};

export default connect(mapStateToProps, {
    setData,
    setButtonStatus,
    getDBData,
})(MainApp);
