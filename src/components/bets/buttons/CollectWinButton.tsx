import styled from "styled-components";
import React, { FC } from "react";

const CollectButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  padding: 3px;
  border-radius: 5px;
  background-color: #5CB85CFF;
  cursor: pointer;
`;

const WinValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  font-weight: bold;
  color: #333;
  font-size: 16px;
  margin: 5px;
  color: white;
`;

const SetBetLabel = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;

`;
type CollectWinProps = {
    winValue: number;
    onClick: () => void;
}

const CollectWinButton: FC<CollectWinProps> = ({winValue, onClick}) => {
    const handleClick = () => {
        onClick();
    }

    return (
        <CollectButton onClick={handleClick}>
            <WinValue>{winValue}$</WinValue>
            <SetBetLabel>Collect</SetBetLabel>
        </CollectButton>
    );
}

export default CollectWinButton;