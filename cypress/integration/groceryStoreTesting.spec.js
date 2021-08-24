/// <reference types="Cypress" />

describe("Grocery store testing", function(){
  it("Buy items and checkout", function(){
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    //typ in 'ca'
    cy.get('.search-keyword').type('ca')
    cy.wait(500)
    //alias
    cy.get('.products').find('.product').as('getProduct')
    //assert that the length is 4
    cy.get('.product:visible').should('have.length',4)
    cy.get('@getProduct').should('have.length',4)
    //directly click on carrot
    cy.get(':nth-child(2) > .stepper-input > .increment').click()
    cy.get(':nth-child(2) > .product-action > button').click()
    //dynamically click on cashew
    cy.get('@getProduct').eq(3).contains('+').click()
    cy.get('@getProduct').eq(3).contains('ADD TO CART').click()
    //click on cauliflower
    cy.get('@getProduct').each(el => el.find('.product-name').text().includes('Cauliflower') ? el.find('button').trigger('click') : true)
    //assert that
    cy.get('.brand').should('have.text','GREENKART')
    //log it
    cy.get('.brand').then(brand => cy.log(brand.text()))
    //accept and checkout
    cy.get('.cart-icon').click()
    cy.get('button').each(el => el.text().includes('CHECKOUT') ? el.trigger('click') : true)
    cy.contains('Place Order').click()
  })
})