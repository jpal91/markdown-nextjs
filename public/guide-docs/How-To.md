# `.MARKDOWN` - How To Guide

> ##### *What's this?*
> In this guide you will learn how to utilize the features of this editor so you can start creating beautiful documents in no time!

---

## Table of Contents

- [Accounts](#accounts)
 - [General Info](#general)
 - [Login](#login)
- [Basic Actions](#basic)
 - [Create A New Document](#create)
 - [Save An Existing Document](#save)
  - [The Save Button](#save)
  - [Local vs. Database](#localvdb)
  - [Database Limits](#dblimits)
  - [Warning!](#warning)
 - [Re-name Your Document](#rename)
 - [Delete a document](#delete)
 - [Mobile Differences](#mobile)
- [Site Features](#site-features)
 - [Scroll Lock](#scroll-lock)
 - [Preview Mode](#preview-mode)
 - [Scroll To Top](#scroll-top)
 - [Day/Night Mode](#day-night)
 - [Download](#download)
 - [Notifications](#notifications)

---

## Accounts {#accounts}
###### How to set up accounts and why/if it matters

#### *General Info* {#general}

`.MARKDOWN` is a free to use application without restriction on how many documents you create or general usage. However, there will be restrictions on *where* your document saves based on the following:

1. If you have an account/are logged in to the application
2. Your total number of database saves
 

###### Registered Account
The registration process is quick and painless with us. You simply have to click the login button (you don't have to fill out any extra info) and log in with either your Google or GitHub account clicking one of these buttons below:

[*See the login section for more info on how to find these*](#login)

![google login](/images/google-button.png)
![github login](/images/github-button.png)

After clicking on one of these links, you will be redirected to the associated site and asked to give us permission to access your account. We only receive your user name and/or email address and use this to associate your account in our database. Your information is never sent/sold to any third parties and will only be used internally. 
 

###### Database Saves
Once you are logged in, you are given the additional ability to save documents both locally and on our MongoDB database. 

Every logged in user is given **a total of 10** saves in our database. After you have reached your quota, you must save all other files locally, or delete one of the documents saved to the database in order to save another. 

For more information, please check out the following sections:
- [Local vs. Database](#localvdb)
- [Save An Existing Document](#save)
- [Delete A Document](#delete)


#### *Login* {#login}
To login and/or sign-up, simply go to the menu bar located at the top left corner of your screen:

![menu](/images/menu.png)

Once there, click the `LOGIN` button you see near the bottom of the screen:

![login](/images/login-ss.png)

A modal will pop up in the middle of your screen, which will prompt you to select the login provider of your choice:

![login providers](/images/provider-ss.PNG)

Follow the prompt of your chosen provider and you will be redirected back to our site where you will officially be logged in!

---

## Basic Actions {#basic}
###### The CRUD[^1] of it
[^1]: An acronym for Create, Read, Update, Destroy

#### *Create A New Document* {#create}
There are three methods to create a new document:
 

###### *First Method - The New Document Button*
On any screen, click the Menu Bar icon in the top left of your screen:

![menu](/images/menu.png)

Then you will click the `New Document` button near the top of the menu:

![new document](/images/new-document.svg)

After you will be prompted to create a document name and select where the document will be saved to (either locally or on the database):

![new document modal](/images/newdoc-modal.PNG)

*For more information on saving locally vs. on the database, see [Local vs. Database](#localvdb).*
 

###### *Second Method - Rename Your Document From The Home Screen*
This method is only available from the home screen (`welcome.md` will always be the document name on the home screen).

Click right below `Document Name` and a text prompt will pop up. Type in the desired name of your document, and you will be re-directed to your new document's page!

![rename](/images/rename.png)

*For more information on re-naming your document, see [Re-name Your Document](#rename)*

 

###### *Third Method - Save Your Document From The Home Screen*
This method is only available from the home screen when you click the `Save Changes` button in the top right side of your screen.

![save](/images/save-button.svg)

Once clicked, you will be prompted with the same modal as when you click on the `New Document` button within the menu. Simply name your document, select the save type, and you will be re-directed to your new document's page!

*See next section for details on how to save*

 

#### *Save An Existing Document* {#save}

##### The Save Button {#save}
When you are in a user-owned[^2] document, a button will appear on the top right side of your screen:
[^2]: A document that was created and saved by you, the user. This does not include pages in the `Examples` or `Guides` folders, so you will not see the `Save Changes` button on any of those files

![save](/images/save-button.svg)

Simply click this button and your changes will immediately be saved based on **the initial save type**. If you originally saved your document locally, it will automatically save locally and vice-versa for database.
 

##### Local vs. Database {#localvdb}
When you first create a document, you are prompted to select either `Local` or `Database` as your save choice. 

![new document modal](/images/newdoc-modal.PNG)

If you are a logged in user, both options will be available. The `Database` choice will be disabled until you've logged in. Once the document is created, every time you save, the document will save to the original choice you selected when creating the document. 

> ##### Where does the data go?
> If saved locally, your data will be stored on your computer within the `Local Storage` component of your browser. Because of this, the data can only be accessed from the computer/browser that your originally wrote your document with.
> 
> If saved to `Database`, however, your file is saved to our database[^3] and can be accessed anywhere after you login. The Markdown data is stored as plain text, so it's not recommended that you included any sensitive information within the document.
[^3]: Our database is a MongoDB cluster accessed through sever-side REST protocols 


###### Database Limits {#dblimits}
As a logged in user, you have the ability to save a **maximum of 10 documents** to the database. After which you will only be able to save your data locally. To save a new document to the database, you must first delete another document already saved to the database first, then save your new document after.
 

##### Warning! {#warning}
Several warning messages are built into the app to advise you when saving a document is not possible. These messages will let you know what/if there is an issue, and what to do in order to get around it. Please keep the following in mind when using `.MARKDOWN`:

1. Logged in users will have a maximum of 10 saved files per login. 
2. Please be aware that when you navigate to another screen, you're unsaved work will not save automatically. Please remember to save often!
3. Any files saved locally will remain on your computer unless you purposesfully delete/refresh your browsers local data and/or cache. Remember to download files if you want to keep them, or login as a user to save them to the database.
 

#### *Re-name an Existing Document* {#rename}
To re-name your document after you've already created it, you will navigate to the document itself using the menu button on the top left side of the screen:

![menu](/images/menu.png)

Click on the `My Files` tab to see a full list of documents you've saved both locally and on the database (if you're a logged in user):

![my-files](/images/myfiles.png)

Finally, click your document's name under the `Document Name` section at the top of the screen and input a new file name of your choice. Once done, click anywhere else on the screen and the app will automatically save your file with it's new name:

![re-name](/images/rename.png)
 

#### *Delete a Document* {#delete}
In the top right side of your screen you will see a trash can icon located next to the `Save Changes` button. Simply click this icon when you are on a page of one of your saved documents:

![delete-button](/images/delete-button.png)

Once clicked you will be prompted to confirm the action. *You cannot reverse the delete after you have selected the option*. **Please use caution**.
 

#### *Mobile Differences* {#mobile}
If you are accessing `.MARKDOWN` on mobile, there will be a few key differences to preserve screen space:

![mobile-home](/images/mobile-home.png)

On the home screen, the [Scroll Lock](#scroll-lock) and [Preview Mode](#preview-mode) buttons are moved to the top info bar and you'll only see either the Markdown editor or the Preview section, not both. 

![mobile-sidenav](/images/mobile-sidenav.png)

The [Re-name](#rename) function as well as the [Save](#save) and [Delete](#delete) functions have been moved to the Menu. `Re-name` is shown in a yellow square at the top of the screenshot. The `Save` and `Delete` functions are below in a blue square (trashcan icon for delete, floppy disk for save).

---

## Site Features {#site-features}

#### *Scroll Lock* {#scroll-lock}
On the top right corner of the `Preview` section (right side of your screen), you will see two buttons:

![scroll-prev-btns](/images/scroll-prev-btns.png)

In the green (button the left) is the Scroll Lock button. By default this is enabled. When you scroll in the `Markdown` section (section on the left where you type), the `Preview` section will scroll as well. 

Click the Scroll Lock button to prevent both screens from scrolling together .
 

#### *Preview Mode* {#preview-mode}
On the top right corner of the `Preview` section, right next to the `Scroll Lock` button is the `Preview Mode` button (in the red/right side of the screenshot):

![scroll-prev-btns](/images/scroll-prev-btns.png)

Click this option if you only want to see your generated Markdown file in the `Preview` section. Click again to take this option off. 
 

#### *Scroll To Top* {#scroll-top}
On the bottom right side of the `Preview` section you will see this button:

![scroll-to-top](/images/scroll-to-top.PNG)

Click this button to automatically scroll to the top of your screen. 
 

#### *Day/Night Mode* {#day-night}
In the `Menu`, at the very bottom, you will see a toggle option with two icons to switch from day mode to night mode:

![day-night-toggle](/images/day-night-toggle.PNG)

When the toggle is to the left (toward the Moon icon), your screen will be in Night Mode. Day mode will be the opposite side. As long as you don't clear your browser's cache, it will remember your preference when you visit the site. 
 

#### *Download* {#download}
In the `Menu`, near the bottom above the `Login/Logout` buttons, you will see a `Download` button. 

If you click this, a `.md` file will be generated from the content currently added to your editor. This is a free option whether or not you are logged in. Feel free to use it as much as you like!
 

#### *Notifications* {#notifications}
Notifications will pop up on the bottom left side of your screen to give you feedback on various actions (ie saving, deleting, creating a new document, etc.). Use these as confirmation that the action you were attempting to take was successful. 

Generally on an error message, you will be informed on what action failed. To fix most errors, simply try the action again or follow any instructions given from the notification if the action is unavailable at the time.
