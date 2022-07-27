describe("My First Test", () => {
    it("Visits the page", () => {
        cy.visit("http://localhost:3000");
    });

    // it("Opens new doc modal on save", () => {
    //     cy.get("#save-btn").click();
    //     cy.contains("span", "NAME YOUR DOCUMENT").should("be.visible");
    //     cy.get("#close-modal").click();
    // });

    // it("Rejects delete on home page", () => {
    //     cy.get("#delete-btn").click();
    //     cy.contains("span", "You must save first!");
    // });

    // it("Opens menu", () => {
    //     cy.contains("span", "MY DOCUMENTS").should("not.be.visible");
    //     cy.get("#toggle-menu").click();
    //     cy.contains("span", "MY DOCUMENTS").should("be.visible");
    //     cy.get("#toggle-menu").click();
    //     cy.contains("span", "MY DOCUMENTS").should("not.be.visible");
    // });

    // it("Opens new doc modal from menu", () => {
    //     cy.get("#toggle-menu").click();
    //     cy.get("#new-doc-btn").click();
    //     cy.get("[aria-label='Type new document name']")
    //         .should("be.visible")
    //         .type("Hi");
    // });

    // it("Selects save options", () => {
    //     cy.get('[aria-label="Select save type"]')
    //         .find("div")
    //         .contains("Local")
    //         .click();
    //     cy.get("ul.MuiList-root")
    //         .should("be.visible")
    //         .contains("li", "Database")
    //         .should("have.attr", "aria-disabled", "true");

    //     cy.get("li.MuiMenuItem-root").contains("Local").click();
    // });

    // it("Creates new document", () => {
    //     cy.get("#create-doc-btn").click();
    //     cy.url().should("include", "/local/Hi");
    //     cy.get("#close-modal").should("not.exist");
    //     cy.contains("span", "New document created!").should("be.visible");
    //     cy.get("#new-doc-btn").should("not.be.visible");
    //     cy.get('[aria-label="Rename your file"]').contains("Hi.md");
    // });

    // it("Navigates back home", () => {
    //     cy.contains("a", ".MARK").click();
    //     cy.url().should("eq", Cypress.config().baseUrl);
    //     cy.get('[aria-label="Rename your file"]').contains("welcome");
    // });

    // it("Navigates to a user's document", () => {
    //     cy.get("#toggle-menu").click();
    //     cy.contains("span", "My Files").should("be.visible").click();
    //     cy.get("div.MuiListItemButton-root")
    //         .contains("span", "Hi")
    //         .should("be.visible")
    //         .click();
    //     cy.url().should("include", "/local/Hi");
    //     cy.get('[aria-label="Rename your file"]').contains("Hi");
    // });

    // it("Creates new markdown", () => {
    //     cy.get("#editor").type("# Heading\n");
    //     cy.get("#preview").contains("h1", "Heading");
    // });

    // it("Saves new content", () => {
    //     cy.get("#save-btn").click();
    //     cy.contains("span", "Document saved!").should("be.visible");
    //     cy.contains("a", ".MARK").click();
    //     cy.url().should("eq", Cypress.config().baseUrl);
    //     cy.visit(Cypress.config().baseUrl + "/local/Hi");
    //     cy.get("#preview").contains("h1", "Heading");
    // });

    // it("Deletes a document", () => {
    //     cy.get("#delete-btn").click();
    //     cy.contains("span", "ARE YOU SURE YOU WANT TO DELETE?").should(
    //         "be.visible"
    //     );
    //     cy.contains("p", 'delete "Hi"?').should("be.visible");
    //     cy.get("#confirm-delete").click();
    //     cy.url().should("eq", Cypress.config().baseUrl);
    //     cy.contains("span", "Document deleted!").should("be.visible");
    //     cy.get('[aria-label="Rename your file"]').contains("welcome");
    // });

    it("Navigates to existing document", () => {
        cy.get("#toggle-menu").click();
        cy.contains("span", "Guides").should("be.visible").click();
        cy.get("div.MuiListItemButton-root")
            .contains("span", "Intro")
            .should("be.visible")
            .click();
        cy.url({ timeout: 20000 }).should("include", "/guides/Intro");
        cy.get('[aria-label="Rename your file"]').contains("Intro");
    });
});
