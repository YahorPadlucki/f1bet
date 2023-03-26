import React from "react";
import styled from "styled-components";

interface ControlPanelProps {
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

function ControlPanel({ onStart, onPause, onReset }: ControlPanelProps) {
    return (
        <Container>
            <Button onClick={onStart}>Start Race</Button>
            <Button onClick={onPause}>Pause Race</Button>
            <Button onClick={onReset}>Reset Race</Button>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #00c5ff;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;

  &:hover {
    background-color: #00a3d3;
  }
`;

export default ControlPanel;