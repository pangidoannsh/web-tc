import { ThemeConfig } from "antd";

export const appThemeConfig: ThemeConfig = {
    token: {
        colorPrimary: "#1065AA"
    },
    components: {
        Select: {
            clearBg: "#EEF2F6",
            activeOutlineColor: "transparent",
            optionActiveBg: "#f0f9ff",
            optionSelectedBg: "#e0f2fe",
            optionSelectedColor: "#64748b"
        },
        DatePicker: {
            colorTextPlaceholder: "#94a3b8"
        }
    }
}