# ACE TEAM Bingo Game

This is a fun and interactive Bingo game created for the 2nd anniversary celebration of the ACE TEAM volleyball team. The game is designed to be played on mobile devices, with players receiving randomized Bingo cards and the game controller handling word draws.

## Features

- Responsive design for mobile devices.
- Player cards are saved in real-time using Firebase Realtime Database.
- Players can resume their game if they leave and return by entering the same name.
- Animated interactions for word selection and drawing.
- A festive theme matching the ACE TEAM logo and colors.

## Technologies Used

- HTML, CSS, and JavaScript (ES6)
- Firebase Realtime Database
- CSS Animations

## Getting Started

### Prerequisites

- A Firebase project. You can create one at [Firebase Console](https://console.firebase.google.com/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ace-team-bingo.git
   cd ace-team-bingo
   ```

2. Set up Firebase:
   - Create a Firebase project.
   - Add a new Web App to your project and copy the Firebase configuration details.
   - Replace the placeholder Firebase configuration in `config.js` with your configuration details.

## Usage

### Players

1. Open the Bingo game URL in your browser.
2. Enter your name and click "Start Game".
3. Your Bingo card will be displayed. Tap on a cell to mark it when a word is drawn.

### Controller

1. Open the Bingo controller URL in your browser.
2. Click "Draw Word" to draw a random word from the list.
3. The drawn word will be displayed on the screen and saved to the Firebase database.
4. Click "Reset Game" to reset all game data for a new round.

## Customization

- **Theme and Styles:** You can customize the theme and styles in `style.css` to match your preferences.
- **Words List:** Modify the words list in `config.js` to use different words.

## Project Structure

- `index.html`: The main HTML file for the player interface.
- `controller.html`: The HTML file for the game controller interface.
- `style.css`: The CSS file for styling the game.
- `card.js`: The JavaScript file for handling player interactions.
- `controller.js`: The JavaScript file for handling controller interactions.
- `config.js`: The configuration file for Firebase and the words list.

## Acknowledgements
- Thanks to the ACE TEAM volleyball team for providing the logo and theme inspiration.
- [Firebase](https://firebase.google.com/) for the real-time database services.

Enjoy the game and happy 2nd anniversary to ACE TEAM!
