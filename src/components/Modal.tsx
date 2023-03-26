import {
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

const ModalBackground = styled.div`
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 450px;
`

function Modal({children, isOpened, close}: Props) {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        setShouldShow(isOpened);
    }, [isOpened])

    return (
        <>
            {shouldShow && (
                <ModalBackground onClick={() => close()}>
                    <ModalBody onClick={e => e.stopPropagation()}>
                        <button onClick={() => close()}>X</button>
                        {children}
                    </ModalBody>
                </ModalBackground>
            )}
        </>
    )
}

export default Modal;