import styled from "styled-components";
import React from "react";
import { BetItemWrapperProps } from "../betItems/BetIem";
import { getBetItemBorderColors } from "../betItems/utils";
import { BetState } from "../../../types/BetTypes";

const BetButton = styled.div<BetItemWrapperProps & { disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.setBetButtonBorder};
  padding: 3px;
  border-radius: 5px;
   cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const BetValue = styled.div<BetItemWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 3px;
  font-weight: bold;
  color: #333;
  font-size: 14px;
  margin: 10px;
  color: white;
  background-color: ${(props) => props.chipBackgroundColor};
  border-radius: 50%;
  border: 2px dashed  ${(props) => props.color};;
`;

const SetBetLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};

`;
type SetBetButtonProps = {
    state: BetState;
    onClick: () => void;
    selectedBetValue: number;
}

function SetBetButton({state, onClick, selectedBetValue}: SetBetButtonProps) {

    const isDisabled = state === "disabled" || state === "set";

    const handleClick = () => {
        if (!isDisabled)
            onClick();
    }

    const colors = getBetItemBorderColors(state);

    return (
        <BetButton {...colors} disabled={isDisabled} onClick={handleClick}>
            <BetValue {...colors}>{selectedBetValue}$</BetValue>
            {state == "default" && (
                <SetBetLabel>Set Bet</SetBetLabel>
            )}
        </BetButton>
    );
}


export default SetBetButton;