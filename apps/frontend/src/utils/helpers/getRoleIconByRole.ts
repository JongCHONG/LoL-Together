import top_icon from "../../assets/icon_roles/Top_icon.png";
import jungle_icon from "../../assets/icon_roles/Jungle_icon.png";
import middle_icon from "../../assets/icon_roles/Middle_icon.png";
import bottom_icon from "../../assets/icon_roles/Bottom_icon.png";
import support_icon from "../../assets/icon_roles/Support_icon.png";

type Role = "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";

export const getRoleIconByRole = (role: Role) => {
  switch (role) {
    case "TOP":
      return top_icon;
    case "JUNGLE":
      return jungle_icon;
    case "MID":
      return middle_icon;
    case "ADC":
      return bottom_icon;
    case "SUPPORT":
      return support_icon;
    default:
      return null;
  }
};