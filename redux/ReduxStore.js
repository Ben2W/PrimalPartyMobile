import { configureStore } from '@reduxjs/toolkit'
import {eventsSlice} from "./eventsReducer";

const ReduxStore = configureStore({
    reducer: {
        events: eventsSlice.reducer,
        // friends: friendsReducer,
        // tasks: tasksReducer,
    }
})

export default ReduxStore