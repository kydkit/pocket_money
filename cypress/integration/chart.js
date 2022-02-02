context("Chart features", () => {
  before(() => {
    cy.visit("http://localhost:3001/login");
    cy.loginAsUser1();
  });

  describe("show different categories on chart", () => {
    it("should add income category", () => {
      cy.get("#name").type("gift");
      cy.get("#amount").type("3000");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryIncome").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });

    it("should add household category", () => {
      cy.get("#name").type("new keys");
      cy.get("#amount").type("300");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryHousehold").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });

    it("should add transport category", () => {
      cy.get("#name").type("scooter");
      cy.get("#amount").type("100");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryTransport").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });

    it("should add food category", () => {
      cy.get("#name").type("groceries");
      cy.get("#amount").type("500");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryFood").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });

    it("should add shopping category", () => {
      cy.get("#name").type("pants");
      cy.get("#amount").type("500");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryShopping").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });

    it("should add other category", () => {
      cy.get("#name").type("insurance");
      cy.get("#amount").type("1000");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categoryOther").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });

    it("should add savings category", () => {
      cy.get("#name").type("milk");
      cy.get("#amount").type("50");
      cy.get('input[id="date-picker"]').click();
      cy.get(".react-datepicker__day--today").click();
      cy.get("#categorySavings").click({ force: true });
      cy.get("button").contains("Enter Transaction").click();
    });
  });
});
