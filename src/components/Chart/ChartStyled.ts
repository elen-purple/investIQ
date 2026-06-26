import styled from "styled-components";

export const Wrapper = styled.div`
  @media screen and (min-width: 703px) {
    border-radius: 30px;
    box-shadow: 0 10px 60px 0 rgba(170, 178, 197, 0.2);
    background: #fff;
    padding: 20px 32px 22px;
  }

  @media screen and (min-width: 1098px) {
    border-radius: 30px;
    box-shadow: 0 10px 60px 0 rgba(170, 178, 197, 0.2);
    background: #fff;
    padding: 20px 151px 22px;
  }
`;

export const Text = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  color: #52555f;
`;
