import { processNodes } from "react-html-parser";
import Typography from '@mui/material/Typography'

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
};