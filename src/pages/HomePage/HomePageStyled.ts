import styled from "styled-components";

export const Section = styled.section`
  padding: 0 0 40px;
  overflow: hidden;
  min-height: 100%;

  @media screen and (min-width: 703px) {
    padding: 0 0 57px;
  }

  @media screen and (min-width: 1098px) {
    padding: 0 0 83px;
  }

  & > div:last-child {
    position: relative;
  }
`;

export const GreyBg = styled.div`
  width: 100%;
  height: 342px;
  position: absolute;
  border-radius: 0 0 0 120px;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: ${(props: any) => props.theme.colors.secondaryBg};
  @media screen and (min-width: 703px) {
    height: 583px;
  }
`;

export const Two = styled.img`
  display: none;

  @media screen and (min-width: 703px) {
    display: block;
    width: 198px;
    height: 158px;
    position: absolute;
    right: 90px;
    z-index: 1;
    bottom: 110px;
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
    bottom: -121px;
    left: -100px;
    z-index: -2;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 40px;
  padding: 30px 0 40px;

  @media screen and (min-width: 703px) {
    flex-direction: row;
    align-items: center;
    justify-content: right;
    gap: 80px;
  }

  @media screen and (min-width: 1098px) {
    gap: 174px;
  }
`;

export const Wrap = styled.div`
  position: relative;
`;

export const Div = styled.div`
  @media screen and (min-width: 703px) {
    border-radius: 0 30px 30px 30px;
    padding: 28px 30px 48px;
    box-shadow: 0 10px 60px 0 rgba(170, 178, 197, 0.2);
    background-color: ${(props: any) => props.theme.colors.primaryBg};
  }

  @media screen and (min-width: 1098px) {
    padding: 33px 20px 61px;
  }
`;

export const DivWrapper = styled.div`
  @media screen and (min-width: 1098px) {
    display: flex;
    justify-content: space-between;
  }
`;
