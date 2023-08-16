import styled, { css } from 'styled-components';
import { SkillIcon as SkillIconBase } from 'common/components/SkillIcon';
import { Icon } from 'common/components/SkillIcon/styled';

type Props = {
  active?: boolean;
  disabled?: boolean;
  onClick?: CallableFunction;
};

export const Container = styled.div`
  position: relative;
  width: fit-content;
`;

type CoolDownProps = {
  fillPercentage: number;
};
export const CoolDown = styled.div<CoolDownProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-grid;
  place-content: center;
  font-size: 24px;
  font-weight: 700;
  font-family: sans-serif;
  color: rgba(255, 255, 255, 0.8);
  cursor: not-allowed;

  width: 65%;
  height: 65%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: conic-gradient(
    rgba(0, 0, 0, 0.4) 0 ${(props) => props.fillPercentage}%,
    transparent ${(props) => props.fillPercentage}% 100%
  );
`;

export const SkillIcon = styled(SkillIconBase).attrs(({ disabled }: Props) => ({
  className: `skill ${disabled ? 'disabled' : ''}`
}))<Props>`
  &.disabled {
    filter: blur(1px) grayscale(1);
    cursor: not-allowed;
  }

  ${Icon} {
    transition: transform 300ms linear;

    ${({ active }) => {
      if (active) {
        return css`
          transform: scale(1.2);
          border: 2px solid lightgreen;
        `;
      }
      return '';
    }}
  }

  &:hover:not(.disabled) {
    ${Icon} {
      transform: scale(1.2);
    }
  }
`;
