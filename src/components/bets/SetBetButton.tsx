import styled from "styled-components";
import React from "react";
import { BetItemWrapperProps } from "./BetIem";

type SetBetButtonProps = {
    colors: BetItemWrapperProps;
}
const BetButton = styled.div<BetItemWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.borderColor};
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;
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
  margin-top: 10px;
  color: white;
  background-color: ${(props) => props.borderColor};
  border-radius: 50%;
`;

const SetBetLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  color: ${(props) => props.color};

`;

function SetBetButton({colors}: SetBetButtonProps) {
    return (
        <BetButton {...colors}>
            <BetValue {...colors}>{50}$</BetValue>
            <SetBetLabel>Set Bet</SetBetLabel>
        </BetButton>
    );
}


export default SetBetButton;