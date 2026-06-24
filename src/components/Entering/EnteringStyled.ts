import styled from "styled-components";

export const Block = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const GreyBgInput = styled.div`
  width: 100%;
  height: 257px;
  position: absolute;
  border-radius: 0 0 0 120px;
  top: 60px;
  left: 0;
  z-index: 1;
  background-color: ${(props: any) => props.theme.colors.secondaryBg};
`;

export const ModalStyled = styled.div`
  & > div {
    position: relative;
    z-index: 1;
  }
  padding: 15px 0 0;
  height: 100%;
  background-color: ${(props: any) => props.theme.colors.primaryBg};
`;

export const ArrowBtn = styled.button`
  line-height: 0;
  background-color: transparent;
  margin-bottom: 15px;
`;

export const ArrowIcon = styled.svg`
  fill: ${(props: any) => props.theme.colors.accentBg};
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 16px 16px 0 0;
  padding: 0 20px;
  background-color: ${(props: any) => props.theme.colors.secondaryBg};
  border: ${(props: any) => props.theme.colors.primaryBg} 2px solid;

  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: ${(props: any) => props.theme.colors.secondaryText};
  &::placeholder {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.02em;
    color: ${(props: any) => props.theme.colors.placeholderText};
  }

  @media screen and (min-width: 703px) {
    width: 192px;
    border: 2px solid ${(props: any) => props.theme.colors.secondaryBg};
    border-radius: 16px 0 0 0;
    background-color: ${(props: any) => props.theme.colors.primaryBg};
  }

  @media screen and (min-width: 1098px) {
    width: 289px;
  }
`;

export const Label = styled.label`
  height: 44px;
`;

export const Btn = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 0 0 16px 0;
  padding: 0 20px;
  background-color: ${(props: any) => props.theme.colors.secondaryBg};
  border: ${(props: any) => props.theme.colors.primaryBg} 2px solid;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: ${(props: any) => props.theme.colors.placeholderText};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 703px) {
    width: 171px;
    border: 2px solid ${(props: any) => props.theme.colors.secondaryBg};
    border-radius: 0;
    background-color: ${(props: any) => props.theme.colors.primaryBg};
  }

  @media screen and (min-width: 1098px) {
    width: 188px;
  }
`;

export const ArrowDown = styled.svg`
  fill: none;
  stroke: ${(props: any) => props.theme.colors.placeholderText};
`;

export const WrapperInput = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

export const BtnList = styled.ul`
  position: absolute;
  box-shadow: 0 3px 4px 0 rgba(170, 178, 197, 0.4);
  width: 100%;
  border: 2px solid #f5f6fb;
  z-index: 2;
`;

export const BtnItem = styled.button`
  padding: 10px 20px;
  width: 100%;
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: ${(props: any) => props.theme.colors.placeholderText};
  background-color: ${(props: any) => props.theme.colors.primaryBg};

  &:hover {
    color: ${(props: any) => props.theme.colors.secondaryText};
    background-color: ${(props: any) => props.theme.colors.secondaryBg};
  }
`;

export const WrapperBtn = styled.div`
  display: flex;
  gap: 15px;
`;

export const NumberInput = styled.input`
  border: 2px solid ${(props: any) => props.theme.colors.primaryBg};
  background-color: ${(props: any) => props.theme.colors.secondaryBg};
  border-radius: 22px;
  width: 183px;
  height: 44px;
  padding: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${(props: any) => props.theme.colors.primaryText};

  @media screen and (min-width: 703px) {
    width: 104px;
    border: 2px solid ${(props: any) => props.theme.colors.secondaryBg};
    border-radius: 0 16px 16px 0;
    background-color: ${(props: any) => props.theme.colors.primaryBg};
  }

  @media screen and (min-width: 1098px) {
    width: 124px;
  }
`;

export const NumberLabel = styled.label`
  margin: 0 auto 83px;
  position: relative;
  width: 183px;
  display: block;

  @media screen and (min-width: 703px) {
    margin: 0;
    width: max-content;
  }
`;

export const CalculatorIcon = styled.svg`
  position: absolute;
  right: 20px;
  top: 12px;
  fill: ${(props: any) => props.theme.colors.secondaryText};
`;

export const DateText = styled.p`
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props: any) => props.theme.colors.secondaryText};
`;

export const DateIcon = styled.svg`
  fill: ${(props: any) => props.theme.colors.secondaryText};
`;

export const DateWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 50px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 75px;
`;

export const FormStyled = styled.form`
  margin-bottom: 48px;
  display: flex;
  gap: 30px;
  align-items: center;
  flex-direction: column;

  @media screen and (min-width: 1098px) {
    margin-bottom: 59px;
    flex-direction: row;
    gap: 27px;
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const InputsOnlyWrapper = styled.div`
  display: flex;
  height: 44px;
`;
