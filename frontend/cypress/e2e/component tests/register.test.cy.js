describe('Component testing - Register', () => {
  it('renders the name, email, password, confirm password fields and register button', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name').should('be.visible');
    window.cy.get('#email').should('be.visible');
    window.cy.get('#password').should('be.visible');
    window.cy.get('#confirmPassword').should('be.visible');
    window.cy.get('#signup').should('be.visible');
  })

  it('renders the name, email, password and confirm password inputs to be required', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name').should('have.attr', 'required');
    window.cy.get('#email').should('have.attr', 'required');
    window.cy.get('#password').should('have.attr', 'required');
    window.cy.get('#confirmPassword').should('have.attr', 'required');
  })

  it('renders the error modal when an empty name is submitted', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear();
    window.cy.get('#signup')
      .click();
    window.cy.get('#error-modal').should('be.visible');
    window.cy.get('#error-modal-description').should('have.text', 'Name field is required');
  });

  it('renders the error modal when an incorrectly formatted email is submitted', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .focus()
      .clear()
      .type('test.com');
    window.cy.get('#signup')
      .click();
    window.cy.get('#error-modal').should('be.visible');
    window.cy.get('#error-modal-description').should('have.text', 'Email not valid');
  });

  it('renders the error modal when password and confirm password do not match upson submission', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .focus()
      .clear()
      .type('test5@email.com');
    window.cy.get('#password')
      .focus()
      .clear()
      .type('Test123!');
    window.cy.get('#confirmPassword')
      .focus()
      .clear()
      .type('Test124!');
    window.cy.get('#signup')
      .click();
    window.cy.get('#error-modal-title').should('be.visible');
    window.cy.get('#error-modal-description').should('have.text', 'Passwords must match');
  });

  it('renders the error modal when the password is not strong enough when submitted', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .focus()
      .clear()
      .type('test5@email.com');
    window.cy.get('#password')
      .focus()
      .clear()
      .type('password');
    window.cy.get('#confirmPassword')
      .focus()
      .clear()
      .type('password');
    window.cy.get('#signup')
      .click();
    window.cy.get('#error-modal').should('be.visible');
  });

  it('renders the name, email, password and confirm password inputs as valid if there are no errors and the form submits as expected', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .focus()
      .clear()
      .type('test5@email.com');
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
})
