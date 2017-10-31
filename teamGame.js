var inquirer = require("inquirer");
var coin;
var playGameCount = 0;
var count = 0;
var playerArray = [];
var randomNumber1;
var randomNumber2;
var teamOffense = 0;
var teamDefense = 0;
var teamScore = 0;

function Player(name, position, offense, defense) {
  this.name = name;
  this.position = position;
  this.offense = parseInt(offense);
  this.defense = parseInt(defense);

  // goodGame: Method which increases either the player's offense or defense
  //  property based upon a coinflip.
  this.goodGame = function() {
    coinFlip();
    if (coin === 1) {
      this.offense += coin;
    } else {
      this.defense += coin;
    }
  };

  // badGame: Method which decreases either the player's offense or defense
  //  property based upon a coinflip.
  this.badGame = function() {
    coinFlip();
    if (coin === 1) {
      this.offense -= coin;
    } else {
      this.defense -= coin;
    }
  };
  this.printStats = function() {
    console.log("Name: " + this.name);
    console.log("Position: " + this.position);
    console.log("Offense: " + this.offense);
    console.log("Defense: " + this.defense);
  };
}

function coinFlip() {
  coin = parseInt(Math.floor(Math.random() * 2) + 1);
}

var askQuestion = function() {
  // if statement to ensure that our questions are only asked five times
  if (count < 3) {
    console.log("NEW PLAYER");
    // runs inquirer and asks the user a series of questions whose replies are
    // stored within the variable answers inside of the .then statement
    inquirer.prompt([{
      name: "name",
      message: "What is the new player's name?"
    }, {
      name: "position",
      message: "What is the new player's position?"
    }, {
      name: "offense",
      message: "What is the new player's OFFENSE score?"
    }, {
      name: "defense",
      message: "What is the new player's DEFENSE score?"
    }]).then(function(answers) {
      // initializes the variable newguy to be a programmer object which will
      // take in all of the user's answers to the questions above
      var newPlayer = new Player(
        answers.name,
        answers.position,
        parseInt(answers.offense),
        parseInt(answers.defense));
      // pushes newguy object into our array
      playerArray.push(newPlayer);
      // add one to count to increment our recursive loop by one
      count++;
      // run the askquestion function again so as to either end the loop or ask the questions again
      askQuestion();
    });
    // else statement which runs a for loop that will execute .printInfo() for each object inside of our array
  } else {
    for (var x = 0; x < playerArray.length; x++) {
      playerArray[x].printStats();
      teamOffense += parseInt(playerArray[x].offense);
      teamDefense += parseInt(playerArray[x].defense);
      console.log("-------------------");
    }
    console.log(teamOffense);
    console.log(teamDefense);
    playGame();
  }
};

function playGame() {

  if (playGameCount < 10) {
    randomNumber1 = Math.floor(Math.random() * 30) + 1;
    randomNumber2 = Math.floor(Math.random() * 30) + 1;

    if (randomNumber1 < teamOffense) {
      teamScore++;
      console.log("----------------------");
      console.log("The opponent's offense was: " + randomNumber1);
      console.log("You've scored 1 point!");
      console.log("----------------------");
    }
    if (randomNumber2 > teamDefense) {
      teamScore--;
      console.log("----------------------");
      console.log("The opponent's defense was: " + randomNumber2);
      console.log("You've lost 1 point!");
      console.log("----------------------");
    }

    playGameCount++;
    playGame();

  } else {
    console.log("Final Score: " + teamScore);

    if (teamScore >= 0) {
      for (var x = 0; x < playerArray.length; x++) {
        playerArray[x].goodGame();
        console.log("-------------------");
        playerArray[x].printStats();
        console.log("-------------------");
      }
    } else {
      for (var a = 0; a < playerArray.length; a++) {
        playerArray[a].badGame();
        console.log("-------------------");
        playerArray[a].printStats();
        console.log("-------------------");
      }
    }

  }
}

askQuestion();
