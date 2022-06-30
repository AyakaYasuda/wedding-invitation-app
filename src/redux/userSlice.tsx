import { IUserState } from 'types/UserData.type';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAttendanceData } from 'types/AttendanceData.type';
import { IUpdateUserRequest } from 'types/UserData.type';
import SessionServices from 'services/session.services';
import { getAuth } from 'services/auth.service';

const API_URL = process.env.REACT_APP_API_ENDPOINT + '/user';

// initialize
const initialState: IUserState = {
  user: {
    PK: '',
    SK: '',
    userId: '',
    eventId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false,
    message: '',
    allergy: '',
    isAttending: true,
  },
  status: 'pending',
  errorMessages: [],
};

//GET
export const getUser = createAsyncThunk(
  'get',
  async (userId: string, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/${userId}`;

      const result = await axios.get(url, {
        headers: {
          Authorization: getAuth(),
        },
      });

      return result.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//PATCH
export const editUser = createAsyncThunk(
  'edit',
  async (updateUserReqBody: IUpdateUserRequest, { rejectWithValue }) => {
    const userId = SessionServices.getUserId() || 'id not found';

    const url = `${API_URL}/edit/${userId}`;

    try {
      const result = await axios.patch(url, JSON.stringify(updateUserReqBody), {
        headers: {
          Authorization: getAuth(),
        },
      });
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAttendanceData = createAsyncThunk(
  'createAttendanceData',
  async (attendanceData: IAttendanceData, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/event/${attendanceData.eventId}`;
      const result = await axios.post(
        url,
        JSON.stringify(attendanceData.attendanceReqBody),
        {
          headers: {
            Authorization: getAuth(),
          },
        }
      );
      return result.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//create slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //FIXME: need test
    logout(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      })
      .addCase(createAttendanceData.fulfilled, (state, action) => {
        state.status = 'pending';
        state.user = action.payload;
      });

    builder.addCase(createAttendanceData.rejected, (state, action) => {
      const { message } = action.payload as { message: string };
      console.log('error messages in createAttendanceData', action.payload);

      state.status = 'rejected';
      state.errorMessages = [message];
    });
  },
});

export default userSlice.reducer;