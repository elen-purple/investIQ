import styled from "styled-components";

export const Section = styled.section`
  padding: 15px 0 51px;
  overflow: hidden;
  min-height: 100%;

  @media screen and (min-width: 703px) {
    padding: 40px 0 76px;
  }

  & > div:last-child {
    position: relative;
  }
`;

export const Wrapper = styled.div`
  margin-top: 42px;
  margin-bottom: 57px;
  position: relative;
  @media screen and (min-width: 703px) {
    padding: 22px 0 34px;
    background-color: ${({theme})=>theme.colors.primaryBg};
    box-shadow: 0 10px 60px 0 rgba(170, 178, 197, 0.2);
    border-radius: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const Wrap = styled.div`
  position: relative;
  order: 1;
  @media screen and (min-width: 1098px) {
    order: 0;
  }
`;

export const Top = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 703px) {
    align-items: center;
  }

  @media screen and (min-width: 1098px) {
    flex-direction: row;
  }
`;

export const GreyBg = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 342px;
  border-radius: 0 0 0 120px;
  background-color: ${({theme})=>theme.colors.secondaryBg};

  @media screen and (min-width: 703px) {
    height: 583px;
  }

  @media screen and (min-width: 1098px) {
    height: 602px;
  }
`;

export const Two = styled.img`
  display: none;

  @media screen and (min-width: 703px) {
    display: block;
    width: 198px;
    height: 158px;
    position: absolute;
    bottom: -115px;
    right: 36px;
    z-index: -2;
  }

  @media screen and (min-width: 1098px) {
    display: none;
  }
`;

export const TopIcon = styled.img`
  display: none;

  @media screen and (min-width: 1098px) {
    display: block;
    width: 1329px;
    height: 252px;
    position: absolute;
    bottom: -75px;
    left: -100px;
    z-index: -2;
  }
`;
