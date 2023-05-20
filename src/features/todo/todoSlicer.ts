import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from '../../store'
import { fetchTodoList } from "./todoAPI";

export interface TodoItemState {
    id: number
    text: string, 
    done: boolean
}
export interface TodoState {
  data: TodoItemState[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: TodoState = {
    data: [],
    status: 'idle'
}

export const getTodoList = createAsyncThunk(
    'todo/fetchTodoList',
    async () => {
        const response = await fetchTodoList()
        return response.data
    }
)

export const todoSlicer = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<string>) => {
            state.data.push({id: (state.data.length + 1), text: action.payload, done: false})
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        updateItem: (state, action: PayloadAction<number>) => {
            const cloneData = state.data
            // (d) => (d.id == e.target.value ? { ...d, cancel: !d.cancel } : d)
            state.data = cloneData.map((item) =>
                    (item.id === action.payload ? { ...item, done: !item.done } : item))
        },
        loadItems: (state, action) => {
            state.data = action.payload.data
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodoList.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getTodoList.fulfilled, (state, action) => {
                state.status = 'idle'
                state.data = action.payload
            })
        }
})

export const { addItem, removeItem, updateItem } = todoSlicer.actions

export const selectTodo = (state: AppState) => state.todo.data
export const statusTodo = (state: AppState) => state.todo.status

export const getItems = (): AppThunk => (dispatch) => {
    dispatch(getTodoList())
}

export default todoSlicer.reducer