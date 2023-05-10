import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../calendar';

export interface authState {
    status: string,
    user?: User | null,
    errorMessage?: string

}

const initialState: authState = {
    status: 'checking',
    user: undefined,
    errorMessage: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = null;
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = null;
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;        }
    },
})

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;