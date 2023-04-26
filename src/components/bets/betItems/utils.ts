import { BetState } from "../../../types/BetTypes";

export const getBetItemBorderColors = (state: BetState) => {
    switch (state) {
        case "set":
            return {
                borderColor: "#0095ff",
                backgroundColor: "#e6f7ff",
                color: "#1669a8",
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
                backgroundColor: "#8ffd87",
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

export const getTeamColorByDriverId = (driverId: string):string => {
    switch (driverId) {
        case "hamilton":
        case "bottas":
            return "#00D2BE";
        case "raikkonen":
        case "giovinazzi":
            return "#900000"
        case "leclerc":
        case "vettel":
            return "#DC0000"
        case "grosjean":
        case "kevin_magnussen":
            return "#bdbbbb"
        case "norris":
        case "sainz":
            return "#FF8700"
        case "perez":
        case "stroll":
            return "#F363B9"
        case "max_verstappen":
        case "gasly":
            return "#0600EF"
        case "ricciardo":
        case "hulkenberg":
            return "#FFF500"
        case "albon":
        case "kvyat":
            return "#469BFF"
        case "russell":
        case "kubica":
            return "#005AFF"

    }
    return "#FFFFFF";
}




/**
 * Converts minute:seconds.mili to seconds at racing precision.
 * @param time (String) The racing time
 * @returns (Number) Total number of seconds
 */
export function parseTime(time: string):number {
    return (
        parseInt(time.slice(0, time.indexOf(":"))) * 60 +
        parseInt(time.slice(time.indexOf(":") + 1, time.indexOf("."))) +
        parseInt(time.slice(time.indexOf(".") + 1)) * 1e-3
    );
}

/**
 * Calculate the time to the leader
 * @param leaderTime (Number) Time of the leader in seconds
 * @param time (Number) Time of the driver
 * @returns (Number) Number of seconds to leader
 */

export function calcTimeToLeader(leaderTime:number, time:number) {
    return Math.round((time - leaderTime + Number.EPSILON) * 1000) / 1000;
}

/**
 * Converts a time in seconds.miliseconds to a string minute:seconds.mili.
 * @param time (Number) The racing time
 * @returns (String) Total number of seconds
 */
export function timeToString(time:number):string {
    const timeString = time + "";
    let numMili = "000";
    if (timeString.includes(".")) {
        numMili = timeString.slice(timeString.indexOf(".") + 1);
        for (let i = numMili.length; i < 3; i++) {
            numMili += "0";
        }
    }

    const numSeconds = Math.trunc(time % 60);
    let numMinutes = Math.trunc(time / 60);
    if (numMinutes > 60) {
        const numHours = Math.trunc(numMinutes / 60);
        numMinutes = numMinutes - numHours * 60;
        return numHours + ":" + numMinutes + ":" + numSeconds + "." + numMili;
    }
    if (numMinutes > 0) {
        return numMinutes + ":" + numSeconds + "." + numMili;
    } else {
        return numSeconds + "." + numMili;
    }
}
