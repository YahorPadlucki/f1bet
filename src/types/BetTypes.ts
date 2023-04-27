export type BetType =
    | "podiumFinish"
    | "endOfLap1Place"
    | "placeOnLap"
    | "pitOnLap"
    | "gapToLeader";
export type BetState = "default" | "set" | "disabled" | "won" | "lost";
