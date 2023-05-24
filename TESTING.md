**Running our tests**
- Component tests -> each 6 of the component tests are in sperate files and are run in cypress which can be launch by typing `npm run test` into the terminal. Note, you need to have both the front end and backend running to run our tests. 
- UI tests -> both paths exist in the same file `userflow.cy.js` and it can be run in cypress which is launched by typing `npm run test` into the terminal. Note, you need to have both the front end and backend running to run our tests. 

**Unit testing**
This test aimed to test some of the features that were not tested in the “happy path”. For example, through trying to log in with unregistered credentials, we were able to test the generation of an error modal and that after pressing the close button the modal disappears. Further, an aim of this test was to verify the performance of the addition and editing of questions achieved through parts 8 and 9. In addition, this test aimed to validate some of the more advanced/bonus features implemented i.e the Lobby and the interactive background and music that exists on that page. Finally, given that the game is immediately ended through pressing the end quiz button in the “Happy path” we wished to test the progression through the game via the next button.

1.	Display the home screen.
2.	Attempt to log in with an unregistered details to trigger the error modal.
3.	Register successfully with the new credentials.
4.	Create a new quiz successfully.
5.	Delete the new quiz.
6.	Create a new quiz.
7.	Edit the quiz name and thumbnail.
8.	Add a question to the quiz and edit the question string, points, time limit, video thumbnail and save those changes.
9.	Add another 3 questions.
10.	Start the game successfully.
11.	Lobby loads successfully with interactive background and auto playing music.
12.	Pause lobby music.
13.	Play lobby music.
14.	Advance through the game via the next button
15.	View the results page.
16.	Navigate back to dashboard.
17.	Successfully sign out.

**Component testing**
1.	Register form and all its validation requirements.
2.	Create a quiz via nav bar in both Fullscreen and mobile.
3.	Edit quiz answers -> specifically deleting and adding answers and the behaviour of those buttons.
4.	Start a game -> specifically the hiding and showing of the snackbar
5.	Edit question thumbnail -> specifically the uploading, restoration (bonus) and deletion (bonus) of images.
6.	Quiz cards on the dashboard 