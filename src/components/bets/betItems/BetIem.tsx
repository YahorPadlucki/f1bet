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


export const BetItemWrapper = styled.div<BetItemWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  width: 300px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface BetIemProps {
    label?: string;
    children?: ReactNode;
    state: BetState;
    selectedBetValue: number;
    onSetBetClicked: () => void;
}


function BetIem({children, state, onSetBetClicked, selectedBetValue}: BetIemProps) {
    const colors = getBetItemBorderColors(state);

    return (
        <BetItemWrapper {...colors}>
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
    )
}

export default BetIem;