class LogInPage {

    get = {
        logInLogo: () => cy.get(".login_logo"),
        userNameField: () => cy.get("#user-name"),
        passwordField: () => cy.get("#password"),
        logInBtn: () => cy.get("#login-button"),
        errorMessage: () => cy.get("h3[data-test='error']")
    }

    action = {
        fillUserName: (userName) => this.get.userNameField().type(userName),
        fillPassword: (pwd) => this.get.passwordField().type(pwd),
        clickOnLogInBtn: () => this.get.logInBtn().click()
    }
}

export const logInPage = new LogInPage();