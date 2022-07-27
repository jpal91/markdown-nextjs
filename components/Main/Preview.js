import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ReactHtmlParser from "react-html-parser";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import Fab from "@mui/material/Fab";

import { searchText } from "../../helpers/search-text.js";
import { transform } from "../../helpers/funcs";

//Sub-component of MainApp, holds rendered Markdown

const Preview = (props) => {
    //mdData - actual typed string from the user
    //formattedData - mdData ran through the searchText() function, converting it to Markdown
    //formattedText - formattedData ran through ReactHtmlParser to render viewable
    const { mdData, isPreviewMode } = props;
    const [formattedData, setFormattedData] = useState("");
    const [formattedText, setFormattedText] = useState();
    const [startId, setStartId] = useState();

    useEffect(() => {
        setFormattedData(searchText(mdData));
        setFormattedText(
            ReactHtmlParser(formattedData, { transform: transform })
        );

        if (typeof window !== undefined) {
            setStartId(document.getElementById("startdoc"));
        }
    }, []);

    //Sets a small debounce in sending the typed data to state before it's
    //converted to Markdown
    useEffect(() => {
        const textId = document.querySelector("textarea");
        const endId = document.getElementById("enddoc");

        //Auto-scrolling feature if the user is typing near
        //the bottom of the screen
        if (textId.selectionEnd >= textId.textLength - 50) {
            setTimeout(() => {
                endId.scrollIntoView();
            }, 100);
        }

        const timerId = setTimeout(() => {
            setFormattedData(searchText(mdData));
        }, 100);

        return () => {
            clearTimeout(timerId);
        };
    }, [mdData]);

    useEffect(() => {
        setFormattedText(
            ReactHtmlParser(formattedData, { transform: transform })
        );
    }, [formattedData]);

    return (
        <Grid
            item
            xs={isPreviewMode ? 12 : 0}
            sm={isPreviewMode ? 12 : 6}
            variant="preview"
            sx={{
                borderLeft: isPreviewMode ? "none" : "1px solid",
                justifyContent: {
                    xs: "flex-start",
                    sm: isPreviewMode ? "center" : "flex-start",
                },
                display: { xs: !isPreviewMode && "none", sm: "flex" },
                p: { xs: 2, sm: 5 },
                borderColor: "background.borders",
                maxWidth: isPreviewMode ? "100%" : "50%",
            }}
        >
            <ScrollSyncPane>
                <Box
                    id="preview"
                    sx={{
                        width: {
                            xs: "100%",
                            sm: isPreviewMode ? "50%" : "100%",
                        },
                        overflow: "auto",
                        height: "100%",
                    }}
                >
                    <div id="startdoc"></div>
                    {formattedText}
                    <div id="enddoc"></div>
                </Box>
            </ScrollSyncPane>
            <Fab
                size="medium"
                aria-label="top"
                title="Scroll to the top"
                variant="preview"
                onClick={() => startId.scrollIntoView()}
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
    };
};

export default connect(mapStateToProps)(Preview);
