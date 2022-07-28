import React from "react";
import { processNodes } from "react-html-parser";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

/**
 * 
 * @param {array} matches - Array of string items matching the description of being a ordered or unordered list item
 * @example ['1. First list item, '2. Second list item', ' 1. Embedded list item']
 * @param {boolean} ordered - Indicates whether list sent was ordered or unordered to know which to build
 * @returns - Array of list items, updated with appropriate HTML
 * @example ['<ol><li>First list item</li><li>Second list item</li><ol><li>Embedded List Item</li></ol></ol>']
 */
export const listBuilder = (matches, ordered) => {
    const olOrUl = ordered
        ? { open: "<ol>", close: "</ol>" }
        : { open: "<ul>", close: "</ul>" };

    let index = 0;

    return matches.map((l, i) => {
        //Matches either "- some text" or "1. some text"
        let item = /(?<=(-|\d\.)\s).+/;
        let targetItem = l.match(item);
        if (!targetItem) { return }
        
        //Finds the index of the preceding token "-" or "1"
        //If the index of the current item is the same as the last, we shouldn't create an embedded list
        //If the index is greater, the next item should be embedded
        //If the index is less, the next item should close the last embedding and continue on the main list
        let currIndex = ordered ? l.indexOf(l.match(/\d/)[0]) : l.indexOf("-");
        let lastIndex =
            i > 0 && ordered
                ? matches[i - 1].indexOf(matches[i - 1].match(/\d/)[0])
                : i > 0 && !ordered
                ? matches[i - 1].indexOf("-")
                : 0;
        let newItem = "";
        newItem += `<li>` + targetItem[0] + "</li>";

        /**
         * Tracks the overall index of the chain so we know what to do next
         * Example -
         * 
         * Previous item - '2. Second List item' (lastIndex === 0)
         * Current item - ' 1. Embedded List item' (currIndex === 1 because of space in front of digit)
         * index + 1
         */
        currIndex < lastIndex
            ? index--
            : currIndex > lastIndex
            ? index++
            : currIndex === lastIndex
            ? (index = index)
            : (index = index);

        //Since index is higher (example above) - we start the new list item with '<ol>' + '<li>Embedded List Item</li>'
        let newString =
            currIndex < lastIndex
                ? olOrUl.close + newItem
                : currIndex > lastIndex
                ? olOrUl.open + newItem
                : currIndex === lastIndex
                ? newItem
                : '';

        //If we've reached the end of the list, we add + </ol> to the end of the string
        //If it's the beginning of the list we add <ol> + generated string
        if (i === matches.length - 1) {
            while (index > 0) {
                newString = newString + olOrUl.close;
                index--;
            }
            newString = newString + olOrUl.close;
        }
        if (i === 0) {
            return olOrUl.open + newString;
        }

        return newString;
    });
};

/**
 * transform function described in the ReactHtmlParser docs
 * @param {Node} node - Node to be transformed
 * @param {Number} index - Index of the Node in relation to the NodeList passed in parser
 * @returns - Valid React Component/JSX. If no specific action is taken to the Node, will automatically pass valid React JSX.
 */
export const transform = (node, index) => {
    //Transforms stardard "h" tags into MUI Headers
    if (node.name && node.name.match(/h\d/)) {
        if (node.parent && node.parent.name === "span") {
            return <p key={index}>{processNodes(node.children, transform)}</p>;
        }
        let tagName = node.name;
        let id = node.attribs.id || "";
        return (
            <Typography key={index} variant={tagName} id={id}>
                {processNodes(node.children, transform)}
            </Typography>
        );
    }

    //Transforms standard html checkboxes into MUI checkbox icons
    if (node.attribs?.type === "checkbox") {
        const checkedBox = node.attribs?.checked === "true";
        const style = { height: "17px", width: "17px", mx: "10px" };

        return (
            <Box sx={{ display: "flex", alignItems: "center", my: -1 }}>
                {checkedBox ? (
                    <CheckBoxOutlinedIcon sx={{ ...style }} />
                ) : (
                    <CheckBoxOutlineBlankOutlinedIcon sx={{ ...style }} />
                )}
                <Typography variant="body1">
                    {processNodes(node.next.children, transform)}
                </Typography>
            </Box>
        );
    }

    //Makes sure that label nodes are removed as they are handled by the above if
    if (node?.name === "label") {
        return null;
    }

    //Transforms blockquotes into MUI Boxes with added styling
    if (node.attribs?.id === "block-q") {
        return (
            <Box
                sx={{
                    borderLeft: "15px solid hsl(13, 75%, 58%)",
                    paddingLeft: "1.5em",
                    pr: 10,
                    margin: "1.2em",
                    backgroundColor: "background.blockq",
                    borderRadius: "5px",
                    maxWidth: "90%",
                }}
            >
                {processNodes(node.children, transform)}
            </Box>
        );
    }
};
