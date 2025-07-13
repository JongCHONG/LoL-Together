import axios from "axios";

export class RiotService {
  static async getAccountByRiotId(riotId: string, tagline: string) {
    // puuid, gameName, tagLine
    try {
      const response = await axios.get(
        `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId}/${tagline}`,
        { headers: { "X-Riot-Token": process.env.RIOT_API_KEY } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Riot account fetch failed: ${error.message}`);
    }
  }

  static async getSummonerByPuuid(puuid: string) {
    // id, accountId, puuid, profileIconId, revisionDate, summonerLevel

    try {
      const response = await axios.get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
        { headers: { "X-Riot-Token": process.env.RIOT_API_KEY } }
      );      
      return response.data;
    } catch (error: any) {
      throw new Error(`Summoner fetch failed: ${error.message}`);
    }
  }

  static async getListMatchesByPuuid(puuid: string) {
    try {
      const response = await axios.get(
        `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`,
        { headers: { "X-Riot-Token": process.env.RIOT_API_KEY } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`List of matches fetch failed: ${error.message}`);
    }
  }

  static async getMatchById(matchid: string) {
    try {
      const response = await axios.get(
        `https://europe.api.riotgames.com/lol/match/v5/matches/${matchid}`,
        { headers: { "X-Riot-Token": process.env.RIOT_API_KEY } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Match's details fetch failed: ${error.message}`);
    }
  }

  static async getLeagueEntries(puuid: string) {
    // leagueId, queueType, tier, rank, summonerId, puuid, leaguePoints, wins, losses, veteran, inactive, freshBlood, hotStreak
    try {
      const response = await axios.get(
        `https://euw1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
        { headers: { "X-Riot-Token": process.env.RIOT_API_KEY } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`League entries fetch failed: ${error.message}`);
    }
  }
}
