# `.MARKDOWN`

##### A Markdown Editor built with Next.js/Redux/RegExp/MongoDB

This is a solution to the [In-browser markdown editor challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9). Without the use of a third party package to render Markdown.
 

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
        -   [RegExp](#regexp)
        -   [NextAuth](#nextauth)
        -   [Cypress](#cypress)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Based on the original challenge users should be able to:

-   [x] Create, Read, Update, and Delete markdown documents
-   [x] Name and save documents to be accessed as needed
-   [x] Edit the markdown of a document and see the formatted preview of the content
-   [x] View a full-page preview of the formatted content
-   [x] View the optimal layout for the app depending on their device's screen size
-   [x] See hover states for all interactive elements on the page
-   [x] **Bonus**: If you're building a purely front-end project, use localStorage to save the current state in the browser that persists when the browser is refreshed
-   [x] **Bonus**: Build this project as a full-stack application

Additional features added not in the original challenge:

-   [x] Custom RegExp function to create Markdown
-   [x] Optional/toggleable scroll-sync between the editor and preview windows
-   [x] Scroll-to-top button added at the bottom of the preview window
-   [x] Download the file as .md from the menu
-   [x] Login using Google/GitHub OAuth
-   [x] Alert notifications throughout the app


### Screenshot

![screenshot](/public/images/screenshot.png)

### Links
-   Solution URL: [GitHub Solution](https://github.com/jpal91/markdown-nextjs)
-   Live Site URL: [Add live site URL here](https://your-live-site-url.com)


## My process

### Built with
-   Regular Expressions - For Markdown editor logic. See [search-text.js](https://github.com/jpal91/markdown-nextjs/blob/main/helpers/search-text.js) for details.
-   [Next.js](https://nextjs.org/) - React framework
-   [Material UI](https://styled-components.com/) - For styles/CSS
-   [MongoDB](https://mongodb.com) - Database for user data and authentication
-   [React-Redux](https://react-redux.js.org/) - For state management
-   [ReactHtmlParser](https://github.com/peternewnham/react-html-parser#readme) - To parse converted HTML (post-RegExp conversion) to React Components
-   [NextAuth](https://next-auth.js.org/) - Authentication package for Next.js
-   [ScrollSync](https://react-sync-scroll.netlify.app/) - Scroll syncing functionality for React apps
-   [Notistack](https://notistack.com/) - For notifications/alerts
-   [Cypress](https://docs.cypress.io/) - E2E testing suite


### What I learned
This project heavily expanded my knowledge with just about every resource I utilized. Here are a few to note -

###### RegExp
This was definitely the most challenge portion of this application. There are a few very well-built and maintained packages available for the conversion of text to Markdown, but I decided early on I wanted to try and build this by myself as a challenge.

Here is one example from my `searchText()` function which takes regular text and uses RegExp to convert to HTML/Markdown -

```js
const image = (match, str) => {
    const description = /(?<=!\[).*(?=\])/g;
    const src = /(?<=\().+(?=\))/g;

    match.forEach((m) => {
        let dMatch = m.match(description);
        let sMatch = m.match(src);

        str = str.replace(
            m,
            `<img src=${sMatch[0]} alt="${dMatch[0]}" style="max-width:100%"/>`
        );
    });

    return str;
};
```

This function takes a match of `[text](href)` and finds the alt-description from within the `square brackets` and the href from the `round brackets` and returns a string of an `img` html tag which is converted into a React component via `ReactHtmlParser`.

Please feel free to check out my [searchText function on GitHub](https://github.com/jpal91/markdown-nextjs/blob/main/helpers/search-text.js) for many more examples.
 

###### NextAuth
I had used NextAuth previously in a tutorial I watched, but not quite this extensively. Originally, I had functionality for a normal username/password credentials style login, but unfortunately NextAuth doesn't make it easy to have both this an OAuth on the same app.

Ultimately, I decided to just stick with OAuth and all things considered, NextAuth does make this very easy to add to an application along with Database validation via an adapter (MongoDB in this case).

Here's a snippet from my [/pages/auth/api page](https://github.com/jpal91/markdown-nextjs/blob/main/pages/api/auth/%5B...nextauth%5D.js):

```js
export default NextAuth({
    ...,
	providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
				...
})
```

###### Cypress
This was my first time adding testing to an application and I went with Cypress. I do not have a great amount of knowledge on testing providers in general, but they seemed to provide an easy to use interface and functionality I wanted.

I felt like testing was a little more necessary on this project than in others. There are many components, levels of state, and functionalities that can easily be broken with changing one bit of code here or there. Cypress took some time to get used to, but ultimately was very helpful in finding a few bugs I wasn't aware of.

Here's a snippet of the code used to test the functionality of my save button -

```js
it("Saves new content", () => {
    cy.get("#save-btn").click();
    cy.contains("span", "Document saved!").should("be.visible");
    cy.contains("a", ".MARK").click();
    cy.url().should("eq", Cypress.config().baseUrl);
    cy.visit(Cypress.config().baseUrl + "/local/Hi");
    cy.get("#preview").contains("h1", "Heading");
});
```

### Continued Development

###### .MARKDOWN Project
For this project I plan on continuing to expand the functionality and simplifying the code more. Things I will focus on in future updates:

-   Autosave
-   Adding better CSS styling - Right now the CSS styling is split between actual CSS pages and MUI Components. I want to consolidate this a little more and improve the reusability of the MUI components
-   Improve the Markdown RegExp logic - Right now it works but there's always room for improvement

###### Future Projects
For future projects, I want to take a lot of what I learned and apply it to more projects, specifically:

-   `NextAuth` - It was surprisingly easier than I thought to add in OAuth options to my project. Adding in authentication is a great way to improve usability/functionality and I want to utilize this more
-   `Cypress` - Learning how to test my apps in an effective manner is something that I have lacked in my entire learning process. I want to start adding testing to all of my future applications to make sure the functionality remains intact after changes, and of course to spot bugs.


### Useful resources
-   [RegExr](https://regexr.com/) - A **huge** resource for this project. Helped me test and refine just about every one of my RegExp matching functions and has a decent RegExp guide built in.
-   [Markdown Guide](https://www.markdownguide.org/) - My go-to for learning all about Markdown and what Markdown Editors should do. Used this as the educational resource when designing my RegExp matching functions.
-   [GitHub](https://github.com) - Was used as a large source of Markdown files that I could use to test functionality of the app.


###### Internal Resources
In this project I made 2 user guides to help out on this site:

1. [Intro.md](/guides/Intro) - Goes over the basics of Markdown and shows what this editor is capable of
2. [How-To.md](/guides/How-To) - Goes over the functionality of the site, and gives users a guide how to do the basic CRUD actions


## Author

-   Website - Working on it...
-   Frontend Mentor - [@jpal91](https://www.frontendmentor.io/profile/jpal91)
-   GitHub- [https://github.com/jpal91/](https://github.com/jpal91/)


## Acknowledgments

-   [StackEdit](https://stackedit.io/) - This site was a big source of inspiration for my project. Very well-built and mature project that has all the functionality one would expect from a Markdown editor. I tried to emulate some of the features that they had for my site to make it more user friendly.
-   [Markdown-it](https://github.com/markdown-it/markdown-it) - Popular Markdown parser. If I didn't build out the logic myself, I ultimately would have used this package to render the text to Markdown. I referenced it a few times throughout the project to see what they were doing in "x" or "y" situation to make it work. This package works differently than my logic, but it was still a great resource regardless.
