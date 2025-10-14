import { createSlice } from "@reduxjs/toolkit";
import { users as demoUsers } from "../utils/demo.js";

// Load users from localStorage or fallback to demoUsers
let savedUsers = [];
try {
    savedUsers = JSON.parse(localStorage.getItem("users")) || demoUsers;
} catch {
    savedUsers = demoUsers;
}

const initialState = {
    loggedUser: JSON.parse(localStorage.getItem("loggedUser")) || null,
    allUsers: savedUsers
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            // Directly set loggedUser (validation already handled in component)
            state.loggedUser = action.payload;
            localStorage.setItem("loggedUser", JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.loggedUser = null;
            localStorage.removeItem("loggedUser");
        },

        signup: (state, action) => {
            // Add new user to the array
            state.allUsers.push(action.payload);

            // Persist updated array
            localStorage.setItem("users", JSON.stringify(state.allUsers));

            // Automatically log in new user
            state.loggedUser = action.payload;
            localStorage.setItem("loggedUser", JSON.stringify(action.payload));
        }
    }
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;
