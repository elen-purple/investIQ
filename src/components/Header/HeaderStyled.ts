import styled from "styled-components";

export const Section = styled.header`
  padding: 12px 0 13px;
  background-color: ${({ theme }) => theme.colors.primaryBg};

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Avatar = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Letter = styled.p`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const Name = styled.p`
  display: none;

  @media screen and (min-width: 703px) {
    display: block;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

export const User = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  @media screen and (min-width: 703px) {
    gap: 20px;
  }
`;

export const Line = styled.div`
  display: none;

  @media screen and (min-width: 703px) {
    display: block;
    height: 36px;
    width: 1px;
    background-color: ${({ theme }) => theme.colors.lineColor};
  }
`;

export const LogoutBtn = styled.button`
  display: none;

  @media screen and (min-width: 703px) {
    display: block;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

export const Logout = styled.button`
  line-height: 0;
  background-color: transparent;

  @media screen and (min-width: 703px) {
    display: none;
  }
`;

export const Icon = styled.svg`
  fill: #cbccd0;
`;
