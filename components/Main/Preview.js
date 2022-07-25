import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ReactHtmlParser from "react-html-parser";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import Fab from '@mui/material/Fab'

import { searchText } from "../../helpers/search-text.js";
import { transform } from "../../helpers/funcs";

const Preview = (props) => {
    const { mdData, isPreviewMode } = props;
    const [formattedData, setFormattedData] = useState("");
    const [formattedText, setFormattedText] = useState();
    const [startId, setStartId] = useState()
    // const startId = document.getElementById('startdoc')
    // let startId, textId, endId
    // const checkWindow = typeof window !== undefined
    // const startId = typeof window !== undefined && document.getElementById('startdoc')

    useEffect(() => {
        setFormattedData(searchText(mdData));
        setFormattedText(
            ReactHtmlParser(formattedData, { transform: transform })
        );

        if (typeof window !== undefined) {
            setStartId(document.getElementById('startdoc'))
        }

    }, []);

    useEffect(() => {
        const textId = document.querySelector("textarea");
        const endId = document.getElementById('enddoc')


        if (textId.selectionEnd >= textId.textLength - 50) {
            
            setTimeout(() => {
                endId.scrollIntoView()
            }, 100)

            
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
            xs={6}
            sx={{
                width: "100%",
                height: "calc(100vh - 114px)",
                borderLeft: isPreviewMode ? "none" : "1px solid",
                borderColor: "background.borders",
                flex: "1 1 auto",
                p: 5,
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
                    <div id='startdoc'></div>
                    {formattedText}
                    <div id='enddoc'></div>
                </Box>
                
            </ScrollSyncPane>
            <Fab size='medium' aria-label='top' title='Scroll to the top' sx={{ position: 'fixed', bottom: '15px', right: '10px', backgroundColor: 'primary.dOrange', "&:hover": { backgroundColor: 'primary.dOrange', opacity: '0.8' } }} onClick={() => startId.scrollIntoView()}>
                <KeyboardArrowUpRoundedIcon fontSize='large' sx={{ color: 'black' }}/>
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
