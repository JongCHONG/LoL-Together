import { RiotInfos } from "../models/User";

export const buildRiotInfos = (
  summonerData: any,
  leagueEntries: any[],
  gameEndTimestamp: number
): RiotInfos => {
  const firstEntry = leagueEntries[0] || {};
  return {
    profileIconId: summonerData.profileIconId,
    summonerLevel: summonerData.summonerLevel,
    queueType: firstEntry.queueType || "N/A",
    tier: firstEntry.tier || "UNRANKED",
    rank: firstEntry.rank || "I",
    leaguePoints: firstEntry.leaguePoints || 0,
    wins: firstEntry.wins || 0,
    losses: firstEntry.losses || 0,
    veteran: firstEntry.veteran || false,
    inactive: firstEntry.inactive || false,
    freshBlood: firstEntry.freshBlood || false,
    hotStreak: firstEntry.hotStreak || false,
    gameEndTimestamp
  };
};
