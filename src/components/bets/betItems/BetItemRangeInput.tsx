import React, {
    ChangeEvent,
    useState
} from "react";
import styled from "styled-components";
import BetIem, { BetIemProps } from "./BetIem";


const Label = styled.label`
  margin-right: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  margin-right: 10px;
`;


const Value = styled.span`
  margin-right: 10px;
  font-weight: bold;
  font-size: 1.2em;
  padding: 5px;
  border: 1px solid #4285f4;
  border-radius: 5px;
  margin: 5px;
`;

const InputContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
`;

interface BetItemRangeInputProps extends BetIemProps {
    value: number;
    onChange: (value: number) => void;
    minValue?: string;
    maxValue?: string;
    label2?: string;
    minValue2?: string;
    maxValue2?: string;
    value2?: number;
    onChange2?: (value: number) => void;
}

const BetItemRangeInput = ({
                               label,
                               minValue,
                               maxValue,
                               value,
                               onChange,
                               state = "default",
                               label2,
                               minValue2,
                               maxValue2,
                               value2,
                               onChange2,
                               onSetBetClicked,
                               selectedBetValue
                           }: BetItemRangeInputProps) => {

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
    };
    const handleInputChange2 = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange2) {
            onChange2( Number(event.target.value));
        }
    };
    const isDisabled = state === "disabled" || state === "set";


    return (
        <BetIem onSetBetClicked={onSetBetClicked} state={state} selectedBetValue={selectedBetValue}>
            <InputWrapper>
                <InputContainer>
                    <Label htmlFor={label}>{label}</Label>
                    <Input
                        type="range"
                        id={label}
                        min={minValue}
                        max={maxValue}
                        value={value}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                    />
                </InputContainer>
                <Value>{value}</Value>

            </InputWrapper>
            {label2 && minValue2 && maxValue2 && value2 && onChange2 && (
                <InputWrapper>
                    <InputContainer>

                        <Label htmlFor={label2}>{label2}</Label>
                        <Input
                            type="range"
                            id={label2}
                            min={minValue2}
                            max={maxValue2}
                            value={value2}
                            onChange={handleInputChange2}
                            disabled={isDisabled}
                        />
                    </InputContainer>
                    <Value>{value2}</Value>
                </InputWrapper>)}
        </BetIem>
    );
};

export default BetItemRangeInput;
