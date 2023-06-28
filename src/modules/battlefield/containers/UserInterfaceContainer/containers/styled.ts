import styled from 'styled-components';
import type { Team } from 'modules/battlefield/types';
import { TROOPER_TEAM } from 'modules/battlefield/constants';
import waitIcon from '../images/wait-icon.png';
import blockIcon from '../images/block-icon.png';

interface ImageProps {
  $src?: string;
  $health?: number;
}

export const TrooperImage = styled.div<ImageProps>`
  width: 200px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  background: url(${({ $src }) => $src}), rgba(0, 0, 0, 0.8);
  background-size: 160%;
  background-position: center -30px;
  background-repeat: no-repeat;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: ${({ $health }) => ($health ? `${$health}%` : 0)};
    background: ${({ theme }) => theme.color.blood};
  }
`;

interface ContainerProps {
  $teamName: Team;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Icon = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: block;
  border: #573000 solid 2px;
  background: rgba(29, 20, 8, 0.9);
  z-index: 1;
  filter: drop-shadow(2px 4px 6px black);
  transition: transform 300ms linear;

  &:hover {
    transform: scale(1.2);
  }
`;

export const WaitIcon = styled(Icon).attrs({
  src: waitIcon
})`
  right: 0;
  bottom: -10px;
`;

export const BlockIcon = styled(Icon).attrs({
  src: blockIcon
})`
  right: 55px;
  bottom: -30px;
`;

export const ActiveContainer = styled(Container)`
  order: ${({ $teamName }) => ($teamName === TROOPER_TEAM.DEFENDERS ? 1 : 0)};

  & ${Wrapper} {
    order: ${({ $teamName }) => ($teamName === TROOPER_TEAM.DEFENDERS ? 1 : 0)};
  }
  & ${TrooperImage} {
    border: ${({ theme, $teamName }) => theme.color[$teamName]} 2px solid;
  }
`;

export const HoveredContainer = styled(Container)<
  ContainerProps & { $enemy: boolean }
>`
  & ${TrooperImage} {
    order: ${({ $teamName }) =>
      $teamName === TROOPER_TEAM.DEFENDERS ? -1 : 0};
    border: ${({ theme, $teamName, $enemy }) =>
        $enemy ? theme.color.enemy : theme.color[$teamName]}
      2px solid;
  }
`;
