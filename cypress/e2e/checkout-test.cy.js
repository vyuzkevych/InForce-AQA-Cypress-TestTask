import { logInPage } from "../page-objects/logInPage";
import { mainPage } from "../page-objects/mainPage";
import { cartPage } from "../page-objects/cartPage";
import { checkoutPage } from "../page-objects/checkoutPage";

describe("Create a test case for Checkout: Your Information page", () => {
    
    it(`On the Checkout: Your Information page, verify that the correct user information 
        (name, email, etc.) is pre-filled based on the logged-in user`, () => {
    
        cy.visit(Cypress.env("baseUrl"));
        logInPage.action.fillUserName(Cypress.env("userName"));
        logInPage.action.fillPassword(Cypress.env("password"));
        logInPage.action.clickOnLogInBtn();
        mainPage.action.clickOnCartBtn();
        cartPage.action.clickOnCheckoutBtn();
        checkoutPage.action.clickOnContinueBtn();

        /**
         * on this particular demo website there is no user info which is based on the logged-in user
         * on Checkout: Your Information page user info is always empty
         * so i created a template of test which can be used for verifying user info, 
         * which is based on the logged-in user, if there will be such a fixture
         */

        checkoutPage.get.firstName().should("contain.text", "");
        checkoutPage.get.lastName().should("contain.text", "");
        checkoutPage.get.postalCode().should("contain.text", "");
    });
});