


describe('My First Test', () => {
  it('Visits the page', () => {
    cy.visit('http://localhost:3000')
    cy.get('#save-btn').click()
    cy.contains('span', 'NAME YOUR DOCUMENT')
  })
})
