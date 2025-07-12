import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User, { IUser } from "../models/User";
import { buildRiotInfos } from "../helpers/riotHelper";
import { RiotService } from "./RiotService";

export class AuthService {
  static async signUp(
    email: string,
    password: string,
    riot_id: string,
    tagline: string
  ): Promise<{ user: IUser; token: string }> {
    try {
      const account = await RiotService.getAccountByRiotId(riot_id, tagline);
      const summoner = await RiotService.getSummonerByPuuid(account.puuid);
      const lastMatches = await RiotService.getListMatchesByPuuid(
        account.puuid
      );
      const lastMatchDetails = await RiotService.getMatchById(lastMatches[0]);
      const leagueEntries = await RiotService.getLeagueEntries(summoner.id);

      const riot_infos = buildRiotInfos(
        summoner,
        leagueEntries,
        lastMatchDetails.info.gameEndTimestamp
      );
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        password: hashedPassword,
        email,
        riot_id,
        tagline,
        riot_infos,
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return { user, token };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid login");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return { user, token };
  }
}
