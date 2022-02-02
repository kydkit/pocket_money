describe("Test sign in", function () {
  it("Signs in", function () {
    cy.visit("http://localhost:3001");

    cy.get("#email").type("k@gmail.com");
    cy.get("#password").type("test1234{enter}");
  });

  it("greets user", function () {
    cy.get(".greet").contains("Hi, you are logged in as k@gmail.com");
  });

  it("logs out", function () {
    cy.get(".nav-logout").click();
  });
});
