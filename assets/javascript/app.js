// $(document).ready(function() is needed to encapsulate the javascript variables, properties, functions as well as the event listners that will be executed through the document ready function

$(document).ready(function () {

  // create a variable for the triviaGame. 

  //In my trivia game I am presenting a quote and the player will guess if the quote came from Jack Handey's deep thoughts or from Shower thoughts on Reddit.  
  //The triviaGame will contain properties for the quotes, the options, the and the correct answer. 
  //Functions will need to be executed to start the game (& event listner to activate the function when a button is pressed).  These functions should include a start function (to set the starting point for the game displaying the game properties not on the start screen and hiding the start button), a nextQuote function ( this function is to load the quotes and options for review to the screen and to trigger the timer to load at 10 sec once the quote is loaded,display this amount in html, and count down in 1 second intervals), a timerRunning function (to keep the clock counting down until it reaches 0 **set to -1 to have clock stop at 0, and set rules to display results, take actions once 0 is met), an option review function (to adjust totals, provide results for the option selected on click event), guess Result (resets the timer, clears the old result, options and is the trigger for the next quote function).

  //I did think there should be a quicker way to load the options since they are all the same but none of the methods I tried worked so I defaulted to typing them out and copying them for each quote

  var triviaGame = {
    quotes: {
      quoteOne: "Before you criticize someone, you should walk a mile in their shoes. That way when you criticize them, you are a mile away from them and you have their shoes.",
      quoteTwo: "If you work on a lobster boat, sneaking up behind someone and pinching him is probably a joke that gets old real fast.",
      quoteThree: "The sentence 'Don't objectify women' has 'women' as the object of the sentence.",
      quoteFour: "If your friend is already dead, and being eaten by vultures, I think it's okay to feed some bits of your friend to one of the vultures, to teach him to do some tricks. But ONLY if you're serious about adopting the vulture.",
      quoteFive: "Sometimes I wonder if I'm patriotic enough. Yes, I want to kill people, but on both sides.",
      quoteSix: "On the other hand, you have different fingers",
      quoteSeven: "The olympics is the only time when you hear 'Great execution by North Korea' and it seems okay.",
      quoteEight: "Apparently, a lemon is not naturally occurring and is a hybrid developed by cross breeding a bitter orange and a citron. Life never gave us lemons; we invented them all by ourselves."
    },
    options: {
      quoteOne: ["Deep Thoughts", "Shower Thoughts"],
      quoteTwo: ["Deep Thoughts", "Shower Thoughts"],
      quoteThree: ["Deep Thoughts", "Shower Thoughts"],
      quoteFour: ["Deep Thoughts", "Shower Thoughts"],
      quoteFive: ["Deep Thoughts", "Shower Thoughts"],
      quoteSix: ["Deep Thoughts", "Shower Thoughts"],
      quoteSeven: ["Deep Thoughts", "Shower Thoughts"],
      quoteEight: ["Deep Thoughts", "Shower Thoughts"]
    },
    answers: {
      quoteOne: "Deep Thoughts",
      quoteTwo: "Deep Thoughts",
      quoteThree: "Shower Thoughts",
      quoteFour: "Deep Thoughts",
      quoteFive: "Deep Thoughts",
      quoteSix: "Deep Thoughts",
      quoteSeven: "Shower Thoughts",
      quoteEight: "Shower Thoughts"
    },

    // START FUNCTION - set the starting point for the game displaying the game properties (the array of quotes is reset to pull from the first place at 0, correct, incorrect and unanswered tallies are set back to 0 and the not on the start screen and hiding the start button and the timerId interval is cleared.  The game, results, timer and remainingTime ids are set to load to html. the start button is hidden and the nextQuote function is triggered.

    start: function () {
      console.log("start");
      triviaGame.currentSet = 0;
      triviaGame.correct = 0;
      triviaGame.incorrect = 0;
      triviaGame.unanswered = 0;
      clearInterval(triviaGame.timerId);

      $('#game').show();

      $('#results').html('');

      $('#timer').text(triviaGame.timer);

      $('#startButton').hide();

      $('#remainingTime').show();

      triviaGame.nextQuote();
    },

    //NEXTQUOTE - this function is to load the quotes and options(creating a button for each option)for review to the screen(html) and to trigger the timer to load at 10 sec once the quote is loaded,display this amount in html, and count down in 1 second intervals when timer is running.

    nextQuote: function () {
      console.log("quote");
      triviaGame.timer = 10;
      $('#timer').text(triviaGame.timer);

      if (!triviaGame.timerOn) {
        triviaGame.timerId = setInterval(triviaGame.timerRunning, 1000);
      }

      var quoteContent = Object.values(triviaGame.quotes)[triviaGame.currentSet];
      $('#quote').text(quoteContent);

      var quoteOptions = Object.values(triviaGame.options)[triviaGame.currentSet];
      console.log("quoteOptions", quoteOptions)

      $("#options").empty();
      $.each(quoteOptions, function (index, key) {
        $('#options').append($('<button class="loadOption btn btn-info btn-lg">' + key + '</button>'));
      })

    },

    //TIMERRUNNING -  to keep the clock counting down until it reaches 0 **set to -1 to have clock stop at 0.  If zero is not met the clock with continue to count down, once met the unanswered count goes up by one, the interval timerId is cleared and a 1 second timeout is called while the result displays and the next quote in the array is selected.  If there are no more quotes in the array the final results of correct, incorrect and unanswered are displayed with a request to play again and the game display from the array is cleared with the start button reappearing.

    timerRunning: function () {
      console.log("timer");
      if (triviaGame.timer > -1 && triviaGame.currentSet < Object.keys(triviaGame.quotes).length) {
        $('#timer').text(triviaGame.timer);
        triviaGame.timer--;
      }
      else if (triviaGame.timer === -1) {
        triviaGame.unanswered++;
        triviaGame.result = false;
        clearInterval(triviaGame.timerId);
        resultId = setTimeout(triviaGame.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was ' + Object.values(triviaGame.answers)[triviaGame.currentSet] + '</h3>');
      }
      else if (triviaGame.currentSet === Object.keys(triviaGame.quotes).length) {
        $('#results')
          .html('<h3>Thanks for playing.  I know you really dug deep for those answers.</h3>' +
            '<p>Correct: ' + triviaGame.correct + '</p>' +
            '<p>Incorrect: ' + triviaGame.incorrect + '</p>' +
            '<p>Unaswered: ' + triviaGame.unanswered + '</p>' +
            '<p>Think you can beat your score? Please play again!</p>');

        $('#game').hide();

        $('#startButton').show();
      }
    },

    //OPTIONREVIEW - to adjust totals, provide results for the option selected on click event. If correct option is chosen the button turns green(class/bootstrap), the correct answers total increases by one, and a positive results message appears to html and a 1 second timeout is called. If incorrect button turns red, incorrect answers total increases by one, a negative message apears to html and a 1 second timeout is called.

    optionReview: function () {
      console.log("option");

      var resultId;

      var currentAnswer = Object.values(triviaGame.answers)[triviaGame.currentSet];

      if ($(this).text() === currentAnswer) {
        $(this).addClass('btn-success').removeClass('btn-info');

        triviaGame.correct++;
        clearInterval(triviaGame.timerId);
        resultId = setTimeout(triviaGame.guessResult, 1000);
        $('#results').html('<h3>You thought right!</h3>');
      }

      else {
        $(this).addClass('btn-danger').removeClass('btn-info');

        triviaGame.incorrect++;
        clearInterval(triviaGame.timerId);
        resultId = setTimeout(triviaGame.guessResult, 1000);
        $('#results').html('<h3>You thought wrong!</h3>');
      }

    },

    //GUESSRESULT - resets the timer, clears the old result, options and is the trigger for the next quote function

    guessResult: function () {
      console.log("result");

      triviaGame.currentSet++;

      $('.option').remove();

      $('#results h3').remove();

      triviaGame.nextQuote();
    }

  }
  // EVENT LISTNERS -  will hide time remaining to answer quote until the start button is clicked and the options are presented.  Once the start button is clicked the start function is executed.  Once an option button is clicked optionReview function will take action.  Event listners need to be executed after the functions and their parts are defined.

  $("#remainingTime").hide();
  console.log("testEL");
  $("#startButton").on('click', triviaGame.start);
  console.log("testEL2");
  $(document).on('click', '.loadOption', triviaGame.optionReview);
  console.log("testEL3");
})