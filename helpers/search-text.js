import hljs from "highlight.js";
import emojis from "./emojis";
import { listBuilder } from "./funcs";
import DOMPurify from "dompurify";

/**
 *
 * @param {String} str - String of user input
 * @see /components/TextArea - Origin of user input
 * @see /components/Preview - User input passed to this function
 * @returns - String of HTML, passed through DOMPurify as the last step
 * @example - '# This is a heading' => '<h1>This is a heading</h1>
 */
export const searchText = (str) => {
    //String initially passed through RegExps and matched based on standard Markdown criteria
    const openBracketRegex = /.?<.*/g;
    const headingsRegex = /#+\s.+\n?/g;
    const linksRegex = /(?<!!)\[[^\[\)]+\)/g;
    const boldRegex = /\*\*[^*\n]+\*\*/g;
    const italicRegex = /\*[^*\n]+\*/g;
    const codeRegex = /`(?:(?!`)[\s\S])+`\n?/g;
    const imageRegex = /!\[.*\]\(.+\)/g;
    const blockCodeRegex = /```.*(\r?\n|\s)(?:(?!```)[\s\S])+\n```/g;
    const emojiRegex = /:[\w]+:/g;
    const blockQuoteRegex = /(?<=\n)(?:> .*\n)+/g;
    const lineBreakRegex = /\n---\n/g;
    const highRegex = /==(?:(?!==)[\s\S])+==/g;
    const strikeRegex = /~~[^~]+~~/g;
    const subRegex = /(?<!~)~[^~]+~(?!~)/g;
    const uoRegex = /(?<=\n)(?:\s*- .+\n{0,2})+/g;
    const olRegex = /(?<=\n)(?:\s*\d\. .+\n)+/g;
    const checkListRegex = /-\s\[(\s|x)\]\s.+\n/g;
    const footRegex = /\[\^.\](?!:)/g;
    const footTextRegex = /\[\^.\]: .+\n/g;
    const superRegex = /\^.+\^/g;

    //When text matches, it's passed on to the appropriate helper functions(s) below
    const hasOpenBracket = str.match(openBracketRegex);
    hasOpenBracket && (str = openBrackets(hasOpenBracket, str));

    const hasBlockCode = str.match(blockCodeRegex);
    hasBlockCode && (str = blockCode(hasBlockCode, str));

    const hasCode = str.match(codeRegex);
    hasCode && (str = code(hasCode, str));

    const hasHeadings = str.match(headingsRegex);
    hasHeadings && (str = headings(hasHeadings, str));

    const hasLinks = str.match(linksRegex);
    hasLinks && (str = links(hasLinks, str));

    const hasBold = str.match(boldRegex);
    hasBold && (str = bold(hasBold, str));

    const hasItalic = str.match(italicRegex);
    hasItalic && (str = italic(hasItalic, str));

    const hasImage = str.match(imageRegex);
    hasImage && (str = image(hasImage, str));

    const hasEmoji = str.match(emojiRegex);
    hasEmoji && (str = emoji(hasEmoji, str));

    const hasBlockQuote = str.match(blockQuoteRegex);
    hasBlockQuote && (str = blockQuote(hasBlockQuote, str));

    const hasLineBreak = str.match(lineBreakRegex);
    hasLineBreak && (str = lineBreak(hasLineBreak, str));

    const hasHighLight = str.match(highRegex);
    hasHighLight && (str = highLight(hasHighLight, str));

    const hasStrikeThru = str.match(strikeRegex);
    hasStrikeThru && (str = strikeThru(hasStrikeThru, str));

    const hasSubtext = str.match(subRegex);
    hasSubtext && (str = subText(hasSubtext, str));

    const hasUOList = str.match(uoRegex);
    hasUOList && (str = uoList(hasUOList, str));

    const hasOList = str.match(olRegex);
    hasOList && (str = oList(hasOList, str));

    const hasCheckList = str.match(checkListRegex);
    hasCheckList && (str = checkList(hasCheckList, str));

    const hasFootNote = str.match(footRegex);
    hasFootNote && (str = footNote(hasFootNote, str));

    const hasFootText = str.match(footTextRegex);
    hasFootText && (str += "<br><br><hr><br>");
    hasFootText && (str = footNote(hasFootText, str));

    const hasSuperScript = str.match(superRegex);
    hasSuperScript && (str = superScript(hasSuperScript, str));

    /**
     * During the process of several helper functions, certain characters are transformed
     * so they will not pass through another match function. Here they are transformed back so they
     * will show up correctly on the DOM.
     *
     * Example -
     * 'I'm going to write a ~ in code like this: `~`, cool huh?'
     *
     * Everything in between the two ~ could be matched by the subscript regex, but it wasn't my intent
     * to make it subscript. The ~ between the two backticks is instead turned to an HTML code and changed back here.
     */
    str = str.replace(/\t/g, "&nbsp;");
    str = str.replace(/\n{3,}/g, "</br></br>");
    str = str.replace(/\n\n/g, "</br></br>");
    str = str.replace(/(\n|\\\n)/g, "</br>");
    str = str.replace(/(<\/?br>){2,}/g, "</br></br>");
    str = str.replace(/(&#35;)/g, "#");
    str = str.replace(/(&#61;)/g, "=");
    str = str.replace(/(&#42;)/g, "*");
    str = str.replace(/(&#126;)/g, "~");
    str = str.replace(/(&#40;)/g, "(");
    str = str.replace(/(&#91;)/g, "[");

    //DOMPurify removes any bad HTML/Javascript if it somehow gets through
    //Examples - Javascript alerts, iFrames, etc.
    return DOMPurify.sanitize(str, { ADD_ATTR: ["target"] });
};

// Changes all opening brackets (<) into their HTML character code
// Helps sanitize but also helps correctly format as no HTML would actually be
// added by this point.
// Ignores situations where they are code lines or code blocks as they are handled later
const openBrackets = (match, str) => {
    const quoteTest = /`<.*>`/g;
    const blockCodeTest = /```js\n(?:(?!```)[\s\S])+\n```/g;
    const obMatch = /</g;

    match.forEach((m) => {
        let qMatch = m.match(quoteTest);
        let bcMatch = m.match(blockCodeTest);

        if (!qMatch && !bcMatch) {
            let obTest = m.match(obMatch);
            str = str.replace(obTest[0], `&lt;`);
            return;
        }
    });

    return str;
};

const headings = (match, str) => {
    const h1 = /(?<=#\s)[^{}\n]+/g;
    const h2 = /(?<=##\s)[^{}\n]+/g;
    const h3 = /(?<=###\s)[^{}\n]+/g;
    const h4 = /(?<=####\s)[^{}\n]+/g;
    const h5 = /(?<=#####\s)[^{}\n]+/g;
    const h6 = /(?<=######\s)[^{}\n]+/g;
    const headArray = [h1, h2, h3, h4, h5, h6];
    const idRegex = /[\w]+/g

    match.forEach((m) => {
        const index = m.match(h6)
            ? 5
            : m.match(h5)
            ? 4
            : m.match(h4)
            ? 3
            : m.match(h3)
            ? 2
            : m.match(h2)
            ? 1
            : m.match(h1)
            ? 0
            : 5;
        
        const innerText = m.match(headArray[index])[0]
        const id = innerText.match(idRegex).join('-').toLowerCase()

        str = str.replace(
            m,
            `<h${index + 1} id="${id}">${
                innerText
            }</h${index + 1}>\n`
        );
    });

    return str;
};

const links = (match, str) => {
    const description = /(?<=\[).+(?=\])/g;
    const href = /(?<=\().+(?=\))/g;
    const external = /https?:/g;

    match.forEach((m) => {
        let trueLinkTest = /\[.+\]\(.+\)/;

        if (!trueLinkTest.test(m)) {
            return;
        }

        let dMatch = m.match(description);
        let hMatch = m.match(href);
        let externalTest = external.test(m) ? "_blank" : "";

        str = str.replace(
            m,
            `<a href=${hMatch[0]} target=${externalTest}>${dMatch}</a>`
        );
    });

    return str;
};

const bold = (match, str) => {
    const boldText = /(?<=\*\*)[^*]+(?=\*\*)/g;

    match.forEach((m) => {
        let bMatch = m.match(boldText);

        str = str.replace(m, `<b>${bMatch[0]}</b>`);
    });

    return str;
};

const italic = (match, str) => {
    const italicText = /(?<=\*)[^*]+(?=\*)/g;

    match.forEach((m) => {
        let iMatch = m.match(italicText);

        str = str.replace(m, `<i>${iMatch[0]}</i>`);
    });

    return str;
};

const code = (match, str) => {
    const codeRegex = /(?<=`).+(?=`)/g;
    const returnRegex = /\n/;

    match.forEach((m) => {
        let cMatch = m.match(codeRegex);
        let rMatch = returnRegex.test(m) ? "\n\n" : "";
        if (!cMatch) {
            return;
        }

        cMatch[0] = cMatch[0].replace(/(&lt;|<)/g, "<span><</span>");
        cMatch[0] = cMatch[0].replace(/\*/g, "&#42;");
        cMatch[0] = cMatch[0].replace(/=/g, "&#61;");
        cMatch[0] = cMatch[0].replace(/~/g, "&#126;");
        cMatch[0] = cMatch[0].replace(/\[/g, "&#91;");
        cMatch[0] = cMatch[0].replace(/\(/g, "&#40;");
        str = str.replace(
            m,
            `<code id="code_styled">${cMatch[0]}</code>${rMatch}`
        );
    });

    return str;
};

const image = (match, str) => {
    const description = /(?<=!\[).*(?=\])/g;
    const src = /(?<=\().+(?=\))/g;

    match.forEach((m) => {
        let dMatch = m.match(description);
        let sMatch = m.match(src);
        sMatch[0].startsWith('/public') && (sMatch[0] = sMatch[0].replace(/\/public/, ""))

        str = str.replace(
            m,
            `<img src=${sMatch[0]} alt="${dMatch[0]}" style="max-width:100%"/>`
        );
    });

    return str;
};

//Block code sections are ran through HighlightJS to assist in auto-formatting
//based on the code type
const blockCode = (match, str) => {
    const innerCode = /(?<=```.*(\r\n|\s))(.+\s*|\n)+\n?(?=```)/gm;
    const codeType = /(?<=```).*(?=\n)/;
    const headings = /#+/g;
    const equals = /=+/g;

    match.forEach((m) => {
        let codeMatch = m.match(codeType) || "";
        let bcMatch = m.match(innerCode);
        let hMatch = m.match(headings);
        let eMatch = m.match(equals);
        if (!bcMatch) {
            return;
        }
        bcMatch[0] = bcMatch[0].replace(/&lt;/g, "<");

        let hl = hljs.highlightAuto(`${bcMatch[0]}`, [
            `${codeMatch[0]}`,
            "html",
            "javascript",
        ]).value;

        hl.startsWith("\n") && (hl = hl.trimStart());
        hl = hl.replace(/`/g, "&#96;");
        hl = hl.replace(/\^/g, "&#94;")
        hMatch ? (hl = hl.replace(/#/g, `&#35;`)) : null;
        eMatch ? (hl = hl.replace(/=/g, "&#61;")) : null;

        str = str.replace(
            m,
            `<br><blockquote id='code-holder'><pre id='code-holder' wrap='true'><code class='code-block'>${hl}</code></pre></blockquote>`
        );
    });

    return str;
};

const emoji = (match, str) => {
    match.forEach((m) => {
        let emojiMatch = emojis.find((el) => el.shortname === m);

        if (!emojiMatch) {
            return;
        }

        str = str.replace(m, `<span>${emojiMatch.emoji}</span>`);
    });

    return str;
};

const blockQuote = (match, str) => {
    const bq = /(?<=>\s)(?:(?!>).*\n)+/g;

    match.forEach((m) => {
        let bqMatch = m.match(bq).join("");

        str = str.replace(
            m,
            `<blockquote id='block-q'>\n${bqMatch}\n</blockquote>`
        );
    });

    return str;
};

const lineBreak = (match, str) => {
    match.forEach((m) => {
        str = str.replace(m, "</br><hr></br>");
    });

    return str;
};

const highLight = (match, str) => {
    const highL = /(?<===)[\s\S]+(?===)/;

    match.forEach((m) => {
        let highLMatch = m.match(highL);

        str = str.replace(m, `<mark>${highLMatch[0]}</mark>`);
    });

    return str;
};

const strikeThru = (match, str) => {
    const strike = /(?<=~~)[^~]+(?=~~)/;

    match.forEach((m) => {
        let strikeMatch = m.match(strike);

        str = str.replace(m, `<strike>${strikeMatch[0]}</strike>`);
    });

    return str;
};

const subText = (match, str) => {
    const sub = /(?<=~)[^~]+(?=~)/;

    match.forEach((m) => {
        let subMatch = m.match(sub);

        str = str.replace(m, `<sub>${subMatch[0]}</sub>`);
    });

    return str;
};

const uoList = (match, str) => {
    match.forEach((m) => {
        if (m.includes("- [")) {
            return;
        }
        let listSection = m.split(/\n/).filter((el) => el.length > 0);
        let result = listBuilder(listSection, false);

        str = str.replace(m, result.join(""));
    });

    return str;
};

const oList = (match, str) => {
    match.forEach((m) => {
        let listSection = m.split(/\n/).filter((el) => el.length > 0);

        let result = listBuilder(listSection, true);

        str = str.replace(m, result.join(""));
    });

    return str;
};

const checkList = (match, str) => {
    const checkbox = /(?<=\[)x(?=\])/;
    const label = /(?<=-\s\[.\]\s).+/;

    match.forEach((m) => {
        let checked = checkbox.test(m);
        let labelText = m.match(label);

        str = str.replace(
            m,
            `<div class='checkbox' ${
                checked ? `checked=true` : `checked=false`
            }>${labelText}</div>`
        );
    });

    return str;
};

const footNote = (match, str) => {
    const note = /(?<=\[\^).(?=\]:)/;
    const link = /(?<=\[\^).(?=\](?!:))/;
    const text = /(?<=\[\^.\]: ).+/;

    match.forEach((m) => {
        let noteMatch = m.match(note);
        let linkMatch = m.match(link);
        let textMatch = m.match(text);

        if (linkMatch) {
            str = str.replace(
                m,
                `<sup><a id='note${linkMatch[0]}' href='#footnote-${linkMatch[0]}'>${linkMatch[0]}</a></sup>`
            );
            return;
        } else if (textMatch) {
            str = str.replace(m, "");
            str += `<p id='footnote-${noteMatch[0]}'>${noteMatch[0]}. ${textMatch[0]} <a class='foot-back' href='#note${noteMatch[0]}'>&#128281;</a></p>`;
        }
    });

    return str;
};

const superScript = (match, str) => {
    const innerText = /(?<=\^).+(?=\^)/;

    match.forEach((m) => {
        let textMatch = m.match(innerText);

        str = str.replace(m, `<sup>${textMatch[0]}</sup>`);
    });

    return str;
};

export default searchText;
