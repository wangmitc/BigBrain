describe('Component testing - Edit quiz thumbnail image', () => {
  it('registered the user we will be signing in as for the following tests', () => {
    window.cy.visit('localhost:3000/register');
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('Test');
    window.cy.get('#email')
      .clear()
      .type('test3@email.com');
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

  it('redners the edit quiz form', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test3@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
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
    window.cy.get('button').contains('edit')
      .click();
    window.cy.get('button').contains('Back').should('be.visible');
    window.cy.get('.css-1n19zqk').should('be.visible');
    window.cy.get('#imageUploadBtn').should('be.visible');
    window.cy.get('#name-label').should('be.visible');
    window.cy.get('#addQuestionBtn').should('be.visible');
    window.cy.get('#saveChangesBtn').should('be.visible');
  });

  it('allows for a thumbnail to be uploaded', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test3@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('edit')
      .click();
    window.cy.get('#imageUploadBtn')
      .selectFile('src/assets/background.png');
    window.cy.get('.css-1n19zqk').first().should('be.visible');
  });

  it('renders the delete button when an image is uploaded', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test3@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('edit')
      .click();
    window.cy.get('#imageUploadBtn')
      .selectFile('src/assets/background.png');
    window.cy.get('.css-1n19zqk').first().should('be.visible');
    window.cy.get('#deleteImgBtn').should('exist');
  });

  it('allows for an uploaded thumbnail to be deleted', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test3@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('edit')
      .click();
    window.cy.get('#imageUploadBtn')
      .selectFile('src/assets/background.png');
    window.cy.get('.css-1n19zqk').first().should('be.visible');
    window.cy.get('#deleteImgBtn').should('exist');
    window.cy.get('#deleteImgBtn')
      .click();
    window.cy.get('#deleteImgBtn').should('not.exist');
  });

  it('saves an uploaded thumbnail', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test3@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('edit')
      .click();
    window.cy.get('#imageUploadBtn')
      .selectFile('src/assets/background.png');
    window.cy.get('.css-1n19zqk').first().should('be.visible');
    window.cy.get('#deleteImgBtn').should('exist');
    window.cy.get('#saveChangesBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
  });

  it('renders the previously saved image and allows for that image to be deleted and resets the thumbnail back tot he default image', () => {
    window.cy.visit('localhost:3000/login');
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('test3@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
    window.cy.get('.css-1nxrm1').first().should('be.visible');
    window.cy.get('button').contains('edit')
      .click();
    window.cy.get('#deleteImgBtn').should('exist');
    window.cy.get('#deleteImgBtn')
      .click();
    window.cy.get('#deleteImgBtn').should('not.exist');
    window.cy.get('#saveChangesBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
  });
});
