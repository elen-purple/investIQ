import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 13px;
  list-style: none; /* Прибираємо стандартні маркери списку */
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: solid 1px ${({theme})=>theme.colors.secondaryBg};
`;

export const Title = styled.h3`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({theme})=>theme.colors.secondaryText};
  margin-bottom: 6px;
  margin-top: 0;
`;

export const Texts = styled.div`
  display: flex;
  gap: 20px;
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 8px;
  letter-spacing: 0.04em;
  color: ${({theme})=>theme.colors.secondaryText};
  margin: 0;
`;

export const Sum = styled.p`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.04em;
  margin: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Btn = styled.button`
  line-height: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Icon = styled.svg`
  fill: ${({theme})=>theme.colors.secondaryText};
`;

export const Table = styled.table`
  width: 605px;
  border-collapse: collapse;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  height: 382px;
  display: block;
  margin-bottom: 40px;

  @media screen and (min-width: 1098px) {
    width: 760px;
  }
`;

export const BodyStyled = styled.tbody`
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 6px;
  }

  scrollbar-width: thin;
  scrollbar-color: ${({theme})=>theme.colors.accentBg} transparent;
  @media screen and (min-width: 1098px) {
    height: 344px;
  }
  height: 346px;
  overflow-y: auto;
  width: 100%;
  border: 2px solid ${({theme})=>theme.colors.secondaryBg};
`;

export const TableHead = styled.th`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({theme})=>theme.colors.primaryText};
  text-align: left;
  padding: 13px 0 11px;
  background-color: ${({theme})=>theme.colors.secondaryBg};

  &:nth-child(1) {
    padding-left: 21px;
    width: 124px;
  }
  &:nth-child(2) {
    width: 198px;
  }
  &:nth-child(3) {
    width: 129px;
  }
  &:nth-child(4) {
    width: 154px;
  }

  @media screen and (min-width: 1098px) {
    &:nth-child(1) {
      padding-left: 20px;
      width: 124px;
    }
    &:nth-child(2) {
      width: 258px;
    }
    &:nth-child(3) {
      width: 175px;
    }
    &:nth-child(4) {
      width: 205px;
    }
  }
`;

export const Row = styled.tr`
  border-bottom: solid 2px ${({theme})=>theme.colors.secondaryBg};
`;

export const NameStyled = styled.td`
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({theme})=>theme.colors.secondaryText};
  text-align: left;
  padding: 13px 0;

  &:nth-child(1) {
    padding-left: 21px;
    width: 124px;
  }
  &:nth-child(2) {
    width: 198px;
  }
  &:nth-child(3) {
    width: 129px;
  }

  @media screen and (min-width: 1098px) {
    &:nth-child(1) {
      padding-left: 20px;
      width: 124px;
    }
    &:nth-child(2) {
      width: 258px;
    }
    &:nth-child(3) {
      width: 175px;
    }
  }
`;

export const SumDesc = styled.td`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-align: left;
  width: 110px;
  padding: 13px 0;
  @media screen and (min-width: 1098px) {
    width: 128px;
  }
`;

export const Data = styled.td``;
