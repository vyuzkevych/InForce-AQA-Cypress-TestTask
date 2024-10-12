class CheckoutPage {

    get = {
        firstName: () => cy.get("#first-name"),
        lastName: () => cy.get("#last-name"),
        postalCode: () => cy.get("#postal-code"),
        continueBtn: () => cy.get("#continue"),
        itemName: () => cy.get("[class='inventory_item_name']"),
        itemPrice: () => cy.get("[class='inventory_item_price']"),
        subTotalPrice: () => cy.get("[class='summary_subtotal_label']"),
        taxPrice: () => cy.get("[class='summary_tax_label']"),
        totalPrice: () => cy.get("[class='summary_total_label']"),
        finishBtn: () => cy.get("#finish"),
        completeMessage: () => cy.get("[class='complete-header']"),
        backHomeBtn: () => cy.get("#back-to-products")
    }

    action = {
        fillFirstName: (firstName) => this.get.firstName().type(firstName),
        fillLastName: (lastName) => this.get.lastName().type(lastName),
        fillPostalCode: (code) => this.get.postalCode().type(code),
        clickOnContinueBtn: () => this.get.continueBtn().click(),
        getFormattedPrice: (element) => {
            const formattedPrice = parseFloat(element.split('$')[1]);
            return formattedPrice;
        },
        clickOnFinishBtn: () => this.get.finishBtn().click(),
        clickOnBackHomeBtn: () => this.get.backHomeBtn().click()
    }
}

export const checkoutPage = new CheckoutPage();