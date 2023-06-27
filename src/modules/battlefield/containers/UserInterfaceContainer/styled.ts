import styled from 'styled-components';

export const Interface = styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
`;

export const TrooperInterface = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Info = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
`;

interface ImageProps {
  $src?: string;
}

export const TrooperImage = styled.div<ImageProps>`
  width: 200px;
  height: 200px;
  border: #32a265 2px solid;
  border-radius: 50%;
  background: url(${({ $src }) => $src}), rgba(0, 0, 0, 0.8);
  background-size: 160%;
  background-position: center -30px;
  background-repeat: no-repeat;
`;
