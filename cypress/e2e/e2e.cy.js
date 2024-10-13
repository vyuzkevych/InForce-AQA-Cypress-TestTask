import { logInPage } from "../page-objects/logInPage";
import { mainPage } from "../page-objects/mainPage";
import { cartPage } from "../page-objects/cartPage";
import { checkoutPage } from "../page-objects/checkoutPage";

describe("Test Task: Cypress E2E Testing", () => {

    it("e2e test", () => {
        let prices = [];
        let taxFee = 0;
        let totalPrice = 0;
        let itemNames = [];
        
        cy.log("Log in to the website using valid login credentials");
        cy.visit(Cypress.env("baseUrl"));
        logInPage.action.fillUserName(Cypress.env("userName"));
        logInPage.action.fillPassword(Cypress.env("password"));
        logInPage.action.clickOnLogInBtn();

        cy.log("Add at least two different items to the cart using the custom command");
        cy.addItem(2);
        mainPage.get.itemName().each(($text) => {
            itemNames.push($text.text());
        })

        cy.log(`Verify that the items are added to the cart successfully and the cart 
            icon updates with the correct item count`);
        mainPage.get.cartBtnText().should("contain.text", "2");
        
        cy.log("After adding items to the cart, navigate to the cart page");
        mainPage.action.clickOnCartBtn();

        cy.log("Verify that the cart page displays the correct items added");
        cartPage.get.itemName().its("length").should("eq", 2);
        cy.then(() => {
            cartPage.get.itemName().eq(0).should("have.text", itemNames[0]);
            cartPage.get.itemName().eq(1).should("have.text", itemNames[1]);
        });

        cy.log(`Proceed to the checkout page and verify that the correct items are 
            displayed for checkout`);
        cartPage.action.clickOnCheckoutBtn();
        cy.fixture("checkoutData").then((data) => {
            checkoutPage.action.fillFirstName(data.firstName);
            checkoutPage.action.fillLastName(data.lastName);
            checkoutPage.action.fillPostalCode(data.postalCode);
            checkoutPage.action.clickOnContinueBtn();
        });
        checkoutPage.get.itemName().its("length").should("eq", 2);
        cy.then(() => {
            checkoutPage.get.itemName().eq(0).should("contain.text", itemNames[0]);
            checkoutPage.get.itemName().eq(1).should("contain.text", itemNames[1]);
        });

        cy.log("Verifying the total price with tax on Checkout");
        checkoutPage.get.itemPrice().each(($price) => {
            const priceText = checkoutPage.action.getFormattedPrice($price.text())
            prices.push(priceText);
        });

        checkoutPage.get.taxPrice().invoke("text").then(($tax) => {
            taxFee = checkoutPage.action.getFormattedPrice($tax);
        });

        checkoutPage.get.totalPrice().invoke("text").then(($total) => {
            totalPrice = checkoutPage.action.getFormattedPrice($total);
        });

        cy.then(() => {
            const calcTotalPrice = prices.reduce((a, b) => a + b, 0) + taxFee;
            expect(totalPrice).to.eq(calcTotalPrice);
        });
        
        checkoutPage.action.clickOnFinishBtn();

        cy.log("Verify that the Checkout: Complete! page is displayed with a confirmation message");
        checkoutPage.get.completeMessage().should("contain.text", "Thank you for your order!");

        cy.log("After completing the checkout, navigate back to the main page");
        checkoutPage.action.clickOnBackHomeBtn();

        cy.log("Logout from the website and verify that the user is successfully logged out");
        // there is no logout button on the website
    });
});