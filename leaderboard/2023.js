const { rankv1 } = require("../db.js");
async function leaderboardv1(page) {
  try {
   const players = await rankv1();
   const size = 5;
   const start = (page - 1) * size;
    const end = start + size;
 if (start >= players.length) {
  return { msg: `There are only ${Math.ceil(players.length / size)} total pages.` };
  }
players.sort((a, b) => b.correct - a.correct);
 const pagePlayers = players.slice(start, end);
 let msg = `Top Players from 2023\n\n`;
 pagePlayers.forEach((player, i) => {
  const rank = start + i + 1;
 msg += `${rank}. Id: ${player.playerid},\n`;
 msg += `Correct answers: ${player.correct}\n`;
  msg += `Wrong answers: ${player.wrong}\n\n`;
  });
 msg += `Total Players: ${players.length}\nPages: ${pg}/${Math.ceil(players.length / size)}\nType {p} leaderboard <page num> to view the next page`;
   return { msg: msg.trim() };
  } catch (error) {
 console.error("Error fetching leaderboard:", error);
 return { msg: "Error fetching leaderboard." };
    }
}
module.exports = { leaderboardv1 };