Cypress.Commands.add("loginAsUser1", () => {
  const email = "k@gmail.com";
  const password = "test1234";
  cy.visit("http://localhost:3001/login");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".login-button").click();
});
