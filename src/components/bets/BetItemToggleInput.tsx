import styled from "styled-components";
import BetIem, { BetIemProps } from "./BetIem";

const Toggleable = styled.label`
  margin-right: 10px;
`;
const ToggleContainer = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
`;

function BetItemToggleInput({state, label}: BetIemProps) {

    return (
        <BetIem state={state}>
            <ToggleContainer>
                <Toggleable htmlFor="on-podium">{label}</Toggleable>
                <input type="checkbox" id="on-podium" disabled={state === "disabled"}/>
            </ToggleContainer>
        </BetIem>
    );
}

export default BetItemToggleInput;