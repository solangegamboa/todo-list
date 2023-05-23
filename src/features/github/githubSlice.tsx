import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";


// Slice para github Token 
const initialState = {
    token: ''
}

export const githubTokenSlice = createSlice({
    name: 'getToken',
    initialState,
    reducers: {
        logout: () => initialState,
        setGhToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export default githubTokenSlice.reducer

export const { setGhToken, logout } = githubTokenSlice.actions

export const selectToken = (state: RootState) => state.getToken.token


// API Autenticada para o gitHub
const OWNER = 'Henry-Schein-Brasil';
const BASE_URL = `https://api.github.com/repos/${OWNER}/`

export const githubAPI = createApi({
    reducerPath: 'githubAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().getToken.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Pulls'],
    endpoints: (builder) => ({
        getPulls: builder.query({
            query: () => '/hsb-app-module-ui/pulls',
            providesTags: ['Pulls']
        }),
        getPullsByRepo: builder.mutation({
            query: (repo) => `${repo}/pulls`,
            invalidatesTags: ['Pulls']
        })
    })
})

export const {
    useGetPullsQuery,
    useGetPullsByRepoMutation
} = githubAPI