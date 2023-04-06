export const getBetItemBorderColors = (state: "default" | "active" | "disabled") => {
    switch (state) {
        case "active":
            return {borderColor: "blue", backgroundColor: "#e6f7ff", color: "black"};
        case "disabled":
            return {borderColor: "gray", backgroundColor: "#f2f2f2", color: "gray"};
        default:
            return {borderColor: "lightgray", backgroundColor: "white", color: "black"};
    }
};
