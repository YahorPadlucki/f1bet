import React, {
    ChangeEvent,
    useState
} from "react";
import styled from "styled-components";
import BetIem, { BetIemProps } from "./BetIem";

interface BetItemRangeInputProps extends BetIemProps {
    minValue?: string;
    maxValue?: string;
    defaultVal?: string;
    onChange?: (value: string) => void;
    label2?: string;
    minValue2?: string;
    maxValue2?: string;
    defaultVal2?: string;
    onChange2?: (value: string) => void;
}

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


const BetItemRangeInput = ({
                               label,
                               minValue,
                               maxValue,
                               defaultVal,
                               onChange,
                               state = "active",
                               label2,
                               minValue2,
                               maxValue2,
                               defaultVal2,
                               onChange2,
                           }: BetItemRangeInputProps) => {
    const [value, setValue] = useState(defaultVal ?? "");
    const [value2, setValue2] = useState(defaultVal2 ?? "");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };
    const handleInputChange2 = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue2(newValue);
        if (onChange2) {
            onChange2(newValue);
        }
    };


    return (
        <BetIem state={state}>
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
                        disabled={state === "disabled"}
                    />
                </InputContainer>
                <Value>{value}</Value>

            </InputWrapper>
            {label2 && minValue2 && maxValue2 && defaultVal2 && onChange2 && (
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
                            disabled={state === "disabled"}
                        />
                    </InputContainer>
                    <Value>{value2}</Value>
                </InputWrapper>)}
        </BetIem>
    );
};

export default BetItemRangeInput;
