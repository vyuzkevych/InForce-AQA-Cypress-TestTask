class CartPage {

    get = {
        itemName: () => cy.get("[class='inventory_item_name']"),
        checkoutBtn: () => cy.get("#checkout")
    }

    action = {
        clickOnCheckoutBtn: () => this.get.checkoutBtn().click(),
    }
}

export const cartPage = new CartPage();