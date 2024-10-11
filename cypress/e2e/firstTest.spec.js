/// <reference types="cypress" />

describe('First test suite', () => {
    it('first test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag name
        cy.get('input')

        // by ID
        cy.get('#inputEmail1')

        //by Class value
        cy.get('.input-full-width')

        //by two attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by cypress test ID
        cy.get('[data-cy="imputEmail1"]')
    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        cy.contains('nb-card', 'Horizontal form').get('button')

        // chaining
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

    })

    it('save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // alias method
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('extract text values', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text();
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        // 4
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

        // 5
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })
    })

    it('work with radio', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({ force: true }).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({ force: true })
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })
    })

    it('work with checkbox', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[type="checkbox"]').eq(0).click({ force: true })
        cy.get('[type="checkbox"]').eq(1).click({ force: true })
    })
})
