import styled from 'styled-components';

export const Item = styled.p`
  color: #fff;
  font-family: fantasy;
`;

export const Value = styled.span`
  color: #f8c526;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 64px;
  margin-top: 8px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;
