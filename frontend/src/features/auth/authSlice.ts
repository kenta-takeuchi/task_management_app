import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

import axios from "axios";

import {
    AUTH_STATE,
    CRED,
    LOGIN_USER,
    PROFILE,
    JWT,
    USER
} from "../types";
import {findRenderedComponentWithType} from "react-dom/test-utils";

export const fetchAsyncLogin = createAsyncThunk(
    "auth/login",
    async (auth: CRED) => {
        const res = await axios.post<JWT>(
            `${process.env.REACT_APP_API_URL}/authen/jwt/create`,
            auth,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return res.data;
    }
)

export const fetchAsyncRegister = createAsyncThunk(
    "auth/register",
    async (auth: CRED) => {
        const res = await axios.post<USER>(
            `${process.env.REACT_APP_API_URL}/api/v1/create/`,
            auth,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return res.data;
    }
)

export const fetchAsyncFetMyProf = createAsyncThunk(
    "auth/loginuser",
    async () => {
        const res = await axios.get<LOGIN_USER>(
            `${process.env.REACT_APP_API_URL}/api/v1/loginuser/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data
    }
)

export const fetchAsyncGetProfs = createAsyncThunk(
    "auth/getProfiles",
    async () => {
        const res = await axios.get<PROFILE[]>(
            `${process.env.REACT_APP_API_URL}/api/v1/profile/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`
                }
            }
        )
    }
)

const initialState: AUTH_STATE = {
    isLoginView: true,
    loginUser: {
        id: 0,
        username: "",
    },
    profiles: [{id: 0, user_profile: 0}]
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export const {} = authSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
