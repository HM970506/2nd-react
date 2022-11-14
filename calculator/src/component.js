import styled from "styled-components";

const Background = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100wh;
  height: 100vh;
  padding: 0;
  margin: 0;
`;

const Calculator = styled.div``;

const TextArea = styled.div`
  font-size: 70px;
  text-align: right;
  height: 50%;
`;

const ButtonArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
  width: 250px;
`;

const Button = styled.div`
  background-color: gray;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: red;
    font-size: 18px;
  }
`;

const OptionButton = styled(Button)`
  background-color: DarkGray;
`;

const SignButton = styled(Button)`
  background-color: orange;
`;

export {
  Background,
  Calculator,
  TextArea,
  ButtonArea,
  Button,
  OptionButton,
  SignButton,
};
