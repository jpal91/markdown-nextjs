import React from "react";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import ReactHtmlParser from "react-html-parser";

import { searchText } from "../helpers/search-text.js";

const transform = (node, index) => {
    if (node.name && node.name.startsWith("h")) {
        let tagName = node.name;
        let str = "";
        node.children.forEach((child) => (str += child.data));

        return (
            <Typography key={index} variant={tagName}>
                {str}
            </Typography>
        );
    }
};

const Data = (props) => {
    const { mdData, isPreviewMode } = props;
    const formattedData = mdData && searchText(mdData);

    return (
        <Box id="preview" sx={{ width: isPreviewMode ? '50%' : '100%' }}>
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
