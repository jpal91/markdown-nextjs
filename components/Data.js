import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ScrollSyncPane } from "react-scroll-sync";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import ReactHtmlParser, { processNodes, convertNodeToElement } from "react-html-parser";

import searchText from "../helpers/search-text.js";

const transform = (node, index) => {
    if (node.name && node.name.startsWith("h")) {
        if (node.parent && node.parent.name === 'span') {
            return (
                <p key={index}>
                    {processNodes(node.children, transform)}
                </p>
            )
        }
        let tagName = node.name;
        return (
            <Typography key={index} variant={tagName}>
                {processNodes(node.children, transform)}
            </Typography>
        );
    }
};

const preprocessNodes = (nodes) => {
    console.log(nodes)
}

const Data = (props) => {
    const { mdData, isPreviewMode } = props;
    const [formattedData, setFormattedData] = useState('')
    const [formattedText, setFormattedText] = useState()

    useEffect(() => {
        setFormattedData(searchText(mdData))
        setFormattedText(ReactHtmlParser(formattedData, { transform: transform }))
    }, [])

    useEffect(() => {
        
        const timerId = setTimeout(() => {
            setFormattedData(searchText(mdData))
        }, 100)
        
        return () => {
            clearTimeout(timerId)
        }

    // }, [mdData])

    useEffect(() => {
        setFormattedText(ReactHtmlParser(formattedData, { transform: transform }))
    }, [formattedData])



    return (
        <ScrollSyncPane>
        <Box id="preview" sx={{ width: isPreviewMode ? '50%' : '100%', overflow: 'auto', height: '100%' }}>
            {formattedText}
        </Box>
        </ScrollSyncPane>
    );
};

const mapStateToProps = (state) => {
	return {
		mdData: state.mdData,
		isPreviewMode: state.isPreviewMode
	}
}

export default connect(mapStateToProps)(Data);
