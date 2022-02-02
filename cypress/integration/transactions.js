context("Transaction features", () => {
  before(() => {
    cy.visit("http://localhost:3001/login");
    cy.loginAsUser1();
  });

  describe("as a logged in user", () => {
    it("should add withdrawal transaction", () => {
      cy.get("#name").type("milk");
      cy.get("#amount").type("50");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryFood").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });

    it("should be able to reset transaction", () => {
      cy.get("#name").type("salary");
      cy.get("#amount").type("35000");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryIncome").click({ force: true });
      cy.get("button").contains("Reset").click();
    });

    it("should add deposit transaction", () => {
      cy.get("#name").type("salary");
      cy.get("#amount").type("40000");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryIncome").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });

    it("should  delete transaction", () => {
      cy.get(".close-icon").first().click();
    });

    it("should be able to pick different months", () => {
      cy.get(".back-arrow").click();
      cy.contains("01/2022");
      cy.contains("January");
      cy.get(".next-arrow").click();
      cy.contains("February");
      cy.contains("02/2022");
    });
  });
});
