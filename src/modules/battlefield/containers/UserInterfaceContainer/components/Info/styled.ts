import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: rgba(0, 0, 0, 0.8);
  padding: 8px 16px;
  border-radius: 6px;
  margin-top: 24px;
  flex-shrink: 0;
`;

export const Item = styled.p`
  color: #fff;
  font-family: fantasy;
`;

export const Value = styled.span`
  color: #f8c526;
`;
