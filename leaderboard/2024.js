const { rankv2 } = require("../dbs.js");
async function leaderboardv2(page) {
    try {
   const allPlayers = await rankv2();
 allPlayers.sort((a, b) => b.correct - a.correct);
 const start = (page - 1) * 5;
 const end = start + 5;
if (start >= allPlayers.length) {
 return { msg: `There are only ${Math.ceil(allPlayers.length / 5)} total pages.` };
        }     
let rank = `│ [ 🏆 ] • Quiz Global Leaderboard\n│Quiz Started on: 6/30/2023\n│Current Date: ${new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila', month: 'long', day: 'numeric', year: 'numeric' })}\n│Quiz running: ${Math.floor((new Date(new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Manila' })) - new Date("6/30/2024")) / (1000 * 60 * 60 * 24)) + 1}days\n│\n│=======================\n`;        allPlayers.slice(start, end).forEach((player, i) => {
 rank += `│Rank #${start + i + 1}.\n│「${player.name}」\n│Correct answers: ${player.correct}\n│Wrong answers: ${player.wrong}\n│Total games: ${player.correct + player.wrong}\n╰──────────────────\n`;
 });
 rank += `Total Players: ${allPlayers.length}\nPages: ${page}/${Math.ceil(allPlayers.length / 5)}\nType {p} leaderboard <page num> to view the next page`; return { msg: rank.trim() };
  } catch (error) {
 console.error("Error fetching leaderboard:", error);
    return error;
   }
}
async function rank(playerid) {
   try {
  const allPlayers = await rankv2();
 allPlayers.sort((a, b) => parseInt(b.correct) - parseInt(a.correct));
 let rank = null;
  for (let i = 0; i < allPlayers.length; i++) {
     if (allPlayers[i].playerid === playerid) {
 rank = i + 1;
     break;
   }
   }
 if (rank === null) {
    return "You are not ranked yet.";
   }
  const player = allPlayers[rank - 1];
 const { name, correct, wrong } = player;
 const totalGames = parseInt(correct) + parseInt(wrong);
const winrate = totalGames > 0 ? (parseInt(correct) / totalGames) * 100 : 0;
const result = `🏆Rank: ${rank}\n\nName: ${name}\nCorrect answers: ${correct}\nWrong answers: ${wrong}\nTotal games: ${totalGames}\nWinrate: ${winrate.toFixed(2)}%`;
return result.trim();
 } catch (error) {
 console.error("Error fetching player data:", error);
 return "Rank db error: " + error;
 }
}
module.exports = { leaderboardv2, rank };