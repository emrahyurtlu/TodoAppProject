describe("todo list tests", () => {
  it("user can insert new todos", () => {
    cy.visit("http://127.0.0.1:5173/")

    cy.get("button").click()

    cy.get("div.modal-title").should("contain", "Create New Todo")

    cy.get('[name="title"]').type("Hey this is my todo's title")
    cy.get('[name="description"]').type("Hey this is my todo's description")

    cy.get('[data-cy="create"]').click()

    cy.get("body").should("contain", "New todo is added.");
  })
})
