import styled from 'styled-components';

export const Slot = styled.div.attrs({
  className: 'header'
})`
  background: ${({ theme }) => theme.dialog.slotBg};
  width: 100%;
  border-radius: 8px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 4px;
`;

type HealthProps = {
  health: number;
  currentHealth: number;
};

export const Health = styled.div<HealthProps>`
  width: ${({ health, currentHealth }) => `${(currentHealth / health) * 100}%`};
  height: 15px;
  background: #ff5757;
  border-radius: 8px;
  box-shadow: 0 3px 0 0 #d14242, 0 -3px 0 0 #ff9f9f;
`;
