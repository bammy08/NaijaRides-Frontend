/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/axios';

interface AuthState {
  loading: boolean;
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
}

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const user =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user') || 'null')
    : null;

const initialState: AuthState = {
  loading: false,
  user,
  token,
  isAuthenticated: !!token,
  error: null,
};

// Super Admin Registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      phone: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await api.post('/auth/register', data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// OTP Verification
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data: { email: string; otp: string }, thunkAPI) => {
    try {
      const res = await api.post('/auth/verify-otp', data);

      // Save token and user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // ✅ Set Axios default auth header immediately
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.data.token}`;
      }

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Resend OTP
export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (email: string, thunkAPI) => {
    try {
      const res = await api.post('/auth/resend-otp', { email });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Login
export const loginSuperAdmin = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', data);

      // Save token and user to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Request Password Reset
export const requestPasswordReset = createAsyncThunk(
  'auth/requestReset',
  async (email: string, thunkAPI) => {
    try {
      const res = await api.post('/auth/request-password-reset', { email });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    data: { email: string; otp: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      const res = await api.post('/auth/reset-password', data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user ?? action.payload;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Registration failed';
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.user = action.payload.user ?? action.payload;
        state.token = action.payload.token ?? null;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'OTP verification failed';
      })

      .addCase(loginSuperAdmin.fulfilled, (state, action) => {
        state.user = action.payload.user ?? action.payload;
        state.token = action.payload.token ?? null;
        state.isAuthenticated = true;
        state.loading = false;
      })

      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Failed to reset password.';
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Failed to reset password.';
      })

      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
