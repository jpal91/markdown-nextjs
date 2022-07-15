import { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { setData, unsavedChanges } from "../../actions";

const TextArea = (props) => {
    const { isPreviewMode, mdData, setData, unsaved, unsavedChanges, isExamplePage } = props;

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

    useEffect(() => {
        if (mdData.length === 0 || unsaved || isExamplePage) {
            return
        }

        unsavedChanges(true)

        return () => {
            unsavedChanges(false)
        }
    }, [mdData])

    return (
        <Grid
            item
            xs={6}
            sx={{
                width: isPreviewMode ? "0%" : "100%",
                height: "calc(100vh - 114px)",
                p: isPreviewMode ? 0 : 5,
                borderRight: isPreviewMode ? "none" : "1px solid",
                borderColor: "primary.vlgray",
            }}
        >
            <ScrollSyncPane>
                <TextField
                    multiline
                    variant="standard"
                    value={mdData}
                    onChange={(event) => setData(event.target.value)}
                    sx={{
                        width: "100%",
                        overflow: "auto",
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
            </ScrollSyncPane>
        </Grid>
    );
};

const mapStateToProps = (state) => {
    return {
        isPreviewMode: state.isPreviewMode,
        mdData: state.mdData,
        unsaved: state.unsaved,
        isExamplePage: state.isExamplePage
    };
};

export default connect(mapStateToProps, { setData, unsavedChanges })(TextArea);
