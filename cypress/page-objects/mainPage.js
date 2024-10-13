class MainPage {

    get = {
        cartBtnText: () => cy.get("[data-test='shopping-cart-badge']"),
        cartBtn: () => cy.get("[data-test='shopping-cart-link']"),
        itemName: () => cy.get("[class='inventory_item_name ']")
    }

    action = {
        clickOnCartBtn: () => this.get.cartBtn().click()
    }
}

export const mainPage = new MainPage();