import React from "react";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import ReactHtmlParser from "react-html-parser";
import { keyframes } from "@emotion/react";

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

const grow = keyframes`
	from {
		width: 100%;
	}

	to {
		width: 40%;
	}
`

const shrink = keyframes`
	from {
		width: 40%;
	}

	to {
		width: 100%;
	}
`

const Data = (props) => {
    const { mdData, isPreviewMode } = props;
    const formattedData = mdData && searchText(mdData);

    return (

			<Box id="preview" sx={{ animation: isPreviewMode ? `${grow} 0.5s linear 0s 1 normal both` : `${shrink} 0.5s linear 0s 1 normal both`, width: '100%' }}>
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


//sx={{ animation: `${grow} 2s linear 0s 1 alternate forwards` }}

//animation: isPreviewMode ? `${grow} 2s linear 0s 1 normal forwards` : `${shrink} 2s linear 0s 1 normal forwards`,

//animation: isPreviewMode ? `${grow} 2s linear 0s 1 alternate forwards` : `${shrink} 10s linear 0s 1 alternate forwards`