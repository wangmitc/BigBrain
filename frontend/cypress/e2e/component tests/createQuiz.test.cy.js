describe('Component testing - Create quiz', () => {
  it('registered the user we will be signing in as for the fllowing tests', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .clear()
      .type('test1@email.com');
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

  it('renders the create quiz button on the nav bar', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test1@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('#navCreateGameBtn').should('be.visible');
  });

  it('renders the modal to enter a quiz name when the create quiz button is clicked', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test1@email.com');
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
  });

  it('renders the error modal when an empty name is submitted', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test1@email.com');
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
      .clear();
    window.cy.get('#createGameBtn')
      .click();
    window.cy.get('#error-modal').should('be.visible');
  });

  it('Sucessfully creates a new quiz and renders it on the dashboard', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test1@email.com');
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
    window.cy.get('.css-1nxrm1').first().should('be.visible');
  });

  it('renders the create quiz button on the nav list', () => {
    window.cy.viewport(400, 700);
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test1@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
  });

  it('renders the modal to enter a quiz name when the create quiz button is clicked', () => {
    window.cy.viewport(400, 700);
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test1@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('#openNavDrawerBtn').should('be.visible');
    window.cy.get('#openNavDrawerBtn')
      .click();
    window.cy.get('#navlistCreateGameBtn').should('be.visible');
    window.cy.get('#navlistCreateGameBtn')
      .click();
    window.cy.get('#create-quiz-modal').should('be.visible');
  });

  it('renders the error modal when an empty name is submitted', () => {
    window.cy.viewport(400, 700);
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test1@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('#openNavDrawerBtn').should('be.visible');
    window.cy.get('#openNavDrawerBtn')
      .click();
    window.cy.get('#navlistCreateGameBtn').should('be.visible');
    window.cy.get('#navlistCreateGameBtn')
      .click();
    window.cy.get('#create-quiz-modal').should('be.visible');
    window.cy.get('#name')
      .focus()
      .clear();
    window.cy.get('#createGameBtn')
      .click();
    window.cy.get('#error-modal').should('be.visible');
  });

  it('Sucessfully creates a new quiz and renders it on the dashboard', () => {
    window.cy.viewport(400, 700);
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test1@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('#openNavDrawerBtn').should('be.visible');
    window.cy.get('#openNavDrawerBtn')
      .click();
    window.cy.get('#navlistCreateGameBtn').should('be.visible');
    window.cy.get('#navlistCreateGameBtn')
      .click();
    window.cy.get('#create-quiz-modal').should('be.visible');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test2');
    window.cy.get('#createGameBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').last().should('be.visible');
  });
});
