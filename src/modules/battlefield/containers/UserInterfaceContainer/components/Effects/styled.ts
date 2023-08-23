import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 24px;
  flex-wrap: wrap;

  & > * {
    pointer-events: initial;
  }
`;
