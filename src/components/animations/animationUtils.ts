import { keyframes } from "styled-components";

export const shakeAnimation = keyframes`
   0% { transform: translate(0, 0) rotate(0); }
  10% { transform: translate(-3px, 0) rotate(-5deg); }
  20% { transform: translate(3px, 0) rotate(5deg); }
  30% { transform: translate(-3px, 0) rotate(-5deg); }
  40% { transform: translate(3px, 0) rotate(5deg); }
  50% { transform: translate(-3px, 0) rotate(-5deg); }
  60% { transform: translate(3px, 0) rotate(5deg); }
  70% { transform: translate(-3px, 0) rotate(-5deg); }
  80% { transform: translate(3px, 0) rotate(5deg); }
  90% { transform: translate(-3px, 0) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0); }
`;

export const jumpAnimation = keyframes`
    0% {transform: translateY(0);}
    25% {transform: translateY(-10px);}
    50% {transform: translateY(0);}
    75% {transform: translateY(-5px);}
    100% {transform: translateY(0);}
`;
