import styled, { css } from 'styled-components';
import type { Team } from 'modules/battlefield/types';
import { TROOPER_TEAM } from 'modules/battlefield/constants';
import waitIcon from '../images/wait-icon.png';
import blockIcon from '../images/block-icon.png';

type ImageProps = {
  $src?: string;
  $health?: number;
};

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
  flex-shrink: 0;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: ${({ $health }) => ($health ? `${$health}%` : 0)};
    background: ${({ theme }) => theme.colors.blood};
  }
`;

export const Effects = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

type ContainerProps = {
  $teamName: Team;
};

export const Skills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 24px;
`;

export const ContainerInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

export const Wrapper = styled.div`
  position: relative;
`;

type IconProps = {
  disabled?: boolean;
};

export const Icon = styled.img<IconProps>`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: block;
  border: #573000 solid 2px;
  background: rgba(29, 20, 8, 0.9);
  filter: drop-shadow(2px 4px 6px black);

  ${({ disabled }) => {
    if (!disabled) {
      return css`
        transition: transform 300ms linear;

        &:hover {
          transform: scale(1.2);
        }
      `;
    }
    return css`
      filter: grayscale();
      cursor: not-allowed;
    `;
  }}
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

  & ${Effects} {
    order: ${({ $teamName }) =>
      $teamName === TROOPER_TEAM.DEFENDERS ? -1 : 0};
  }

  & ${TrooperImage} {
    border: ${({ theme, $teamName }) => theme.colors[$teamName]} 2px solid;
  }
`;

export const HoveredContainer = styled(Container)<
  ContainerProps & { $enemy: boolean }
>`
  & ${TrooperImage} {
    order: ${({ $teamName }) =>
      $teamName === TROOPER_TEAM.DEFENDERS ? -1 : 0};
    border: ${({ theme, $teamName, $enemy }) =>
        $enemy ? theme.colors.enemy : theme.colors[$teamName]}
      2px solid;
  }

  & ${Effects} {
    order: ${({ $teamName }) => ($teamName === TROOPER_TEAM.DEFENDERS ? 1 : 0)};
  }
`;
