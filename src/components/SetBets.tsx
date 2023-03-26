import styled from "styled-components";
import {
    ChangeEvent,
    useState
} from "react";

const SetBetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  text-align: left;
  justify-content: center;
  align-items: center;
`;


const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const Togglelabel = styled.label`
  margin-right: 1rem;
`;


const SetBets = () => {
    const [placesGainedLost, setPlacesGainedLost] = useState(0);

    const handlePlacesGainedLostChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPlacesGainedLost(Number(event.target.value));
    };
    return (
        <SetBetsWrapper>
            <InputWrapper>
                <label htmlFor="places-gained-lost">Places gained/lost on race start:</label>
                <input type="range" id="places-gained-lost" min="-10" max="10" value={placesGainedLost}
                       onChange={handlePlacesGainedLostChange}/>
                <span>{placesGainedLost}</span>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="place-on-lap-x">Place on lap X:</label>
                <input type="text" id="place-on-lap-x"/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="gap-to-leader">Gap to leader on lap X:</label>
                <input type="range" id="gap-to-leader" min="-10" max="10"/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="pit-on-lap-x">Driver will pit on lap X:</label>
                <input type="text" id="pit-on-lap-x"/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="team-points-x">Team points X on lap X:</label>
                <input type="number" id="team-points-x" min="0" max="100"/>
                <input type="number" id="lap-x" min="1" max="100"/>
            </InputWrapper>
            <ToggleWrapper>
                <Togglelabel htmlFor="on-podium">Driver will be on podium:</Togglelabel>
                <input type="checkbox" id="on-podium"/>
            </ToggleWrapper>
        </SetBetsWrapper>
    );
};

export default SetBets;
