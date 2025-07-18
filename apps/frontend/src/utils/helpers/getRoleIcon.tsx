import top_icon from "../../assets/role_icon/Top_icon.png";
import jungle_icon from "../../assets/role_icon/Jungle_icon.png";
import middle_icon from "../../assets/role_icon/Middle_icon.png";
import bottom_icon from "../../assets/role_icon/Bottom_icon.png";
import support_icon from "../../assets/role_icon/Support_icon.png";

export const getRoleIcon = (role: string) => {
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