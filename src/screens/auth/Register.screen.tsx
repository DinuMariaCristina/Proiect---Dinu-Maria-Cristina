import React, { useEffect } from 'react';
import Register from "../../components/Register";
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from "../../redux/auth.slice";
import { RootState } from "../../redux/store";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleRegister = (email: string, password: string) => {
    dispatch(registerAsync({ email, password }));
  };

  return <Register onSubmit={handleRegister} />;
};

export default RegisterScreen;
