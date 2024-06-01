import { configureStore } from '@reduxjs/toolkit'
import ProcessSliceReducer from "./processInstanceReducer";

export const store = configureStore({
    reducer: {
        processInstanceState: ProcessSliceReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
