import React from "react";
import styled from "styled-components";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    getAllChips,
    selectedChipValue,
    setChip
} from "../../store/reducers/chipsReducer";

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
      z-index: 1;

  margin: 0 5px;
  cursor: pointer;
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
  
`;

export const Chip = styled.div<{ value: number; selected: boolean }>`
  position: relative;
  display: block;
  margin: 15px auto;
  width: 50px;
  height: 50px;
  border: 7px dashed white;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  font-family: Helvetica;
  color: white;

  &:before {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: -8px;
    border-radius: 50%;
    background: green;
    content: '';

  }

  &:after {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 3px;
    border: 2px dashed white;
    border-radius: 50%;
    background: rgba(0,0,0,0.4);

    content: '';
  }
  ${(props) =>
    props.selected &&
    
    ` box-shadow: 0px 0px 6px #333;
  `}
`;


const BettingChips: React.FC = () => {

    const dispatch = useDispatch();
    const chips = useSelector(getAllChips);
    const selectedChip = useSelector(selectedChipValue);

    const handleChipClick = (value: number) => {
        dispatch(setChip({chipValue: value}))
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
