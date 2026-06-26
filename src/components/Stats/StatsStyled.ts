import styled from "styled-components";

export const Wrapper = styled.div`
  box-shadow: 5px 10px 20px 0 rgba(170, 178, 197, 0.4);
  background-color: ${({ theme }) => theme.colors.primaryBg};
  border-radius: 20px;
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  padding: 0 8px;

  @media screen and (min-width: 703px) {
    box-shadow: 0 10px 60px 0 rgba(170, 178, 197, 0.2);
    border-radius: 30px;
    justify-content: center;
    gap: 20px;
    height: 50px;
  }
`;

export const Wrap = styled.div`
  width: 131px;
  @media screen and (min-width: 703px) {
    display: flex;
    gap: 19px;
    align-items: center;
    width: max-content;
  }
`;

export const Line = styled.div`
  width: 1px;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.lineColor};

  @media screen and (min-width: 703px) {
    height: 36px;
  }
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 2px;

  @media screen and (min-width: 703px) {
    margin: 0;
  }
`;

export const Red = styled.p`
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-align: center;
  color: ${({ theme }) => theme.colors.spendColor};
`;

export const Green = styled.p`
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-align: center;
  color: ${({ theme }) => theme.colors.getColor};
`;
