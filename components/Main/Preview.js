import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ReactHtmlParser from "react-html-parser";

import { searchText } from "../../helpers/search-text.js";
import { transform } from "../../helpers/funcs";

const Preview = (props) => {
    const { mdData, isPreviewMode } = props;
    const [formattedData, setFormattedData] = useState("");
    const [formattedText, setFormattedText] = useState();

    useEffect(() => {
        setFormattedData(searchText(mdData));
        setFormattedText(
            ReactHtmlParser(formattedData, { transform: transform })
        );
    }, []);

    useEffect(() => {
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
            xs={6}
            sx={{
                width: "100%",
                height: "calc(100vh - 114px)",
                borderLeft: isPreviewMode ? "none" : "1px solid",
                borderColor: "primary.vlgray",
                flex: "1 1 auto",
                p: 5,
                // px: 'auto',
                typography: "body1",
                justifyContent: isPreviewMode ? "center" : "flex-start",
            }}
        >
            <ScrollSyncPane>
                <Box
                    id="preview"
                    sx={{
                        width: isPreviewMode ? "50%" : "100%",
                        overflow: "auto",
                        height: "100%",
                    }}
                >
                    {formattedText}
                </Box>
            </ScrollSyncPane>
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
