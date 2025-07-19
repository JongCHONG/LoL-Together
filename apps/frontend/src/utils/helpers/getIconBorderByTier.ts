import BronzeIconBorder from "../../assets/icon_borders/Bronze_Summoner_Icon_Border.png";
import ChallengerIconBorder from "../../assets/icon_borders/Challenger_Summoner_Icon_Border.png";
import DiamondIconBorder from "../../assets/icon_borders/Diamond_Summoner_Icon_Border.png";
import EmeraldIconBorder from "../../assets/icon_borders/Emerald_Summoner_Icon_Border.png";
import GoldIconBorder from "../../assets/icon_borders/Gold_Summoner_Icon_Border.png";
import GrandmasterIconBorder from "../../assets/icon_borders/Grandmaster_Summoner_Icon_Border.png";
import IronIconBorder from "../../assets/icon_borders/Iron_Summoner_Icon_Border.png";
import MasterIconBorder from "../../assets/icon_borders/Master_Summoner_Icon_Border.png";
import PlatinumIconBorder from "../../assets/icon_borders/Platinum_Summoner_Icon_Border.png";
import SilverIconBorder from "../../assets/icon_borders/Silver_Summoner_Icon_Border.png";

export type Tier =
  | "IRON"
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "PLATINUM"
  | "EMERALD"
  | "DIAMOND"
  | "MASTER"
  | "GRANDMASTER"
  | "CHALLENGER";

export const getIconBorderByTier = (tier: Tier) => {
  switch (tier) {
    case "IRON":
      return IronIconBorder;
    case "BRONZE":
      return BronzeIconBorder;
    case "SILVER":
      return SilverIconBorder;
    case "GOLD":
      return GoldIconBorder;
    case "PLATINUM":
      return PlatinumIconBorder;
    case "EMERALD":
      return EmeraldIconBorder;
    case "DIAMOND":
      return DiamondIconBorder;
    case "MASTER":
      return MasterIconBorder;
    case "GRANDMASTER":
      return GrandmasterIconBorder;
    case "CHALLENGER":
      return ChallengerIconBorder;
    default:
      return null;
  }
};
