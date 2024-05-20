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
  background-color: #E8A7F8;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  border: 1px solid #BB09BB;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #BB09BB;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  shadow-color: #BB09BB;
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

export interface IRegister {
  onSubmit: (email: string, password: string) => void;
}

const Register: React.FC<IRegister> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Register form submit:', { email, password });
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
    </Container>
  );
};

export default Register;
