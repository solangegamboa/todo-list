import { Action, ThunkAction, configureStore} from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import todoReducer from './features/todo/todoSlicer'
import githubTokenReducer, { githubAPI } from './features/github/githubSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
      [githubAPI.reducerPath]: githubAPI.reducer,
      counter: counterReducer,
      todo: todoReducer,
      getToken: githubTokenReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([githubAPI.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>