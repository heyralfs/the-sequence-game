# The Sequence Game

The Sequence Game (as I've been calling this application for now) is a [Wordle](https://www.nytimes.com/games/wordle/index.html)-type game, but with numbers 🤓

(I must also say that the design and features were 99% inspired by [Termo](https://term.ooo) - the brazilian version of Wordle.)

The purpose here is just to practice my coding skills, but make yourself at home! ❤️

You can play it [here](https://thesequencegame.vercel.app).

🟥🟨🟩🟩🟩

![Gif showing the game](https://github.com/heyralfs/the-sequence-game/blob/media/media/sequencegame.gif)

🟥🟨🟩🟩🟩

## Technologies

-   [NextJS](https://nextjs.org/)
-   [Chakra UI](https://chakra-ui.com/)
-   [Notion](https://www.notion.so/)

🟥🟨🟩🟩🟩

## Features

**🟩 Everyday a new game!** <br>
Using Notion to store the sequences, whoever plays the game that day will have the same sequence to guess.

**🟩 Continue where you left off!** <br>
Saving your stage to local storage ensures that, if you ever need to take a break, when you come back you'll continue from your last attempt.

**🟩 Keep track of your stats!**<br>
Again making use of local storage, at each end of game you will be able to see the following statistics: percentage of wins and distribution of attempts.

**🟩 Share your results of the day on Twitter!** <br>
At the end of each match, a share button will be provided with a sample of your attempts (no spoilers!).

🟥🟨🟩🟩🟩

## Next steps

🟨 Maybe I'll add some unit tests in the future...

🟨 And an _about_ page with some math fun facts about the game's odds. 🤓

🟥🟨🟩🟩🟩

## Running locally

🤚 Before you continue...
If you just want to walk through the code in a more user-friendly interface, try accessing it [here](https://github1s.com/heyralfs/the-sequence-game).

1. Clone this repository

```bash
$ git clone https://github.com/heyralfs/the-sequence-game.git
```

2. Access the project folder

```bash
$ cd the-sequence-game
```

3. Install the dependecies

```bash
$ yarn install
# or
$ npm install
```

4. Follow the [Getting Started with Notion Integration Guide](https://developers.notion.com/docs/getting-started) to get a "Internal Integration Token" and share a database with your integration (the token and the database id will be needed to populate the .env.local file - follow the variable names left in the .env.example).

5. Run the application

```bash
yarn dev
# or
npm run dev
```

The application will start on port [3000](http://localhost:3000).

🟥🟨🟩🟩🟩
