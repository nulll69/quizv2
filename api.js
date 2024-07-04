const express = require('express');
const app = express();
const {  leaderboardv1 } = require('./leaderboard/2023');
const { leaderboardv2, rank } = require('./leaderboard/2024');
const { addPlayerv2, correct, wrong, QuizGame, аddQuestion, categoryList } = require('./dbs.js');
const rand = require("./randmsg");
const Port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/quiz', async (req, res) => {
 const { category, playerid, name } = req.body;
if (!playerid || !name)
return res.json({ msg: "Missing params" });
const categs = await categoryList();
const msg = `Please add a category Here's the list of categories:\n==============\n${categs.join('\n')}\n==============\nExample usage:\n{p} ${categs[Math.floor(Math.random() * categs.length)]}\n{p} rank >> view your quiz rank\n{p} leaderboard >> view the top players\n{p} leaderboardv1 >> view 2023 leaderboard`;
return !category ? res.json({ msg }) :
category.startsWith('rank') ? res.json({ msg: await rank(playerid) }) : category.startsWith('leaderboardv1') ? res.json(await leaderboardv1(parseInt(category.split('leaderboardv1')[1], 10) || 1).catch(() => ({ error: 'Failed to fetch leaderboard.' }))) :
category.startsWith('leaderboard') ? res.json(await leaderboardv2(parseInt(category.split('leaderboard')[1], 10) || 1).catch(() => ({ error: 'Failed to fetch leaderboard.' }))) :
!categs.includes(category.toLowerCase()) ? res.json({ msg }) :
(async () => {
try {
const { question, link, answer } = await QuizGame(category.toLowerCase());
const text = category === "country" ? "Guess this country's name\n======================\n\n" + question :
category === "anime" ? "Guess this character's name\n====================\n\n" + question : category === "torf" ? "React only to answer\n\n" + question + "\n😆: true 😠: false\n" : "Please reply your answer with the letter only\n=========================\n\n" + question;
const response = { question: text, answer };
if (link) response.link = link;
res.json(response);
addPlayerv2(playerid, name).catch(err => console.error('Failed to add player to fuckin database:', err));
   } catch (error) {
 res.status(500).json({ error: 'Failed to fetch question.\n' + error.message });
  }
 })();
});   
//adding players score. Leaderboard database endpoint. Anyone doing unusual activity will automatically delete its entire data on database and also will get ban. Please be fair
app.put('/scores', async (req, res) => {
const { playerid, option } = req.body;
try {
 let message;
message = option === 'correct' ? (await correct(playerid), rand(correct)) : option === 'wrong' ? (await wrong(playerid), rand(wrong)) : "!?";
res.json({ message });
  } catch (error) {
res.status(500).json({ error: error.message });
 }
});
//normal fetching question endpoint 
app.get('/quiz/:category', async (req, res) => {
const category = req.params.category.toLowerCase();
  const categs = await categoryList();
if (!categs.includes(category)) {
 return res.status(400).json({ 
 error: `Invalid category "${category}". Here's the list of available categories:\n\n${categs.join("\n")}`
});
}
 res.status(200).json(await QuizGame(category));
});
/*
endpoint for adding question 
adding question here requires permission:)
baka kasi ano ano lang i add nyo sa db ko
*/
app.post('/addq', async (req, res) => {
    const { category, question, answer, apikey } = req.body;
    return res.status(200).json(await addQuestion(category, question, answer, apikey));
});
app.listen(Port, () => {
console.log(`Server is live on port ${Port}`);
});