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
        individualEventGet: (state, action) => {
            let temp = [...state]
            let individual = temp.findIndex(obj => obj._id === action.payload._id)
            return temp[individual];
        },
        eventPOST: (state, action) => {
            let temp = [...state]
            temp.push(action.payload)
            return temp;
        },
        eventPUT: (state, action) => {
            let temp = [...state]
            let editEvent = temp.findIndex(obj => obj._id === action.payload._id)
            temp[editEvent] = action.payload.eventData;
            state = temp;
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
        guestADD: (state, action) => {
            // console.log(action)
            let temp = [...state];
            let findEvent = temp.findIndex(obj => obj._id === action.payload.eventID);
            temp[findEvent].guests.push(action.payload.userData);
            // I need to create a guests Object to add to this
            state = temp;
            // console.log(temp[findEvent].guests);
            return
        },
        guestREMOVE: (state, action) => {
            let temp = [...state];
            let findEvent = temp.findIndex((obj) => obj._id === action.payload.eventID);
            let findGuest = temp[findEvent].guests.findIndex((obj) => obj._id === action.payload.guestID);
            // console.log(temp[findEvent].guests.length)
            // let temp2 = JSON.parse(JSON.stringify(temp[findEvent]))
            // temp2.guests.splice(action.payload.guestID, 1);
            // temp[findEvent].guests = temp2;
            console.log("splicing")

            // findGuest == index of guest

            temp[findEvent].guests = temp[findEvent].guests.filter((obj) => action.payload.guestID !== obj._id);
            // console.log(temp[findEvent].guests);
            // console.log(temp[findEvent].guests.length)
            // console.log(temp[findEvent].guests);
            state = temp;
            return;
        },
        logoutRESET: (state, action) => {
            state = undefined;
            return;
        },
        eventTaskPOST: (state, action) => {
            let temp = [...state];
            let findEvent = temp.findIndex((obj) => obj._id === action.payload.eventID);
            temp[findEvent] = action.payload.eventData;
            state = temp;
            return
        },
    }
})

export const {
    eventGET, eventPOST, eventPUT, eventDELETE, eventSET, eventDataGET,
    guestGET, guestADD, guestREMOVE, individualEventGet,
    logoutRESET, eventTaskPOST } = eventsSlice.actions

export default eventsSlice.reducer