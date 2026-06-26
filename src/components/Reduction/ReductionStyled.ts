import styled from "styled-components";

export const Wrapper = styled.div`
  display: none;
  width: 230px;
  height: 278px;
  border-radius: 20px 20px 20px 0;
  background-color: ${({ theme }) => theme.colors.secondaryBg};

  @media screen and (min-width: 703px) {
    display: block;
  }
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryText};
  padding: 12px 0;
`;

export const Item = styled.li`
  padding: 12px 21px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid ${({ theme }) => theme.colors.primaryBg};
`;

export const Month = styled.p`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const Sum = styled.p`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.secondaryText};
`;
