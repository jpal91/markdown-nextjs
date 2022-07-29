import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

import { setData, unsavedChanges } from "../../actions";

//Sub-component of MainApp - holds the editor area where the user types
const TextArea = (props) => {
    const {
        isPreviewMode,
        mdData,
        setData,
        unsaved,
        unsavedChanges,
        isExamplePage,
    } = props;
    const checkWindow = typeof window !== undefined;
    const [startId, setStartId] = useState();

    useEffect(() => {
        if (!checkWindow) {
            return;
        }

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

        if (typeof window !== undefined) {
            setStartId(document.getElementById("start-editor"));
        }
    }, []);

    //Tracks unsaved changes so alert can pop up if the user decides to exit
    //the screen before saving (for example)
    useEffect(() => {
        if (mdData.length === 0 || unsaved || isExamplePage) {
            return;
        }

        unsavedChanges(true);

        return () => {
            unsavedChanges(false);
        };
    }, [mdData]);

    useEffect(() => {
        if (!checkWindow) {
            return;
        }

        const warnUnsaved = () => {
            if (unsaved) {
                return "You have unsaved changes on this page!";
            }
        };

        window.onbeforeunload = warnUnsaved;
    }, [unsaved]);

    return (
        <Grid
            item
            xs={12}
            sm={6}
            sx={{
                width: isPreviewMode ? "0%" : "100%",
                height: "100%",
                p: isPreviewMode ? 0 : { xs: 2, sm: 5 },
                borderRight: {
                    xs: "none",
                    sm: isPreviewMode ? "none" : "1px solid",
                },
                borderRightColor: {
                    xs: "background.borders",
                    sm: "background.borders",
                },
                display: { xs: isPreviewMode && "none", sm: "flex" },
            }}
        >
            
            <ScrollSyncPane>
                <Box sx={{ width: '100%', overflow: "auto"}}>
                <div id="start-editor"></div>
                <TextField
                    multiline
                    variant="standard"
                    value={mdData}
                    onChange={(event) => setData(event.target.value)}
                    id="editor"
                    sx={{
                        width: "100%",
                        
                        height: "100%",
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
                </Box>
            </ScrollSyncPane>
            <Fab
                size="medium"
                aria-label="top"
                title="Scroll to the top"
                variant="preview"
                onClick={() => startId.scrollIntoView()}
                sx={{ display: { sm: 'none' }}}
            >
                <KeyboardArrowUpRoundedIcon
                    fontSize="large"
                    sx={{ color: "black" }}
                />
            </Fab>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        isPreviewMode: state.isPreviewMode,
        mdData: state.mdData,
        unsaved: state.unsaved,
        isExamplePage: state.isExamplePage,
    };
};

export default connect(mapStateToProps, { setData, unsavedChanges })(TextArea);
