import { createSlice } from '@reduxjs/toolkit'

export interface uiState {
    isDateModalOpen: boolean
}

const initialState: uiState = {
    isDateModalOpen: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onOpenDateModal: (state, /*action*/) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state, /*action*/) => {
            state.isDateModalOpen = false;
        },
    },
})

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;