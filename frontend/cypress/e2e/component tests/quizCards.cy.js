describe('Component testing - Dashboard quiz cards', () => {
  it('registered the user we will be signing in as for the following tests', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .clear()
      .type('test4@email.com');
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
  });

  it('rednders a quiz card on the dashboard that contains an a thumbnail image, title, question count, time length fo the quiz and action buttons', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test4@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
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
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-zb6xzq').first().should('be.visible');
    window.cy.get('.css-io7f42').first().should('be.visible');
    window.cy.get('div').contains('Questions').should('be.visible');
    window.cy.get('div').contains('secs').should('be.visible');
    window.cy.get('button').contains('play').should('be.visible');
    window.cy.get('button').contains('edit').should('be.visible');
    window.cy.get('button').contains('delete').should('be.visible');
  });

  it('Changes the buttons if the game is currently active or not', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test4@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('play').should('be.visible');
    window.cy.get('button').contains('edit').should('be.visible');
    window.cy.get('button').contains('delete').should('be.visible');
    window.cy.get('button').contains('play')
      .click();
    window.cy.get('.css-1kmcvon').first().should('be.visible');
    window.cy.get('.css-1kmcvon')
      .click();
    window.cy.get('button').contains('stop').should('be.visible');
    window.cy.get('button').contains('view quiz').should('be.visible');
    window.cy.get('button').contains('stop')
      .click();
    window.cy.get('#closeBtn')
      .click();
    window.cy.get('button').contains('play').should('be.visible');
    window.cy.get('button').contains('edit').should('be.visible');
    window.cy.get('button').contains('delete').should('be.visible');
  });
});
