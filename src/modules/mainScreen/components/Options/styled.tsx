import styled from 'styled-components';

export const OptionsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  margin-top: 150px;

  text-indent: 0;
  list-style-type: none;

  font-size: 40px;
  text-transform: uppercase;

  & a {
    color: #fff;
    text-decoration: none;
  }

  & a:hover {
    color: #47cf73;
  }
`;
