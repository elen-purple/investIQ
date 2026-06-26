import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  bottom: -163px;
  left: 0;
  height: 163px;
  padding-top: 11px;
  z-index: 2;

  @media screen and (min-width: 703px) {
    left: 67px;
  }

  @media screen and (min-width: 1098px) {
    left: 86px;
  }
`;

export const Icon = styled.svg`
  fill: #182e5f;
  position: absolute;
  top: 0;
  left: 69px;
`;

export const Block = styled.div`
  padding: 30px 25px 24px;
  border-radius: 30px;
  width: 282px;
  height: 152px;
  background: linear-gradient(155deg, #1d346a 0%, #031634 100%);

  @media screen and (min-width: 703px) {
    width: 292px;
    padding: 30px 30px 24px;
  }
`;

export const Title = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.42857;
  color: ${({ theme }) => theme.colors.primaryBg};
  margin-bottom: 5px;
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.33333;
  color: ${({ theme }) => theme.colors.primaryBg};
`;
