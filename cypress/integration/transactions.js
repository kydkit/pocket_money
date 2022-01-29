context("Transaction features", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.loginAsUser1();
  });

  describe("as a logged in user", () => {
    it("should be able to pick different months", () => {
      cy.get(".next-arrow").click();
      cy.contains("February");
      cy.contains("02/2022");
      cy.get(".back-arrow").click();
      cy.contains("01/2022");
      cy.contains("January");
    });

    xit("should be able to delete a transaction", () => {
      cy.get(".close-icon").first().click();
      cy.request("google.firestore", deleteDoc());
    });
  });
});
