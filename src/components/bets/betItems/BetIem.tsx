import React, {
    ReactNode,
    useState
} from "react";
import styled from "styled-components";
import { getBetItemBorderColors } from "./utils";
import SetBetButton from "../buttons/SetBetButton";
import CollectWinButton from "../buttons/CollectWinButton";
import { BetState } from "../../../types/BetTypes";
import ConfettiExplosion from "react-confetti-explosion";

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
    position: relative;
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
const Border = styled.div<{ borderColor: string }>`
margin-top: -1px;
  border-radius: 0 0 5px 5px;
border: 1px solid ${({borderColor}) => borderColor};
padding: 5px;
`;


const BetTypeText = styled.div`
  position: absolute;
  top: 50%;
  font-weight: bold;
  left: -25px; 
  transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl; 
`;
const ButtonWrapper = styled.div`
  position: relative;
`;


const Particle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export interface BetIemProps {
    label?: string;
    typeLabel?: string;
    children?: ReactNode;
    state: BetState;
    selectedBetValue: number;
    multiplier: number;
    onSetBetClicked: () => void;
    onWinCollectClicked: () => void;
    winValue: number;
}


function BetIem({
                    children,
                    state,
                    onSetBetClicked,
                    selectedBetValue,
                    multiplier,
                    winValue,
                    onWinCollectClicked,
                    typeLabel
                }: BetIemProps) {
    const colors = getBetItemBorderColors(state);
    const [isExploding, setExploding] = useState(false);

    function onWinCollectClickedClick() {
        setExploding(true);
        onWinCollectClicked();
    }

    return (
        <>
            <Wrapper {...colors}>
                <Multiplayer>
                    <Border borderColor={colors.borderColor}>
                        Multiplayer x{multiplier}
                    </Border>
                </Multiplayer>
                <BetItemWrapper>
                    <Container>
                        {children}
                    </Container>
                    <ButtonWrapper>
                        {state != "won" && (
                            <SetBetButton onClick={onSetBetClicked} state={multiplier > 1 ? state : 'disabled'}
                                          selectedBetValue={selectedBetValue}/>
                        )}
                        {state == "won" && (
                            <CollectWinButton onClick={onWinCollectClickedClick} state={state} winValue={winValue}/>
                        )}
                        {isExploding && <Particle><ConfettiExplosion zIndex={999}/></Particle>}
                    </ButtonWrapper>
                </BetItemWrapper>
                <BetTypeText>{typeLabel}</BetTypeText>
            </Wrapper>

        </>
    )
}

export default BetIem;