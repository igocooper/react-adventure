import styled from 'styled-components';
import { Defenders } from '../Battlefield/styled';

export const HealthBar = styled.div.attrs({
  className: 'health-bar'
})`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  color: #fff;
  z-index: 7;
  padding: 0.1em 0.4em;
  border-radius: 6px;
  background: #0000008c;
  white-space: nowrap;

  ${Defenders} & {
    transform: translateX(-50%) rotate3d(0, 1, 0, 180deg);
  }
`;
