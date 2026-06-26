import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;

  @media screen and (min-width: 703px) {
    flex-direction: row;
    gap: 21px;
  }

  @media screen and (min-width: 1098px) {
    gap: 40px;
  }
`;

export const Subtitle = styled.p`
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-align: center;
  color: ${({ theme }) => theme.colors.balanceText};
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;

  @media screen and (min-width: 703px) {
    gap: 15px;
  }
`;

export const Input = styled.input`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 13px 16px;
  border-radius: 16px;
  width: 125px;
  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  font-family: "Roboto", sans-serif;
  border: 2px solid ${({ theme }) => theme.colors.primaryBg};
`;
