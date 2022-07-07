import React from "react";
import Typography from "@mui/material/Typography";
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
  const { data } = props;
  const formattedData = data && searchText(data);

  return (
    <div id="preview">
      {ReactHtmlParser(formattedData, { transform: transform })}
    </div>
  );
};

export default Data;
