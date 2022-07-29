# Welcome to `.MARKDOWN`!

> #### *What is Markdown?*
> 
> Well I'm glad you asked! Markdown is a simple markup language you can use to quickly and easily make a formatted document all without the help of a word processor.
> 
> In this guide you will learn the basics of Markdown so you'll know how to utilize this editor to make formatted documents of your own!

## The `.MARKDOWN` Guide

##### Table of Contents

-   [Basic Features](#basic)
    -   [Headings](#headings)
    -   [Bold](#bold)
    -   [Italic](#italic)
    -   [Highlight](#highlight)
    -   [Strikethrough](#strikethrough)
    -   [Code](#code)
    -   [Un-ordered List](#un-ordered-list)
    -   [Ordered List](#ordered-list)
    -   [Links](#links)
    -   [Images](#images)
    -   [Blockquote](#blockquote)
    -   [Extra Space](#extra-space)
    -   [Horizontal Rule](#horizontal-rule)
-   [Advanced Features](#advanced-features)
    -   [Heading-ID](#heading-id)
    -   [Fenced Code Block](#fenced-code-block)
    -   [Task List](#task-list)
    -   [Emojis](#emojis)
    -   [Footnotes](#footnotes)
    -   [Subscript](#subscript)
    -   [Superscript](#superscript)
-   [Unavailable/In Progress Features](#unavailable-in-progress-features)
    -   [Tables](#tables)
    -   [Definition List](#definition-list)

### Basic Features

---

#### *Headings*
Simply add one to six `#` sign(s) in front of your heading to make your desired heading size. Like so:

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

#### *Bold*
Add two `**` signs on either side of your word to make it **bold**.

#### *Italic*
Add one `*` sign on either side of your word(s) to make them *italic*.

#### *Highlight*
==Highlight your words== by surrounding them in two `==` signs.

#### *Strikethrough*
~~Strike out your text~~ by adding two `~~` signs around your words.

#### *Code*
Add one `backtick` on either side of words or code to give it special formatting and even write actual code between them!

`<div>Look at me, I'm a div!</div>`

#### *Un-ordered List*

-   Add one `-` sign with a space to create an unordered list.
-   You can make them as long as you like!
-   Add one additional space before the `-` to nest the list item
-   Add another line without the space to go back to the original list.

#### *Ordered List*

1. Add a number followed by a period and a space to make an ordered list.
2. You'll be able to go like this in order as long as you like.
3. Just like with the ordered list you can nest items.
4. Nested items start a new list, so the numbers will be reset to the beginning.
5. Well at least I know how to count...

#### *Links*
Add a link to your text using this format: `[text](link address)`

Check out this cool website I found! It's called [Google](https://google.com).

You can also create links within your own document as well by referencing the assigned ID. Here, take this one back to the [top](#top)!

Check out the [Heading-ID](#heading-id) section to learn more about linking within your document.

#### *Images*
Add an image using this format: `![alt text](image source)`

![sign in with google button](/public/images/google-button.png)

#### *Blockquote*
Want a fancy blockquote section like the one up [top](#top)? Well just add a `>` sign plus a space at the beginning of the line and away you go!

> Doesn't this look so much better? I feel so fancy in here!
> 
> -   Why not put a list inside your blockquote?
> -   Sounds pretty crazy, but it works!
>   -   Always remember to save your changes!
> 
> ![save-button](/public/images/save-button.svg)

#### *Extra Space*
In general, the editor will ignore multiple return lines and won't add any additional spacing within the formatted document.

Look here in the editor!

This will still show up as a one line difference in the formatted document.

If you really want to add more white space in your formatted document, just add a blank line with one `space bar` as the only content.

This will create a new line.

#### *Horizontal Rule*

To add a horizontal rule you just have to add `---` to any line with nothing else.

It's a great way to start or end a section, so let's try it now!

---

### Advanced Features

###### A few more fun add-ons!

---

#### *Heading-ID*
If you want to link to a Heading, like in a [Table of Contents](#table-of-contents), for example; simply make sure the `href` of your link, start with `#` followed by the actual word content of your headings, separated by a `-`, in lower case. This is the ID that is automatically assigned to a heading when it's created.

If I wanted to link to this heading:

##### A Heading I Want To Link To
Here's what my link would look like:

`[A Heading I Want To Link To](#a-heading-i-want-to-link-to)`

Make sure **NOT** to include other punctuation (`!,.` etc.) in your `href`! For example if I wanted to link to:

##### Markdown, it's super fun!
My link would look like this:

`[Markdown, it's super fun!](#markdown-its-super-fun)`

See [Links](#links) for more general details on links.

#### *Fenced Code Block*
If you want to write an entire block of code, instead of just a line like the [code](#code) section above, here's what you do -

-   Start your line with `3 backticks` + the shorthand name of a programming language (ie html, js, bash)
-   The programming language is optional, you can just use the `3 backticks` if you like
-   If no language is included, the program will take it's best guess as to what you're trying to write
-   End with `3 backticks` and return. The resulting code should all be within the formatted block

Here's an example -

```js
const image = (match, str) => {
    const description = /(?<=!\[).*(?=\])/g;
    const src = /(?<=\().+(?=\))/g;

    match.forEach((m) => {
        let dMatch = m.match(description);
        let sMatch = m.match(src);

        str = str.replace(m, `<img src=${sMatch[0]} alt="${dMatch[0]}" />`);
    });

    return str;
};
```

#### *Task List*
Make a list with checkboxes next to them to indicate whether or not the task is complete. It's best use is to show progress during a project, especially one related to coding (like this one!).

To do this start your line off with `- [ ]` for `un-checked` or `- [x]` for `checked`.

- [x] Make a task list
- [x] Make a Markdown guide for the website
- [ ] Get some sleep

#### *Emojis*
That's right! You even get some emojis! :grinning::joy::heart_eyes:

You can add emojis to any of your text by adding the emoji "shortcode" between two `:` signs -

`:emoji: :insert_desired_emoji_here:`

There are thousands of emojis to choose from. Please refer to [Emojipedia](https://emojipedia.org/) for the full list. Once you find your desired emoji, look up the "shortcode" on it's page and you will be able to use it in this app.

#### *Footnotes*
You can add footnotes using the following -

1. Create the footnote superscript like this `[^id]`[^1]
2. Then on another line add the footnote using the same notation but with a `:` at the end followed by some text

[^1]: This is the footnote

Don't worry about where you put #2 in your text, it will always appear on the bottom of your document once it's rendered.

#### *Subscript*
To add a subscript to your text simply wrap a letter, word(s), or numbers in one `~` on either side. Here's an example I'm sure you'll recognize:

H~2~O: A common element found in beer :beer:.

#### *Superscript*
To add superscript to your text, you will wrap a letter, word(s), or numbers in one `^` on either side. Here's an example -

10^1000^: A number I'd bet you'd have difficulty counting to.

---

### Unavailable/In Progress Features

##### A few features available in traditional Markdown are not yet available in the `.MARKDOWN` app (yet).

###### This section will cover these features so you're aware in case you need this functionality. Please check back with us in the future if you are interested!

---

#### *Tables*

Tables can be created by combining a series of `|` (creating column limits) and `-`, creating rows. This can be visualized below -

![markdown-tables](/public/images/md-tables.JPG)

Source: [Markdown Guide - Tables](https://www.markdownguide.org/extended-syntax/#tables)

#### *Definition List*

Definition lists are specially styled lists for (you guessed it!) definitions of words.

You can begin one of these lists by stating the word and then on the next line, starting with a `:` to link the list to the word being defined. This list can have multiple definitions following the main word. Here's a visualization below -

![markdown-definition](/public/images/md-definition.JPG)

Source: [Markdown Guide - Definition Lists](https://www.markdownguide.org/extended-syntax/#definition-lists)

---

#### *Further Reading*

If you're interested in learning more about Markdown and it's capabilities. Please feel free to utilize some of these awesome resources below -

-   [Markdown Guide](https://www.markdownguide.org/) - An amazing resource that helped out quite a bit on this very project. Their cheat sheet was the basis for a lot of the functionality when I was originally building the logic for how this editor compiles text into Markdown.
-   [GitHub](https://github.com) - One of the best places to find examples of Markdown files. Most projects come with a README.md file to describe their project. Surfing around on GitHub can show you some great examples of what's possible with Markdown.
-   [Emojipedia](https://emojipedia.org) - Also mentioned in the [Emojis](#emojis) section above, this resource shows all known emojis and their shortcodes to utilize them with a Markdown editor.
