import bronze from "../../assets/emblems/bronze.png";
import silver from "../../assets/emblems/silver.png";
import gold from "../../assets/emblems/gold.png";
import platinum from "../../assets/emblems/platinum.png";
import diamond from "../../assets/emblems/diamond.png";
import master from "../../assets/emblems/master.png";
import grandmaster from "../../assets/emblems/grandmaster.png";
import challenger from "../../assets/emblems/challenger.png";
import emerald from "../../assets/emblems/emerald.png";
import iron from "../../assets/emblems/iron.png";

export const getEmblemByTierRank = (tier: string): string | undefined => {
  switch (tier.toLowerCase()) {
    case "iron":
      return iron;
    case "bronze":
      return bronze;
    case "silver":
      return silver;
    case "gold":
      return gold;
    case "platinum":
      return platinum;
    case "diamond":
      return diamond;
    case "emerald":
      return emerald;
    case "master":
      return master;
    case "grandmaster":
      return grandmaster;
    case "challenger":
      return challenger;
    default:
      console.warn(`Emblem not found for tier: ${tier}}`);
      return undefined;
  }
}
