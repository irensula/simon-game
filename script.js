let buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

//a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//a new variable called level and start at level 0.
var level = 0;

//detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
	if (!started) {

	//The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
	$("#level-title").text("Level " + level);
	nextSequence();
	started = true;
	}
});

$('.btn').click(function(){
	let userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	//Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
	checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
	//an if statement to check if the most recent user answer is the same as the game pattern.
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      //if the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

	} else {

		//play sound wrong.mp3 if the user got one of the answers wrong.
		playSound('wrong');
		$('body').addClass('game-over');
		$("#level-title").text("Game Over, Press Any Key to Restart");
		
		setTimeout(function () {
			$('body').removeClass("game-over");
			}, 200);
		startOver();
		}
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//////
function nextSequence() {
  userClickedPattern = [];
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

function playSound(name){
	var audio = new Audio('sounds/' + name + '.mp3');
	audio.play();
}
function animatePress(currentColor){
	$('#' + currentColor).addClass('pressed');
	
	setTimeout(function () {
	$("#" + currentColor).removeClass("pressed");
	}, 100);
}
function startOver(){
	//reset the values of level, gamePattern and started variables.
	level.reset();
	gamePattern.reset();
	started.reset();
}







