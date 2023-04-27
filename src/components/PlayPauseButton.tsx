import {
    type FC,
    useState
} from "react";
import styled from "styled-components";

interface PlayPauseButtonProps {
    onClick: (isPlaying: boolean) => void;
}

const PlayPauseButton: FC<PlayPauseButtonProps> = ({onClick}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleButtonClick = () => {
        const newIsPlaying = !isPlaying;
        setIsPlaying(newIsPlaying);
        onClick(newIsPlaying);
    };

    return (
        <ButtonContainer onClick={handleButtonClick} isPlaying={isPlaying}>
            {isPlaying ? "||" : ">"}
        </ButtonContainer>
    );
};

interface ButtonContainerProps {
    isPlaying: boolean;
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background-color: ${({isPlaying}) => (isPlaying ? "red" : "green")};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }
`;

export default PlayPauseButton;
