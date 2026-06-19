import styled from "styled-components";

export const Slider = styled.div`
  display: flex;
  width: 134px;
  justify-content: space-between;
  margin: 0 auto 25px;
  align-items: center;

  & > a:last-child > svg {
    transform: rotate(-90deg);
  }
`;

export const Arrow = styled.svg`
  fill: none;
  stroke-width: 2px;
  stroke: ${(props: any) => props.theme.colors.accentBg};

  transform: rotate(90deg);
`;

export const Text = styled.p`
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${(props: any) => props.theme.colors.primaryText};
`;
