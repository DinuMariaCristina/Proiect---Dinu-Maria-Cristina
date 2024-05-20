import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
  justify-content: center;
  align-items: center;
  background-color: #FBB1EF;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  border: 1px solid #ff1493;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #ff1493;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

export interface ILogin {
  onSubmit: (email: string, password: string) => void;
  goToRegister: () => void;
}

const Login: React.FC<ILogin> = ({ onSubmit, goToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login form submit:', { email, password });
    onSubmit(email, password);
  };

  return (
    <Container>
      <Input
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <Input
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <Button onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </Button>
      <Button onPress={goToRegister}>
        <ButtonText>Register</ButtonText>
      </Button>
    </Container>
  );
};

export default Login;
