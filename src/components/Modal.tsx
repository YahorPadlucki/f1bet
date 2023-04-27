import {
    FC,
    ReactNode,
    useEffect,
    useState
} from "react";
import styled from "styled-components";

interface Props {
    children: ReactNode;
    isOpened: boolean;
    close: () => void;
}

export const ModalBackground = styled.div`
position:fixed;
z-index:1;
left:0;
top:0;
width:100%;
height:100%;
overflow:auto;
background-color: rgba(0,0,0,0.5)

`
const ModalBody = styled.div`

background-color: white;
  position: absolute;
  top: 5%;
  bottom: 5%;
  left: 0;
  right: 0;
  margin: auto;
  padding: 15px;
  width: 55%;
   @media (max-width: 768px) {
    width: 90%;
  }
  display: flex; 
  flex-direction: column;
   align-items: center;
   border-radius: 10px;
   border: 2px solid gray;
    overflow-y: auto; /* add vertical scroll if needed */
`;

const Button = styled.button`
  background-color: #00c5ff;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  cursor: pointer;
  &:hover {
    background-color: #00a3d3;
  }
`

const Modal: FC<Props> = ({children, isOpened, close}) => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        setShouldShow(isOpened);
    }, [isOpened])

    return (
        <>
            {shouldShow && (
                <ModalBackground onClick={() => close()}>
                    <ModalBody onClick={e => e.stopPropagation()}>
                        {children}
                        <Button onClick={() => close()}>Close</Button>
                    </ModalBody>
                </ModalBackground>
            )}
        </>
    )
}

export default Modal;