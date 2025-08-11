/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/driverSlice.ts
import api from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Submit driver onboarding form
export const becomeDriver = createAsyncThunk(
  'driver/becomeDriver',
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await api.post('/driver/become', formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Error onboarding driver'
      );
    }
  }
);

// Fetch current driver profile
export const getDriverProfile = createAsyncThunk(
  'driver/getDriverProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/driver/me');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Error fetching profile'
      );
    }
  }
);

// Upload driver documents
export const uploadDriverDocuments = createAsyncThunk(
  'driver/uploadDocuments',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post('/driver/upload-docs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Error uploading documents'
      );
    }
  }
);

export const updateDriverProfile = createAsyncThunk(
  'driver/updateDriverProfile',
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await api.put('/driver/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Error updating driver profile'
      );
    }
  }
);

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    loading: false,
    error: null as string | null,
    driverProfile: null as any,
    user: null as any,
    successMessage: null as string | null,
  },
  reducers: {
    clearDriverState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // becomeDriver
      .addCase(becomeDriver.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(becomeDriver.fulfilled, (state, action) => {
        state.loading = false;
        state.driverProfile = action.payload.driverProfile;
        state.successMessage = action.payload.message;
      })
      .addCase(becomeDriver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // getDriverProfile
      .addCase(getDriverProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDriverProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.driverProfile = action.payload.driverProfile;
        state.user = {
          ...action.payload.user,
          profilePhoto: action.payload.driverProfile?.profilePhoto || null,
        };
      })

      .addCase(getDriverProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // uploadDriverDocuments
      .addCase(uploadDriverDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDriverDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.driverProfile = action.payload.driverProfile;
        state.successMessage = action.payload.message;
      })
      .addCase(uploadDriverDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDriverProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDriverProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.driverProfile = action.payload.driverProfile;
        state.successMessage =
          action.payload.message || 'Profile updated successfully';
      })
      .addCase(updateDriverProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDriverState, clearMessages } = driverSlice.actions;
export default driverSlice.reducer;
