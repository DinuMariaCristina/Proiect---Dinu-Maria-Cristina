import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api';

interface AuthState {
  token: string;
  userName: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: '',
  userName: null,
  error: null,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login(email, password);
    return response; 
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await register(email, password);
    return response; 
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = '';
      state.userName = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ token: string, userName: string }>) => {
        state.token = action.payload.token;
        state.userName = action.payload.userName;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<{ token: string, userName: string }>) => {
        state.token = action.payload.token;
        state.userName = action.payload.userName;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to register';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
