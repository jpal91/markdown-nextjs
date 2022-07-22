import React from 'react'
import Image from 'next/image';
import { processNodes, convertNodeToElement } from "react-html-parser";
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';


export const listBuilder = (matches, ordered) => {
  const olOrUl = ordered
    ? { open: "<ol>", close: "</ol>" }
    : { open: "<ul>", close: "</ul>" };

  let index = 0;

  return matches.map((l, i) => {
    let item = /(?<=(-|\d\.)\s).+/;
    let targetItem = l.match(item);
    let currIndex = ordered ? l.indexOf(l.match(/\d/)[0]) : l.indexOf("-");
    let lastIndex =
      i > 0 && ordered
        ? matches[i - 1].indexOf(matches[i - 1].match(/\d/)[0])
        : i > 0 && !ordered
        ? matches[i - 1].indexOf("-")
        : 0;
    let newItem = "";
    newItem += `<li>` + targetItem[0] + "</li>";

    currIndex < lastIndex
      ? index--
      : currIndex > lastIndex
      ? index++
      : currIndex === lastIndex
      ? (index = index)
      : (index = index);

    let newString =
      currIndex < lastIndex
        ? olOrUl.close + newItem
        : currIndex > lastIndex
        ? olOrUl.open + newItem
        : currIndex === lastIndex
        ? newItem
        : null;

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


export const transform = (node, index) => {
  if (node.name && node.name.match(/h\d/)) {
      if (node.parent && node.parent.name === 'span') {
          return (
              <p key={index}>
                  {processNodes(node.children, transform)}
              </p>
          )
      }
      let tagName = node.name;
      let id = node.attribs.id || ''
      return (
          <Typography key={index} variant={tagName} id={id}>
              {processNodes(node.children, transform)}
          </Typography>
      );
  }

  if (node.attribs?.type === 'checkbox') {
    const checkedBox = node.attribs?.checked === 'true'
    const style = { height: '17px', width: '17px', mx: '10px'}

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', my: -1 }}>
        {checkedBox ? <CheckBoxOutlinedIcon sx={{ ...style }}/> : <CheckBoxOutlineBlankOutlinedIcon sx={{ ...style }} />}
        <Typography variant='body1'>
          {processNodes(node.next.children, transform)}
        </Typography>
      </Box>
    )
  }

  if (node?.name === 'label') {
    return null
  }

  if (node.attribs?.id === 'block-q') {
    return (
      <Box sx={{ borderLeft: '15px solid hsl(13, 75%, 58%)', paddingLeft: '1.5em', pr: 10, margin: '1.2em', backgroundColor: 'background.blockq', borderRadius: '5px', width: 'fit-content', maxWidth: '90%'}}>
        {processNodes(node.children, transform)}
      </Box>
    )
  }
};