import {createSlice} from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
    name: 'events',
    initialState: [
        {_id: 1, name: "defaultBruh"},
        {_id: 2, name: "defaultPoop"},
        {_id: 3, name: "defaultScrub"},
    ],
    reducers: {
        eventGET: state => {
            return state.value
        },
        eventPOST: (state, action) => {
            let temp = [...state]
            temp.push(action.payload)
            return temp;
        },
        eventPUT: (state, action) => {
            let temp = [...state]
            let editEvent = temp.findIndex(obj => obj._id === action.payload._id)
            temp[editEvent] = action.payload;
            return temp;
        },
        eventDELETE: (state, action) => {
            let temp = [...state]
            let delEvent = temp.findIndex(obj => obj._id === action.payload.eventID)
            if (delEvent === -1)
                console.log("no item to delete")
            else
                temp.splice(delEvent, 1);
            return temp
        },
        eventSET: (state, action) => {
            return action.payload.res;
        },
        guestGET: (state, action) => {
            let temp = [...state];
            let findEvent = temp.findIndex(obj => obj._id === action.payload._id)
            if (findEvent === -1)
                console.log("no guests found")
            else
                return temp[findEvent].guests;
        },
    }
})

export const { eventGET, eventPOST, eventPUT, eventDELETE, eventSET, eventDataGET, guestGET } = eventsSlice.actions

export default eventsSlice.reducer