import styled from "styled-components";

export const Div = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 0 19px;
  margin: 0 auto;
  // outline: 3px dashed darkred;

  @media screen and (min-width: 703px) {
    max-width: 703px;
  }

  @media screen and (min-width: 1098px) {
    max-width: 1098px;
  }
`;
