import styled, { css } from 'styled-components';
import knightImg from './images/knight.png';
import iceMageImg from './images/ice-mage.png';
import archerImg from './images/archer.png';
import spearKnightImg from './images/spear-knight.png';

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Character = styled(Center)<{ $type: string }>`
  ${(props) => {
    switch (props.$type) {
      case 'knight':
        return css`
          width: 90px;
          height: 135px;
          background-image: url(${knightImg});
          background-position: -46px 440px;
          background-size: 1000px 521px;
        `;
      case 'ice-mage':
        return css`
          width: 140px;
          height: 135px;
          background-image: url(${iceMageImg});
          background-position: -53px -41px;
          background-size: 800px 1565px;
        `;

      case 'archer':
        return css`
          width: 120px;
          height: 120px;
          background-image: url(${archerImg});
          background-position: -49px -190px;
          background-size: 1448px 500px;
        `;
      case 'spear-knight':
        return css`
          width: 150px;
          height: 120px;
          background-image: url(${spearKnightImg});
          background-position: -151px 5px;
          background-size: 1311px 684px;
        `;
      default:
        return css``;
    }
  }}
`;
