import { configureStore } from '@reduxjs/toolkit'
import { eventsSlice } from "./eventsReducer";
import { tasksSlice } from "./tasksReducer"


const ReduxStore = configureStore({
    reducer: {
        events: eventsSlice.reducer,
        tasks: tasksSlice.reducer
        // friends: friendsReducer,
    },
    preloadedState: { events: null, tasks: null }
})

export default ReduxStore