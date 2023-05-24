describe('Component testing - start game snackbar', () => {
  it('registered the user and creates the quiz we will be using for the following tests', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .clear()
      .type('test6@email.com');
    window.cy.get('#password')
      .focus()
      .clear()
      .type('Test123!');
    window.cy.get('#confirmPassword')
      .focus()
      .clear()
      .type('Test123!');
    window.cy.get('#signup')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('#navCreateGameBtn').should('be.visible');
    window.cy.get('#navCreateGameBtn')
      .click();
    window.cy.get('#create-quiz-modal').should('be.visible');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#createGameBtn')
      .click();
  });

  it('redners the snakcbar when a quiz is started and the copy link button is pressed', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test6@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('play')
      .click();
    window.cy.get('#copyLinkBtn').should('be.visible');
    window.cy.get('#copyLinkBtn')
      .click();
    window.cy.get('#snackbar').should('be.visible');
  });

  it('resets the quiz for the next test', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test6@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('stop')
      .click();
    window.cy.get('#closeBtn')
      .click();
  })

  it('the snackbar disapears 2000ms after being rendered', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test6@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('play')
      .click();
    window.cy.get('#copyLinkBtn').should('be.visible');
    window.cy.get('#copyLinkBtn')
      .click();
    window.cy.get('#snackbar').should('be.visible');
    window.cy.wait(2000);
    window.cy.get('#snackbar').should('not.exist');
  });
});
