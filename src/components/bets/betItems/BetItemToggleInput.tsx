import styled from "styled-components";
import BetIem, { BetIemProps } from "./BetIem";
import {
    ChangeEvent,
    FC
} from "react";

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

const BetItemToggleInput: FC<BetItemToggleInputProps> = ({
                                                             state,
                                                             label,
                                                             typeLabel,
                                                             onSetBetClicked,
                                                             onChange,
                                                             value,
                                                             selectedBetValue,
                                                             multiplier,
                                                             winValue,
                                                             onWinCollectClicked
                                                         }) => {

    const onToggleClicked = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    }

    return (
        <BetIem onSetBetClicked={onSetBetClicked} state={state} selectedBetValue={selectedBetValue}
                multiplier={multiplier} winValue={winValue} onWinCollectClicked={onWinCollectClicked}
                typeLabel={typeLabel}
        >
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