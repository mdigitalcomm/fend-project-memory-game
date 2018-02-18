# Memory Game

This project is created for the Udacity Front-End Web Developer Nanodegree course.

## How the Game Works :game_die:

Here is the explanation of the game provided by Udacity: 
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are: flip over two hidden cards at a time to locate the ones that match!

Each turn:

- The player flips one card over to reveal its underlying symbol.
- The player then turns over a second card, trying to find the corresponding card with the same symbol.
- If the cards match, both cards stay flipped over.
- If the cards do not match, both cards are flipped face down.
- The game ends once all cards have been correctly matched.

## Key functions

 - **Shuffle**: The player can randomly shuffle cards.
 - **Flip card**: When the player click on one card, it flips with animation effect.
 - **Match cards**: When two cards are open, match the cards to see if they have the same symbol. If the cards match, both cards stay flipped over. If not, both cards are flipped face down.
 - **Popup**: When a user wins the game by locating all the matching cards correctly, a modal appears to congratulate the player.
 - **Star rating**: The game displays a star rating (from 1-3) that reflects the player's performance. The more steps it takes, the lower the rating is.
 - **Timer**: When the player starts a game, the timer starts. Once the player wins the game, the timer stops.
 - **Move counter**: Game displays the current number of moves the player has made.
 - **Reset**: A reset button allows the player to reset the game board, the timer, and the star rating.

## Credits

This repository used some HTML and CSS styling code provided by @richardkalehoff of Udacity to display a static version of the project. See starter code [here](https://github.com/udacity/fend-project-memory-game) :innocent:

## Contributing

Pull requests are welcome. When contributing to this repository, please first discuss the change you wish to make via GitHub with the owner of this repository before make a change.

## License

MIT © mdigitalcomm