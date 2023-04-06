import React, { ReactNode } from "react";
import styled from "styled-components";
import { getBetItemBorderColors } from "./utils";
import SetBetButton from "./SetBetButton";

export type BetItemState = "default" | "active" | "disabled";

export interface BetIemProps {
    label?: string;
    children?: ReactNode;
    state: BetItemState;
}

export type BetItemWrapperProps = {
    borderColor: string;
    backgroundColor: string;
    color: string;
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

function BetIem({children, state}: BetIemProps) {
    const colors = getBetItemBorderColors(state);

    return (
        <BetItemWrapper {...colors}>
            <Container>
                {children}
            </Container>
            <SetBetButton colors={colors}/>
        </BetItemWrapper>
    )
}

export default BetIem;