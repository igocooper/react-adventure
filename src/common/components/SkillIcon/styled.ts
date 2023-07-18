import styled from 'styled-components';

export const Border = styled.div.attrs({
  className: 'header'
})`
  background: #2b2121;
  border: 5px solid var(--border-outer-color);
  border-radius: 10px;
  outline: 1px solid #000;
  height: 75px;
  width: 75px;
`;

type IconProps = {
  src: string;
};

export const Icon = styled.img.attrs(({ src }: IconProps) => ({
  src
}))<IconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 6px;
  width: 98%;
  height: 98%;
`;
