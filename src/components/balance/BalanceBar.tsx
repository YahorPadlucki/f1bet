import React, { FC } from 'react';
import styled from 'styled-components';

const BalanceContainer = styled.div`
  background-color: black;
  color: goldenrod;
  width: 100%;
  bottom: 0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
  height:5%;
`;

interface BalanceBarProps {
    balance: number;
}

const BalanceBar: FC<BalanceBarProps> = ({balance}: BalanceBarProps) => {
    return (
        <BalanceContainer>
            Balance: ${balance}
        </BalanceContainer>
    );
};

export default BalanceBar;