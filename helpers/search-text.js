import hljs from "highlight.js";
import emojis from "./emojis";
import { listBuilder } from "./funcs";
import DOMPurify from "dompurify";

export const searchText = (str) => {
    const openBracketRegex = /.?<.*/g;
    // const bracketRegex = /`<.+>.*<\/.+>`/g;
    const headingsRegex = /#+\s.+\n?/g;
    // const linksRegex = /\[.+\]\(.+\)/g;
    const linksRegex = /\[[^\[\)]+\)/g;
    // const boldRegex = /(?<!(\*|\S))\*\*[^*\n]+\*\*(?!\*)/g;
    const boldRegex = /\*\*[^*\n]+\*\*/g;
    // const italicRegex = /(?<!(\*|\S))\*[^*\n]+\*(?!\*)/g;
    const italicRegex = /\*[^*\n]+\*/g;
    // const codeRegex = /`.+`/g;
    const codeRegex = /`[^`\n]+`\n?/g;
    const imageRegex = /!\[.*\]\(.+\)/g;
    const blockCodeRegex = /```.*(\r?\n|\s)(?:(?!```)[\s\S])+\n```/g; ///```.*\s(?:(?!```)[\s\S])+\n```/g
    const emojiRegex = /:[\w]+:/g;
    const blockQuoteRegex = /(?<=\n)(?:> .+\n)+/g;
    const lineBreakRegex = /\n---\n/g;
    // const highRegex = /==[^=]+==/g;
    const highRegex = /==(?:(?!==)[\s\S])+==/g;
    const strikeRegex = /~~[^~]+~~/g;
    const subRegex = /(?<!~)~[^~]+~(?!~)/g;
    // const uoRegex = /(?<=\n)((?:>\s)?\s*-\s(?!\[|]).+\n)+/g;
    const uoRegex = /(?<=\n)(?:- .+\n{0,2})+/g // FIXME: THis
    const olRegex = /(?<=\n)((?:>\s)?\s*\d\.\s.+\n>?)+/g;
    const checkListRegex = /-\s\[(\s|x)\]\s.+\n/g;
    const footRegex = /\[\^.\]:?(.+)?/g;
    const superRegex = /\^.+\^/g;

    const hasOpenBracket = str.match(openBracketRegex);
    hasOpenBracket && (str = openBrackets(hasOpenBracket, str));

    const hasBlockCode = str.match(blockCodeRegex);
    hasBlockCode && (str = blockCode(hasBlockCode, str));

    // const hasBracket = str.match(bracketRegex);
    // hasBracket && (str = bracket(hasBracket, str));

    const hasHeadings = str.match(headingsRegex);
    hasHeadings && (str = headings(hasHeadings, str));

    const hasLinks = str.match(linksRegex);
    hasLinks && (str = links(hasLinks, str));

    const hasBold = str.match(boldRegex);
    hasBold && (str = bold(hasBold, str));

    const hasItalic = str.match(italicRegex);
    hasItalic && (str = italic(hasItalic, str));

    const hasCode = str.match(codeRegex);
    hasCode && (str = code(hasCode, str));

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

    const hasSuperScript = str.match(superRegex);
    hasSuperScript && (str = superScript(hasSuperScript, str));

    str = str.replace(/\t/g, "&nbsp;"); //&nbsp;&nbsp;&nbsp;
    str = str.replace(/\n{3,}/g, "</br></br>");
    str = str.replace(/\n\n/g, "</br></br>");
    str = str.replace(/(\n|\\\n)/g, "</br>");
    str = str.replace(/(<\/?br>){2,}/g, "</br></br>");
    str = str.replace(/(&#35;)/g, "#");
    str = str.replace(/(&#61;)/g, "=");

    return DOMPurify.sanitize(str, { ADD_ATTR: ['target'] });
};

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

const bracket = (match, str) => {
    const codeMatch = /(?<=`)<.+>.*<\/.+>(?=`)/g;

    match.forEach((m) => {
        let cMatch = m.match(codeMatch);
        let hl = hljs.highlightAuto(`${cMatch[0]}`, ["html"]).value;
        str = str.replace(m, `<blockquote><pre>${hl}</pre></blockquote>`);
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
    const id = /(?<={).+(?=})/;

    match.forEach((m) => {
        const idMatch = m.match(id);

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

        str = str.replace(
            m,
            `<h${index + 1}${idMatch ? `id=${idMatch[0]}` : ""}>${
                m.match(headArray[index])[0]
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
        let rMatch = returnRegex.test(m) ? "\n\n" : "" ////<br><br>

        cMatch[0] = cMatch[0].replace(/(&lt;|<)/g, "<span><</span>");
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

        str = str.replace(m, `<img src=${sMatch[0]} alt=${dMatch[0] || ""} />`);
    });

    return str;
};

const blockCode = (match, str) => {
    const innerCode = /(?<=```.*(\r\n|\s))(.+\s*)+\n?(?=```)/gm;
    const codeType = /(?<=```).*(?=\n)/;
    const headings = /#+/g;
    const equals = /=+/g

    match.forEach((m) => {
        let codeMatch = m.match(codeType) || "";
        let bcMatch = m.match(innerCode);
        let hMatch = m.match(headings);
        let eMatch = m.match(equals)
        if (!bcMatch) {
            return;
        }
        bcMatch[0] = bcMatch[0].replace(/&lt;/g, "<");

        let hl = hljs.highlightAuto(`${bcMatch[0]}`, [
            `${codeMatch[0]}`,
            "html",
            "javascript",
        ]).value;

        hMatch ? (hl = hl.replace(/#/g, `&#35;`)) : null;
        eMatch ? (hl = hl.replace(/=/g, '&#61;')) : null

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
    const bq = /(?<=>\s)(?:(?!>).+\n)+/g;

    match.forEach((m) => {
        let bqMatch = m.match(bq).join("");

        str = str.replace(
            m,
            `<blockquote id='block-q'>\n${bqMatch}\n</blockquote>`
        );
    });
    //style="border-left:5px solid gray;padding-left:1.5em;margin:1.2em;"
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
    // console.log(match)
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
        // let listSection = m.split(/(\s*-\s.+\n?)/).filter((el) => el.length > 0);
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
            `<input type='checkbox' id=${labelText} name=${labelText} disabled ${
                checked ? `checked` : ``
            } style="margin: 0px 10px;"/><label for=${labelText}>${labelText}</label>\n`
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
            str += `<br><hr><br><p id='footnote-${noteMatch[0]}'>${noteMatch[0]}. ${textMatch[0]} <a href='#note${noteMatch[0]}'>&#128281;</a></p>`;
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
