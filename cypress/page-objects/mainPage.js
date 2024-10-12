class MainPage {

    get = {
        cartBtnText: () => cy.get("[data-test='shopping-cart-badge']"),
        cartBtn: () => cy.get("[data-test='shopping-cart-link']"),
        itemName: () => cy.get("[class='inventory_item_name ']")
    }

    action = {
        clickOnCartBtn: () => this.get.cartBtn().click(),
        getItemName: (index) => {
            return this.get.itemName().eq(index).then(($el) => {
                return $el.text();
            })
        }
    }
}

export const mainPage = new MainPage();