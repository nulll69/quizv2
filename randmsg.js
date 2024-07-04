const correct = [
  "Nice one, {name}! You got the right answer and won {reward}🎉",
 "Congrats, {name}! That's the correct answer! You won {reward}!🎉",
  "Well done, {name}! You nailed it and earned yourself {reward}🎉",
  "You're on fire, {name}! Correct answer means a {reward}",
  "Amazing job, {name}! Get ready to enjoy a {reward} reward for your correct answer!🎉",
"Great job, {name}! You answered correctly and earned {reward}!🎉",
"Fantastic work, {name}! You've won {reward} for your correct answer!🎉",
"Bravo, {name}! That's the right answer and you've earned {reward}!🎉",
  "Excellent job, {name}! Correct answer means a {reward} reward for you!🎉",
  "Well played, {name}! You got it right and won {reward}!🎉",
  "Congratulations, {name}! You've scored a {reward} reward for your correct answer!🎉",
  "Way to go, {name}! You've earned yourself {reward} for answering correctly!🎉",
  "Awesome, {name}! You got it right and won {reward}!🎉",
"Superb, {name}! Your correct answer has earned you {reward}!🎉",
"Well answered, {name}! Enjoy your {reward} reward for getting it right!🎉"
];

const wrong = [
  "Oops! That's not quite right, {name}. Keep trying!",
  "Hmm, that's not the correct answer, {name}. Give it another shot!",
  "Not quite there yet, {name}. Keep guessing!",
  "Close, but not quite right, {name}. Try again!",
  "That's not the answer we're looking for, {name}. Keep guessing!",
 "Sorry, {name}, that's not the correct answer. Give it another try!",
"Almost there, {name}, but not quite right. Keep guessing!",
"Not the right answer, {name}. Keep trying!",
"Oops! That's not the correct answer, {name}. Try again!",
"Sorry, {name}, but that's not it. Keep guessing!"
];
function randMessage(msg) {
 const messages = msg ? correct : wrong;
const message = messages[Math.floor(Math.random() * messages.length)];
return message;
}
module.exports = randMessage;