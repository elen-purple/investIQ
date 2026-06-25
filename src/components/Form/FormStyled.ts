import styled from "styled-components";

export const Section = styled.section`
  padding: 62px 0 76px;
  position: relative;
  overflow: hidden;
  min-height: 100%;

  & > div:last-child {
    position: relative;

    @media screen and (min-width: 1098px) {
      display: flex;
      justify-content: space-between;
    }
  }

  @media screen and (min-width: 703px) {
    padding: 60px 0 192px;
  }
  @media screen and (min-width: 1098px) {
    padding: 150px 0 180px;
  }
`;

export const Hand = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 55px;
  right: -59px;
  z-index: -1;

  @media screen and (min-width: 703px) {
    display: none;
  }
`;

export const Stats = styled.img`
  position: absolute;
  width: 116px;
  height: 116px;
  bottom: -107px;
  left: -63px;
  z-index: -1;

  @media screen and (min-width: 703px) {
    display: none;
  }
`;

export const Top = styled.img`
  display: none;

  @media screen and (min-width: 703px) {
    display: block;
    position: absolute;
    width: 718px;
    height: 244px;
    top: -39px;
    left: -42px;
    z-index: -1;
  }

  @media screen and (min-width: 1098px) {
    display: none;
  }
`;

export const Two = styled.img`
  display: none;

  @media screen and (min-width: 703px) {
    display: block;
    position: absolute;
    width: 198px;
    height: 158px;
    bottom: -136px;
    left: 51px;
    z-index: -1;
  }

  @media screen and (min-width: 1098px) {
    bottom: -92px;
    left: 120px;
  }
`;

export const Desk = styled.img`
  display: none;

  @media screen and (min-width: 1098px) {
    display: block;
    position: absolute;
    width: 1329px;
    height: 252px;
    top: -103px;
    left: -100px;
    z-index: -1;
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
  background-color: ${(props: any) => props.theme.colors.secondaryBg};

  @media screen and (min-width: 703px) {
    height: 582px;
  }

  @media screen and (min-width: 1098px) {
    height: 450px;
  }
`;

export const Wrapper = styled.div`
  @media screen and (min-width: 703px) {
    padding-left: 114px;
  }

  @media screen and (min-width: 1098px) {
    padding-left: 120px;
    padding-top: 196px;
  }
`;

export const Title = styled.h1`
  font-weight: 900;
  font-size: 64px;
  text-align: center;
  color: ${(props: any) => props.theme.colors.primaryText};

  @media screen and (min-width: 703px) {
    font-size: 102px;
    text-align: left;
    margin-bottom: -10px;
  }
`;

export const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding-left: 41px;
  color: ${(props: any) => props.theme.colors.secondaryText};
  @media screen and (min-width: 703px) {
    padding-left: 58px;
  }
  @media screen and (min-width: 1098px) {
    padding-left: 72px;
  }
`;

export const Desc = styled.p`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-align: center;
  width: 222px;
  margin: 0 auto 20px;
  margin-bottom: 20px;
  color: ${(props: any) => props.theme.colors.secondaryText};
`;

export const Div = styled.div`
  margin-top: 50px;
  padding: 40px 12px 53px;
  border-radius: 30px;
  width: 282px;
  box-shadow: 0 10px 60px 0 rgba(170, 178, 197, 0.2);
  background: ${(props: any) => props.theme.colors.primaryBg};

  @media screen and (min-width: 703px) {
    width: 436px;
    padding: 51px 85.5px 52px;
    margin: 50px auto 0;
  }

  @media screen and (min-width: 1098px) {
    margin: 0;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
