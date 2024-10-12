import { logInPage } from "../page-objects/logInPage";

describe("Test login page", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl"), {
            onBeforeLoad: (win) => {
                cy.spy(win.console, "error").as("consoleError");
            }
        });
    });

    it("Verify that the login page is accessible and loads without errors", () => {
        cy.get("@consoleError").should("not.have.been.called");
        logInPage.get.logInLogo()
            .should("be.visible")
            .and("contain.text", "Swag Labs");
    });

    it("Verify that a user with valid login credentials can log in successfully", () => {
        logInPage.action.fillUserName(Cypress.env("userName"));
        logInPage.action.fillPassword(Cypress.env("password"));
        logInPage.action.clickOnLogInBtn();

        cy.url().should("equal", "https://www.saucedemo.com/inventory.html");
    });

    it("Verify that a user with invalid login credentials cannot log in and sees an appropriate", () => {
        logInPage.action.fillUserName(Cypress.env("userName"));
        logInPage.action.fillPassword("asd12");
        logInPage.action.clickOnLogInBtn();

        logInPage.get.errorMessage().should("contain.text", "Epic sadface: Username and password do not match any user in this service");
    });
});