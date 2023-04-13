import styled from "styled-components";
import BetIem, { BetIemProps } from "./BetIem";
import { ChangeEvent } from "react";
import { BetState } from "../../../types/BetTypes";

const Toggleable = styled.label`
  margin-right: 10px;
`;
const ToggleContainer = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
`;

interface BetItemToggleInputProps extends BetIemProps {
    onChange: (value: boolean) => void;
    value: boolean;
}

function BetItemToggleInput({
                                state,
                                label,
                                onSetBetClicked,
                                onChange,
                                value,
                                selectedBetValue,
                                multiplier
                            }: BetItemToggleInputProps) {

    const onToggleClicked = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    }

    return (
        <BetIem onSetBetClicked={onSetBetClicked} state={state} selectedBetValue={selectedBetValue}
                multiplier={multiplier}>
            <ToggleContainer>
                <Toggleable htmlFor="on-podium">{label}</Toggleable>
                <input type="checkbox" id="on-podium"
                       disabled={state === "disabled" || state === "won" || state === "set"}
                       checked={value}
                       onChange={onToggleClicked}/>
            </ToggleContainer>
        </BetIem>
    );
}

export default BetItemToggleInput;