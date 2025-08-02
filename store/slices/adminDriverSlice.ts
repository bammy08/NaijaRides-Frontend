/* eslint-disable @typescript-eslint/no-explicit-any */
// store/slices/adminDriverSlice.ts
import api from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all driver users
export const fetchAllDrivers = createAsyncThunk(
  'admin/fetchAllDrivers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/admin/drivers');
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch drivers'
      );
    }
  }
);

// Approve a driver
export const approveDriver = createAsyncThunk(
  'admin/approveDriver',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/admin/drivers/${userId}/approve`);
      return { userId, data: res.data };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to approve driver'
      );
    }
  }
);

// Reject a driver
export const rejectDriver = createAsyncThunk(
  'admin/rejectDriver',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/admin/drivers/${userId}/reject`);
      return { userId, data: res.data };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to reject driver'
      );
    }
  }
);

const adminDriverSlice = createSlice({
  name: 'adminDrivers',
  initialState: {
    loading: false,
    error: null as string | null,
    drivers: [] as any[],
    successMessage: null as string | null,
  },
  reducers: {
    clearAdminDriverState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchAllDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(approveDriver.fulfilled, (state, action) => {
        state.successMessage = action.payload.data.message;
        state.drivers = state.drivers.map((d) =>
          d._id === action.payload.userId ? { ...d, status: 'approved' } : d
        );
      })
      .addCase(approveDriver.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(rejectDriver.fulfilled, (state, action) => {
        state.successMessage = action.payload.data.message;
        state.drivers = state.drivers.map((d) =>
          d._id === action.payload.userId ? { ...d, status: 'rejected' } : d
        );
      })
      .addCase(rejectDriver.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminDriverState } = adminDriverSlice.actions;
export default adminDriverSlice.reducer;
