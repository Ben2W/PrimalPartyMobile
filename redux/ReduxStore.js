import { configureStore } from '@reduxjs/toolkit'
import {eventsSlice} from "./eventsReducer";
import GetEvents from "../components/API Calls/GetEvents";


const ReduxStore = configureStore({
    reducer: {
        events: eventsSlice.reducer,
        // friends: friendsReducer,
        // tasks: tasksReducer,
    },
    preloadedState: {events: null}
}, )

export default ReduxStore