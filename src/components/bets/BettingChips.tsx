import React, { useState } from "react";
import styled from "styled-components";

interface ChipProps {
    value: number;
    selected: boolean;
    onClick: () => void;
}

const ChipsContainer = styled.div`
    display: flex;
    justify-content: center;
    `;

const ChipWrapper = styled.div<{ selected: boolean }>`
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
`;

export const Chip = styled.div<{ value: number; selected: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  ${(props) =>
    props.selected &&
    `
      box-shadow: 0px 0px 6px #333;
  `}
`;

interface BettingChipsProps {
    onSelect: (value: number) => void;
    selectedValue: number;
}

const BettingChips: React.FC<BettingChipsProps> = ({
                                                       onSelect,
                                                       selectedValue,
                                                   }) => {
    const [chips, setChips] = useState([1, 2, 3, 5, 10, 50]);
    const [selectedChip, setSelectedChip] = useState(selectedValue);

    const handleChipClick = (value: number) => {
        setSelectedChip(value);
        onSelect(value);
    };

    return (
        <ChipsContainer>
            {chips.map((chipValue) => (
                <ChipWrapper
                    key={chipValue}
                    selected={selectedChip === chipValue}
                    onClick={() => handleChipClick(chipValue)}
                >
                    <Chip value={chipValue} selected={selectedChip === chipValue}>
                        {chipValue}$
                    </Chip>
                </ChipWrapper>
            ))}
        </ChipsContainer>

    );
};

export default BettingChips;
