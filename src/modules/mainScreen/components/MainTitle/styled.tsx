import styled, { keyframes } from 'styled-components';

const glowUp = keyframes`
  0%,
  100% {
    color: var(--color);
    filter: blur(1px);
    text-shadow: 0 0 10px var(--color), 0 0 20px var(--color), 0 0 30px var(--color),
    0 0 40px var(--color), 0 0 60px var(--color), 0 0 80px var(--color), 0 0 100px var(--color),
    0 0 120px var(--color);
  }

  5%,
  95% {
    filter: blur(0);
    color: #fff;
    text-shadow: none;
  }
`;

export const HiglightedTitle = styled.div`
  --color: #47cf73;
  display: flex;
  justify-content: center;
`;

type LetterProps = {
  $i: number;
};

export const Letter = styled.span<LetterProps>`
  font-size: 60px;
  padding: 0 10px;
  text-transform: uppercase;
  color: #fff;
  animation: ${glowUp} 2s linear infinite;
  animation-delay: calc(200ms * ${({ $i }) => $i});
`;
