import { BetState } from "../../../types/BetTypes";

export const getBetItemBorderColors = (state: BetState) => {
    switch (state) {
        case "set":
            return {
                borderColor: "#0095ff",
                backgroundColor: "#e6f7ff",
                color: "#000000",
                chipBackgroundColor: "#0095ff",
                setBetButtonBorder: "#0095ff"
            };
        case "disabled":
            return {
                borderColor: "#d9d9d9",
                backgroundColor: "#f2f2f2",
                color: "#8c8c8c",
                chipBackgroundColor: "#d9d9d9",
                setBetButtonBorder: "#d9d9d9"
            };
        case "won":
            return {
                borderColor: "#5cb85c",
                backgroundColor: "#f2f2f2",
                color: "#000000",
                chipBackgroundColor: "#5cb85c",
                setBetButtonBorder: "#0095ff"
            };
        default:
            return {
                borderColor: "#000000",
                backgroundColor: "#ffffff",
                color: "#000000",
                chipBackgroundColor: "#5cb85c",
                setBetButtonBorder: "#5cb85c"
            };
    }
};
