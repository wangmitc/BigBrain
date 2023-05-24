- Home page: The initial page showed by users allow them to see the branding of the site before they sign up or log in.
- Typewriter text: The animated text on the homepage makes the home page more exciting and unique for the viewer experience.
- Background: We decided to draw our own background that encompasses the BigBrain website used on selected pages to make it more exciting
- Registration: Validation that email is an email in the correct format
- Registration: passwords must be secure, meaning they are a minimum of 8 characters, must contain one uppercase letter, a special character and a number
- Registration: names must be at least one character long
- Quiz cover images: if an image is not uploaded a generic image is displayed
- Question cover images: if an image or video is not uploaded a generic image is displayed
- Navigation bar: that switches format for mobile & has icons
- Favicon: on the tab of the webpage to make the site clearly distinguishable
- Registration, edit question and edit answer: indication for required fields with server-side validation
- Dashboard: hoverability on quiz cards to slightly expand and make a shadow to show they can be interacted and are focused on the screen
- Colour: Instead of choosing a simple colour to be a primary colour for our website we choose a subtle watermelon red gradient that is used on the nav bar, registration page, all buttons and is the hoverable colour for all clickable elements.
- Icons: Icons used on the nav bar and on some buttons for the feed
- Lobby music: While the player is waiting for a game to start the website automatically plays some lobby music (a mega Taylor Swift mashup… your welcome… I recommend listening for the full 10 minute track because it’s a banger). There is also a button to pause and play the music (but I don’t think you’ll need to or want to pause it)
- Lobby interactive: While users are waiting in the lobby they can play with the interactive which is an implementation using tsparticles which escapes the users cursor and floats around the screen. These particles and connections are a representaion of the brain neurons, connceting and disconnecting.
- Count up animation: on the player side when they get to see their own results the users final score does a count up animation to build suspense and add some more exciting elements to the page
- Thumbnail Deletion for edit quiz: After a user uploads a new thumbnail, the user can restore the original uploaded thumbnail (the thumbnail stored in the database) by deleteing it. Additionally the user can delete the original thumbnail, to revert it to the default thumbnail.
- Admin can view the current state of the quiz: the Admin that started the quiz, on top of being able to progress the quiz, is also able to see the current state of the quiz, the same way players can (i.e. How much time is left, which page is displayed, the current question...)