import styled from "styled-components";
import { useState } from "react";
import BetItemRangeInput from "./BetItemRangeInput";
import BetItemToggleInput from "./BetItemToggleInput";
import BettingChips from "./BettingChips";

const SetBetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:13px;
`;


const SetBets = () => {
    const [placesGainedLost, setPlacesGainedLost] = useState(0);

    const handlePlacesGainedLostChange = (str: string) => {
        setPlacesGainedLost(Number(str));
    };
    return (

        <SetBetsWrapper>
            <label>Checko</label>
            <label>curren lap: 1/53</label>
            <BetItemRangeInput
                label="End of lap 1 place:"
                minValue="1"
                maxValue="20"
                defaultVal="10"
                onChange={handlePlacesGainedLostChange}
                state="default"
            />

            <BetItemRangeInput
                label="Place:"
                minValue="1"
                maxValue="20"
                defaultVal="5"
                onChange={handlePlacesGainedLostChange}
                label2="OnLap:"
                minValue2="1"
                maxValue2="53"
                defaultVal2="8"
                onChange2={handlePlacesGainedLostChange}
                state="disabled"
            />

            <BetItemRangeInput
                label="Will pit on lap:"
                minValue="1"
                maxValue="53"
                defaultVal="10"
                onChange={handlePlacesGainedLostChange}
                state="active"
            />

            <BetItemRangeInput
                label="Gap to leader:"
                minValue="0"
                maxValue="210"
                defaultVal="5"
                onChange={handlePlacesGainedLostChange}
                label2="OnLap:"
                minValue2="1"
                maxValue2="53"
                defaultVal2="8"
                onChange2={handlePlacesGainedLostChange}
                state="default"
            />

            <BetItemToggleInput label="Podium finish" state={"default"}/>
            <BettingChips selectedValue={1} onSelect={() => console.log("1")}/>
        </SetBetsWrapper>

    );
};

export default SetBets;
