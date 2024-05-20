import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Login from "../../components/Login";
import { useDispatch } from 'react-redux';
import { loginAsync } from "../../redux/auth.slice";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const handleGoToRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await dispatch(loginAsync({ email, password })).unwrap();
      navigation.navigate("Home");
    } catch (error) {
      setMessage(`Eroare la autentificare: ${error.message}`);
    }
  };

  return (
    <View>
      <Login onSubmit={handleLogin} goToRegister={handleGoToRegister} />
      {message ? <Text>{message}</Text> : null} 
    </View>
  );
};

export default LoginScreen;
