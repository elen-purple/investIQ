import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 45px 15px;
  justify-content: center;
  @media screen and (min-width: 703px) {
    gap: 46px 20px;
  }

  @media screen and (min-width: 1098px) {
    width: 613px;
    margin: 0 auto;
  }
`;

export const Sum = styled.p`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Icon = styled.svg`
  z-index: 2;
  position: relative;
`;

export const Block = styled.div`
  z-index: 1;
  width: 59px;
  height: 46px;
  border-radius: 20px;
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: ${({ theme }) => theme.colors.secondaryBg};
`;

export const Btn = styled.button`
  width: 84px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: transparent;
`;

export const Title = styled.h3`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
`;
