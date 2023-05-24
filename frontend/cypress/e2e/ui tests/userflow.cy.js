describe('COMP6080 Ass4 UI testing', () => {
  it('should execute the Bigbrain Happy Path sucessfully', () => {
    // 0. display the home screen
    window.cy.visit('localhost:3000/');
    window.cy.url().should('include', 'localhost:3000');

    // navigate to the log in screen
    window.cy.visit('localhost:3000/');
    window.cy.url().should('include', 'localhost:3000');
    window.cy.get('#getStarted')
      .click();
    window.cy.url().should('include', 'localhost:3000/login');

    // 1. Registers successfully -> uncomment (reset database)
    window.cy.get('#signup')
      .click();
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .type('Test');
    window.cy.get('#email')
      .focus()
      .type('example@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#confirmPassword')
      .focus()
      .type('Test123!');
    window.cy.get('#signup')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');

    // 3. Creates a new game successfully
    window.cy.get('#navCreateGameBtn')
      .click();
    window.cy.get('#name')
      .focus()
      .type('Test quiz');
    window.cy.get('#createGameBtn')
      .click();

    // 4. Updates the thumbnail and name of the game successfully
    window.cy.get('button').contains('edit')
      .click();
    window.cy.get('#imageUploadBtn')
      .selectFile('src/assets/background.png');
    window.cy.get('#name')
      .focus()
      .clear()
      .type('New question name');
    window.cy.get('#saveChangesBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');

    // 5. Starts a game successfully
    window.cy.get('button').contains('play')
      .click();
    window.cy.get('#openQuizBtn')
      .click();

    // 6. Ends a game successfully
    window.cy.get('button').contains('End')
      .click();
    window.cy.get('#backBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');

    // 7. Logs out of the application successfully
    window.cy.get('#navLogoutBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/');

    // 8. Logs back into the application successfully
    window.cy.visit('localhost:3000/');
    window.cy.url().should('include', 'localhost:3000');
    window.cy.get('#getStarted')
      .click();
    window.cy.url().should('include', 'localhost:3000/login');
    window.cy.get('#email')
      .focus()
      .type('example@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');
  });

  it('should execute the Bigbrain path defined in TESTING.md sucessfully', () => {
    // 1. display the home screen
    window.cy.visit('localhost:3000/');
    window.cy.url().should('include', 'localhost:3000');

    // 2. Attempts to log in with unregistered user
    // navigate to the log in screen
    window.cy.visit('localhost:3000/');
    window.cy.url().should('include', 'localhost:3000');
    window.cy.get('#getStarted')
      .click();
    window.cy.url().should('include', 'localhost:3000/login');
    // attempting to log in
    window.cy.get('#email')
      .focus()
      .type('example2@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#signin')
      .click();
    // closing error modal
    window.cy.get('#closeBtn')
      .click();

    // 2. Registers successfully -> uncomment (reset database)
    window.cy.get('#signup')
      .click();
    window.cy.url().should('include', 'localhost:3000/register');
    window.cy.get('#name')
      .focus()
      .type('Test2');
    window.cy.get('#email')
      .focus()
      .type('example2@email.com');
    window.cy.get('#password')
      .focus()
      .type('Test123!');
    window.cy.get('#confirmPassword')
      .focus()
      .type('Test123!');
    window.cy.get('#signup')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');

    // 3. Creates a new game successfully
    window.cy.get('#navCreateGameBtn')
      .click();
    window.cy.get('#name')
      .focus()
      .type('Test quiz');
    window.cy.get('#createGameBtn')
      .click();

    // 4. Delete the game just created
    window.cy.get('button').contains('delete')
      .click();
    window.cy.get('#CloseButton')
      .click();

    // 5. Create a new game sucessfully
    window.cy.get('#navCreateGameBtn')
      .click();
    window.cy.get('#name')
      .focus()
      .type('New test quiz');
    window.cy.get('#createGameBtn')
      .click();

    // 4. Edit the quiz
    window.cy.get('button').contains('edit')
      .click();
    // Edit quiz thumbnail
    window.cy.get('#imageUploadBtn')
      .selectFile('src/assets/background.png');
    // Edit quiz name
    window.cy.get('#name')
      .focus()
      .clear()
      .type('New question name');
    // Add a question
    window.cy.get('#addQuestionBtn')
      .click();
    window.cy.get('button').contains('Edit')
      .click();
    // Edit the quesion string
    window.cy.get('#questionString')
      .focus()
      .clear()
      .type('This is a question?');
    // Edit the points allocated to the question
    window.cy.get('#points')
      .focus()
      .clear()
      .type(30)
    // edit the time allocated to the question
    window.cy.get('#time')
      .focus()
      .clear()
      .type(1003);
    // edit the question video thumbnail
    window.cy.get('#youtubeUploadBtn')
      .click();
    window.cy.get('#youtubeUploadField')
      .focus()
      .clear()
      .type('https://youtu.be/9doD2XWi88Y');
    // save the changed to the question
    window.cy.get('#saveChangesBtn')
      .click();
    // Add a few more questions
    window.cy.get('#addQuestionBtn')
      .click();
    window.cy.get('#addQuestionBtn')
      .click();
    window.cy.get('#addQuestionBtn')
      .click();
    // save the changed to the quiz
    window.cy.get('#saveChangesBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');

    // 6. Starts a game successfully
    window.cy.get('button').contains('play')
      .click();
    window.cy.get('#openQuizBtn')
      .click();

    // 7. Lobby loads successfully with interactive background and autoplaying msuci which can be paused and played again
    window.cy.url().should('include', 'localhost:3000/quiz/play/');
    window.cy.wait(6000);
    window.cy.get('#soundBtn')
      .click();
    window.cy.wait(3000);
    window.cy.get('#soundBtn')
      .click();
    window.cy.wait(3000);

    // 8. Navigate through the game through pressing the next button
    window.cy.get('#nextBtn')
      .click();
    window.cy.wait(1000);
    window.cy.get('#backBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/dashboard');

    // 7. Logs out of the application successfully
    window.cy.get('#navLogoutBtn')
      .click();
    window.cy.url().should('include', 'localhost:3000/');
  });
});
