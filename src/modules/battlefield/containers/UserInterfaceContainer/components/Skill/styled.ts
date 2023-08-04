import styled, { css } from 'styled-components';
import { SkillIcon as SkillIconBase } from 'common/components/SkillIcon';
import { Icon } from 'common/components/SkillIcon/styled';

type Props = {
  active?: boolean;
  onClick?: CallableFunction;
};
export const SkillIcon = styled(SkillIconBase)<Props>`
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

  &:hover {
    ${Icon} {
      transform: scale(1.2);
    }
  }
`;
