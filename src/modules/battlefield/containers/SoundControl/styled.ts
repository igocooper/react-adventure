import styled from 'styled-components';
import cursorHandImg from 'modules/battlefield/images/cursors/cursor-hand.png';

export const Panel = styled.div.attrs({
  className: 'sound-panel'
})`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 16px;
  cursor: url('${cursorHandImg}'), auto;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 8px;
`;

export const Icon = styled.div.attrs({
  className: 'sound-icon'
})<{ disabled?: boolean; onMouseOver?: () => void }>`
  user-select: none;
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed' : `url('${cursorHandImg}'), auto`};
  bottom: 16px;
  right: 16px;
  font-size: 36px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;
