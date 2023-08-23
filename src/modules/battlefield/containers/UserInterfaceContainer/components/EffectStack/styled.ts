import styled from 'styled-components';

type EffectProps = {
  src: string;
};

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
`;

export const Image = styled.img.attrs(({ src }) => ({
  src
}))<EffectProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
`;

export const DurationLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
  position: absolute;
  border-radius: 6px;
  background: #9d4444;
  color: white;
  font-weight: 600;
  font-family: monospace;
`;
