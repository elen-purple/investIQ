import styled from "styled-components";

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

export const Div = styled.div`
  width: calc(100% - 38px);
  max-width: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.primaryBg};
  padding: 50px 57px 60px;
  box-shadow: 10px 10px 30px 0 rgba(82, 85, 95, 0.4);
  border-radius: 30px;
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.02em;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 20px;
`;

export const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  line-height: 0;
`;

export const Icon = styled.svg`
  stroke: ${({ theme }) => theme.colors.secondaryText};
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const ErrorMessage = styled.p`
  margin-bottom: 16px;
  font-size: 12px;
  letter-spacing: 0.02em;
  text-align: center;
  color: ${({ theme }) => theme.colors.errorColor};
`;
