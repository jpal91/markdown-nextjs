import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import ReactHtmlParser, { processNodes, convertNodeToElement } from "react-html-parser";

import searchText from "../helpers/search-text.js";

const transform = (node, index) => {
    // if (node.name && node.name.startsWith("h")) {
    //     if (node.parent && node.parent.name === 'span') {
    //         return processNodes(node.children)
    //     }
        
    //     let tagName = node.name;
    //     return (
    //         <Typography key={index} variant={tagName}>
    //             {processNodes(node.children, transform)}
    //         </Typography>
    //     );
    // }
    // if (!node.parent) {
    //     processNodes(node.children, transform)
    // }

    // let headingTest = /(==[^=]+==)/
    // // console.log(node)
    // if (node.type === 'text' && node.data.match(headingTest)) {
    //     let match = node.data.match(/(?<===)[^=]+(?===)/)
    //     // node.data = node.data.replace(node.data.match(headingTest)[0], `<mark>${match[0]}</mark>`)
    //     // let next = ReactHtmlParser(`<mark>${match[0]}</mark>`)
    //     let nextNode = convertNodeToElement(`<mark>${match[0]}</mark>`)
    //     console.log(nextNode)
        // return processNodes(node.children, transform)
    // }

    
};

const preprocessNodes = (nodes) => {
    console.log(nodes)
}

const Data = (props) => {
    const { mdData, isPreviewMode } = props;
    // const formattedData = searchText(mdData);
    const formattedData = ReactHtmlParser(mdData, { transform: transform })
    // const [formattedData, setFormattedData] = useState('')
    // console.log(mdData.split(/<\/div>/))

    // useEffect(() => {
    //     if (!mdData) {
    //         return
    //     }

    //     setFormattedData(searchText(mdData))

    // }, [mdData])

    return (
        <Box id="preview" sx={{ width: isPreviewMode ? '50%' : '100%', overflow: 'auto' }}>
            {/* {ReactHtmlParser(formattedData, { transform: transform })} */}
            {formattedData}
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
