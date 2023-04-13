import React, { ReactNode } from "react";
import styled from "styled-components";
import { getBetItemBorderColors } from "./utils";
import SetBetButton from "../buttons/SetBetButton";
import CollectWinButton from "../buttons/CollectWinButton";
import { BetState } from "../../../types/BetTypes";

export type BetItemWrapperProps = {
    borderColor: string;
    backgroundColor: string;
    color: string;
    chipBackgroundColor: string;
    setBetButtonBorder: string;
};


const Wrapper = styled.div<BetItemWrapperProps>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 0px;
  text-align: center;
  border-radius: 5px;
  border: 2px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  width: 300px;
`;
const BetItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
 
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Multiplayer = styled.div`
display: flex;
justify-content: center;
 user-select: none;
`;
const Border = styled.div`
margin-top: -1px;
  border-radius: 0 0 5px 5px;
border: 1px solid #000;
padding: 5px;

`;

export interface BetIemProps {
    label?: string;
    children?: ReactNode;
    state: BetState;
    selectedBetValue: number;
    multiplier: number;
    onSetBetClicked: () => void;
}


function BetIem({children, state, onSetBetClicked, selectedBetValue, multiplier}: BetIemProps) {
    const colors = getBetItemBorderColors(state);

    return (
        <Wrapper {...colors}>
            <Multiplayer>
                <Border>
                    Multiplayer x{multiplier}
                </Border>
            </Multiplayer>
            <BetItemWrapper>
                <Container>
                    {children}
                </Container>
                {state != "won" && (
                    <SetBetButton onClick={onSetBetClicked} state={state} selectedBetValue={selectedBetValue}/>
                )}
                {state == "won" && (
                    <CollectWinButton onClick={onSetBetClicked} state={state}/>
                )}
            </BetItemWrapper>

        </Wrapper>
    )
}

export default BetIem;