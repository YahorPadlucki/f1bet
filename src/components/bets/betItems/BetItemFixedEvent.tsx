import styled from "styled-components";
import BetIem, { BetIemProps } from "./BetIem";
import { type FC } from "react";

const Label = styled.label`
  padding-left: 50px;
  font-size: 20px;
`;

const BetItemFixedEvent: FC<BetIemProps> = ({
                                                state,
                                                label,
                                                typeLabel,
                                                onSetBetClicked,
                                                selectedBetValue,
                                                multiplier,
                                                winValue,
                                                onWinCollectClicked,
                                            }: BetIemProps) => {
    return (
        <BetIem
            onSetBetClicked={onSetBetClicked}
            state={state}
            selectedBetValue={selectedBetValue}
            multiplier={multiplier}
            winValue={winValue}
            onWinCollectClicked={onWinCollectClicked}
            typeLabel={typeLabel}
        >
            <Label>{label}</Label>
        </BetIem>
    );
};

export default BetItemFixedEvent;
