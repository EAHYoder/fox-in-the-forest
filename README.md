# *Fox in the Forest*

*A two player board game where team mates cooperatively move the fox through the forest to collect all the gems, taking care not to stray from the path too often.  This is a web version of the game with custom animations.  The game is available to play for a two player team [here.](fox-in-the-forest-game.herokuapp.com)* 

## Features
[This video](https://youtu.be/A4F8Tmr3BjM) demonstrates many of the games features which are listed here:
- Users can log in and create an account.
- Logged in users can review rules of the game which include animated demos of various gameplay concepts.
- If two players are logged in a player can start a round.  This shuffles the deck, deals a hand of 11 cards to each player, and sets the decree card.  Each player is only able to see their own hand.
- During a round the active leading player can start a trick by playing a card.  Both players are able to see any cards that have been played.
- During a round the active following playing can complete a trick by playing a card.  When a trick is complete the fox will be moved the appropriate direction and distance based on the cards played.
- If the fox moves off the path the following will happen: the path will be shortened, any gems on the lost part of the path will be relocated, the fox will be relocated to the new end of the path, and a part of the map will be lost.
- If four pieces of the map are lost, a message will display indicating that the game is over and the players lose.
- If both players run out of cards before all the gems are collected, a message will display indicating that the game is over and the players lose.
- If the fox collects all the gems, a message will display indicating that the game is over and the players have won!

### Dependencies

- [Anime.js](https://animejs.com/) to animate card and fox movement.
- [Axios](https://axios-http.com/docs/intro) to make calls to the back end from the front end.
- [bCrypt](https://www.npmjs.com/package/bcrypt) to hash user passwords when accounts are set.
- [Compression](https://www.npmjs.com/package/compression)
- [Express](https://expressjs.com/) framework for back end.
- [History](https://www.npmjs.com/package/history) to redirect the user to different views after certain actions.
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) for authentication to ensure users only see their own hand of cards.
- [Morgan](https://expressjs.com/en/resources/middleware/morgan.html) logging middleware in the back end.
- [pg](https://www.npmjs.com/package/pg) to work with postgreSQL.
- [socket.io](https://socket.io/) and [socket.io-client](https://socket.io/docs/v4/client-api/) to allow players to see the results of one another's actions.

### Getting started
The game is available to play for a two player team [here](fox-in-the-forest-game.herokuapp.com).  If you would like to work with the code that built the game run you can clone this repository, install its dependencies, create the database, and seed it for the board and deck information by running the code below. You will need to have postgreSQL

```
git clone git@github.com:EAHYoder/fox-in-the-forest.git
npm install
createdb fs-app-template
npm run seed
npm run start 

```

## Team

**Liz Yoder** Sole Developer

[LinkedIn](https://www.linkedin.com/in/alston-white/)

[GitHub](https://github.com/EAHYoder)

[Portfolio](liz-yoder.netlify.app/)

This is based on the board game made by [Renegade Game Studios](https://renegadegamestudios.com/fox-in-the-forest-duet/)

## Errors and bugs

If something is not behaving intuitively, it is a bug and should be reported.
Report it here by creating an issue: https://github.com/EAHYoder/fox-in-the-forest

Help me fix the problem as quickly as possible by following [Mozilla's guidelines for reporting bugs.](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines#General_Outline_of_a_Bug_Report)

## Patches and pull requests

Your patches are welcome. Here's my suggested workflow:
 
* Fork the project.
* Make your feature addition or bug fix.
* Send me a pull request with a description of your work. Bonus points for topic branches!
