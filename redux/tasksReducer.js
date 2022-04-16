import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [
        null
    ],
    reducers: {
        taskGET: state => {
            return state.value
        },
        individualTaskGet: (state, action) => {
            let temp = [...state]
            let individual = temp.findIndex(obj => obj._id === action.payload._id)
            return temp[individual];
        },
        taskPOST: (state, action) => {
            let temp = [...state]
            temp.push(action.payload)
            return temp;
        },
        taskPUT: (state, action) => {
            let temp = [...state]
            let editTask = temp.findIndex(obj => obj._id === action.payload._id)
            temp[editTask] = action.payload;
            return temp;
        },
        taskDELETE: (state, action) => {
            let temp = [...state]
            let delTask = temp.findIndex(obj => obj._id === action.payload.TaskID)
            if (delTask === -1)
                console.log("no item to delete")
            else
                temp.splice(delTask, 1);
            return temp
        },
        taskSET: (state, action) => {
            return action.payload.res;
        }
    }
})

export const { taskGET, individualTaskGet, taskPOST, taskPUT, taskDELETE, taskSET } = tasksSlice.actions

export default tasksSlice.reducer