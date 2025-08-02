/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/lib/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type FormData = {
  fromCity: string;
  toCity: string;
  pickupPoint: string;
  dropoffPoint: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  distance?: number;
};

export const publishRide = createAsyncThunk(
  'rides/publish',
  async (rideData: FormData, thunkAPI) => {
    try {
      const response = await api.post('/rides/publish', rideData);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to publish ride'
      );
    }
  }
);

export const fetchDriverRides = createAsyncThunk(
  'rides/driverRides',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/rides/my-rides');
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch driver rides'
      );
    }
  }
);

export const cancelRide = createAsyncThunk(
  'rides/cancel',
  async (rideId: string, thunkAPI) => {
    try {
      const response = await api.patch(`/rides/cancel/${rideId}`);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to cancel ride'
      );
    }
  }
);

export const completeRide = createAsyncThunk(
  'rides/complete',
  async (rideId: string, thunkAPI) => {
    try {
      const response = await api.patch(`/rides/complete/${rideId}`);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to complete ride'
      );
    }
  }
);

export const fetchAllRides = createAsyncThunk(
  'rides/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/rides/admin');
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch all rides'
      );
    }
  }
);

const rideSlice = createSlice({
  name: 'rides',
  initialState: {
    allRides: [],
    driverRides: [],
    loading: false,
    error: null as string | null,
    success: false,
  },
  reducers: {
    clearRideState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // PUBLISH
      .addCase(publishRide.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(publishRide.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(publishRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DRIVER RIDES
      .addCase(fetchDriverRides.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverRides.fulfilled, (state, action) => {
        state.loading = false;
        state.driverRides = action.payload;
      })
      .addCase(fetchDriverRides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CANCEL
      .addCase(cancelRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelRide.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(cancelRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // COMPLETE
      .addCase(completeRide.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeRide.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(completeRide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADMIN ALL RIDES
      .addCase(fetchAllRides.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRides.fulfilled, (state, action) => {
        state.loading = false;
        state.allRides = action.payload;
      })
      .addCase(fetchAllRides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRideState } = rideSlice.actions;
export default rideSlice.reducer;
