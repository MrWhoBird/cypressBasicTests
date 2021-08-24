/// <reference types="Cypress" />
 
describe('Testing sandbox', function(){
  it('Test website elements', function() {
    
    //Check boxes
    cy.visit("https://qaclickacademy.com/practice.php/")
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
    cy.get('input[type="checkbox"]').check(['option2','option3'])
    
    //Static Dropdown
    cy.get('select').select('option2').should('have.value','option2')
    
    //Dynamic dropdowns
    cy.get('#autocomplete').type('ind')
    cy.get('.ui-menu-item div').each(e1 => e1.text()==="India" ? e1.trigger('click') : true)
    
    //autocomplete
    cy.get('#autocomplete').should('have.value','India')

    //visible invisible
    cy.get('#displayed-text').should('be.visible')
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')
    
    //radio buttons
    cy.get('[value="radio2"]').check().should('be.checked')
    cy.get('#alertbtn').click()
    cy.get('#confirmbtn').click()

    //alerts
    cy.on("window:alert", str => expect(str).to.be.equal("Hello , share this practice page and share your knowledge"))
    cy.on("window:confirm", str => expect(str).to.be.equal("Hello , Are you sure you want to confirm?"))

    //child element new tab
    cy.get('#opentab').invoke('removeAttr','target').click()
    cy.url().should('include','shettyacademy')
    cy.go('back')

    //tables
    cy.get('tr td:nth-child(2)').each((el, index) => {
      const text = el.text()
      text.includes("Python") ? 
      (
        cy.get("tr td:nth-child(2)").eq(index).next().then( price =>
        {
          const priceText =  price.text()
          expect(priceText).to.equal('25')
        })
      ) : true
   
  })

  //mouse hover
  cy.get("div.mouse-hover-content").invoke("show")
  cy.contains("Top").click({force:true})
  cy.url().should('include','top')

  })
})