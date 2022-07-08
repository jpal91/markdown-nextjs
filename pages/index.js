import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { keyframes } from "@emotion/react";

import Data from "../components/Data";
import { setData } from "../actions";

const grow = keyframes`
    from {
        opacity: 1;
    }

    10% {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const shrink = keyframes`
    0% {
        opacity: 1;
    }

    10% {
        opacity: 0;
    }

    90% {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

const disappear = keyframes`
    0% {
        width: 100%;
        padding: 40px;
        border-right: 2px solid hsl(222, 9%, 78%);
        visibility: visible;
    }

    50% {
        border-right: 0px;
        visibility: hidden;
    }

    100% {
        width: 0%;
        padding: 0px;
        border-right: 0px;
        visibility: hidden;
    }
`

const reappear = keyframes`
    from {
        width: 0%;
        padding: 0px;
        border-right: 0px;
        visibility: hidden;
    }

    20% {
        border-right: 2px solid hsl(222, 9%, 78%);
        visibility: hidden;
    }

    80% {
        border-right: 2px solid hsl(222, 9%, 78%);
        visibility: visible;
    }

    to {
        width: 100%;
        padding: 40px;
        border-right: 2px solid hsl(222, 9%, 78%);
        visibility: visible;
    }
`

const disappear2 = keyframes` 
    0% {
        flex: 0 0 50%;
        opacity: 1;
        padding: 40px;
    }

    100% {
        flex: 0 0 0%;
        opacity: 0;
        padding: 0px;
    }
`

const reappear2 = keyframes` 
    0% {
        flex: 0 0 0%;
        opacity: 0;
        padding: 0px;
    }

    60% {
        opacity: 0;
    }

    100% {
        opacity: 1;
        flex: 0 0 50%;
    }
`

const Home = (props) => {
    const { isMenuOpen, isPreviewMode, setData } = props;
    const [running, setRunning] = useState()

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

    useEffect(() => {
        if (!running) {
            console.log('here')
            setRunning('paused')
        }
        
        setRunning('running')

        setTimeout(() => setRunning('paused'), 500)
    },[isPreviewMode])

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
                xs={isPreviewMode ? 0 : 6}
                sx={{
                    width: '100%',
                    height: "calc(100vh - 114px)",
                    p: 5,
                    borderRight: "1px solid",
                    borderColor: "primary.vlgray",
                    // flex: '0 0 50%',
                    // display: isPreviewMode ? 'none' : 'inherit',
                    // animation: isPreviewMode ? `${disappear} 2s linear 1s 1 normal forwards` : `${reappear} 2s linear 1s 1 normal both`,
                    animation: isPreviewMode ? `${disappear2} 0.5s linear 0s 1 normal both` : `${reappear2} 0.5s linear 0s 1 normal both`
                    // animationPlayState: running
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
                        // visibility: isPreviewMode ? 'hidden' : 'visible'
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
                xs={isPreviewMode ? 12 : 6}
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    height: "calc(100vh - 114px)",
                    borderLeft: isPreviewMode ? 'none' : '1px solid',
                    borderColor: "primary.vlgray",
                    // flex: "0 0 50%",
                    p: 5,
                    typography: "body1",
                    // justifyContent: isPreviewMode ? 'center' : 'flex-start',
                    // contentVisibility: 'hidden',
                    // animation: isPreviewMode ? `${grow} 5s ease-in 0s 1 normal forwards` : `${shrink} 5s ease-in 0s 1 normal both`
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

//animation: isPreviewMode ? `${grow} 0.5s linear 0s 1 normal forwards` : `${shrink} 0.5s linear 0s 1 normal forwards`