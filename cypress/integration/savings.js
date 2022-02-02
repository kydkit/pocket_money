context("Savings features", () => {
  before(() => {
    cy.visit("http://localhost:3001/login");
    cy.loginAsUser1();
  });

  describe("as a logged in user", () => {
    it("should set goals", () => {
      cy.get("#set-first-goal").type("1000");
      cy.get("#set-second-goal").type("3000");
      cy.get("button").contains("Set goals").click();
    });

    it("should edit goal", () => {
      cy.get(".pen").first().click();
      cy.get("#edit-first-goal").type("2000");
      cy.get("button").contains("Save").first().click();
    });

    it("should light up when goals are reached", () => {
      cy.get("#name").type("saving");
      cy.get("#amount").type("5000");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categorySavings").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });
  });
});
