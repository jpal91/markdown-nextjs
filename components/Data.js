import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import ReactHtmlParser, { processNodes } from "react-html-parser";

import { searchText } from "../helpers/search-text.js";

const transform = (node, index) => {
    if (node.name && node.name.startsWith("h")) {
        let tagName = node.name;
        return (
            <Typography key={index} variant={tagName}>
                {processNodes(node.children, transform)}
            </Typography>
        );
    }
};

const Data = (props) => {
    const { mdData, isPreviewMode } = props;
    // const formattedData = mdData && searchText(mdData);
    const [formattedData, setFormattedData] = useState('')

    useEffect(() => {
        if (!mdData) {
            return
        }

        setFormattedData(searchText(mdData))

    }, [mdData])

    return (
        <Box id="preview" sx={{ width: isPreviewMode ? '50%' : '100%', overflow: 'auto' }}>
            {ReactHtmlParser(formattedData, { transform: transform })}
        </Box>
    );
};

const mapStateToProps = (state) => {
	return {
		mdData: state.mdData,
		isPreviewMode: state.isPreviewMode
	}
}

export default connect(mapStateToProps)(Data);
