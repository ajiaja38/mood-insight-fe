import type { ThemeConfig } from "antd"
import { COLOR } from "../utils/constant/color.constant"

export const customMainTheme: ThemeConfig = {
  token: {
    colorPrimary: COLOR.primary,
  },
  components: {
    Menu: {
      darkSubMenuItemBg: "transparent",
      darkItemHoverBg: COLOR.tertiary,
    },
    Layout: {
      colorBgLayout: "#f1f5f9",
    },
  },
}
