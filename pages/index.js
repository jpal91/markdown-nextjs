import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import Data from "../components/Data";
import { setData } from "../actions";

const Home = (props) => {
    const { isMenuOpen, isPreviewMode, setData } = props;

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
                setData(e);
            }
        });
    }, []);

    return (
        <Container
            sx={{
                maxWidth: "100% !important",
                height: "100%",
                maxHeight: "937px",
                justifyContent: "space-evenly",
                p: "0px !important",
                width: isMenuOpen ? "calc(100% - 240px)" : "100%",
                ml: isMenuOpen ? "240px" : 0,
            }}
        >
            <Grid
                item
                xs={6}
                sx={{
                    width: isPreviewMode ? '0%' : "100%",
                    height: "calc(100vh - 114px)",
                    p: isPreviewMode ? 0 : 5,
                    borderRight: "1px solid",
                    borderColor: "primary.vlgray",
                }}
            >
                <TextField
                    multiline
                    variant="standard"
                    onChange={(event) => setData(event)}
                    sx={{
                        width: "100%",
                        overflow: "auto",
                        tabSize: 1,
                    }}
                    minRows={30}
                    InputProps={{
                        disableUnderline: true,
                        sx: {
                            typography: "editor",
                            lineHeight: "24px",
                            tabSize: 1,
                        },
                    }}
                />
            </Grid>
            <Grid
                item
                xs={6}
                sx={{
                    width: "100%",
                    height: "calc(100vh - 114px)",
                    borderLeft: "1px solid",
                    borderColor: "primary.vlgray",
                    flex: "1 1 auto",
                    p: 5,
                    // px: 'auto',
                    typography: "body1",
                    justifyContent: isPreviewMode ? 'center' : "flex-start",
                }}
            >
                <Data />
            </Grid>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        isMenuOpen: state.isMenuOpen,
        isPreviewMode: state.isPreviewMode
    };
};

export default connect(mapStateToProps, { setData })(Home);
