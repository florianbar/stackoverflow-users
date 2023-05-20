import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const usersReducer = createSlice({
  name: "users",
  initialState: {
    users: [],
    followedUsers: [],
    blockedUsers: [],
    errorMessage: null
  },
  reducers: {
    setUsers: (state: any, action: PayloadAction<any>) => {
        state.users = action.payload;
    },
    setErrorMessage: (state: any, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
    },
    followUser: (state: any, action: PayloadAction<number>) => {
        // check if user doesn't exist in followedUsers yet
        // if it doesn't, add it
        if (!state.followedUsers.includes(action.payload)) {
            state.followedUsers.push(action.payload);
        }
    },
    unfollowUser: (state: any, action: PayloadAction<number>) => {
        // remove user from followedUsers
        state.followedUsers = state.followedUsers.filter((id: number) => id !== action.payload);
    },
    blockUser: (state: any, action: PayloadAction<number>) => {
        // check if user exists in followedUsers
        // if it does, remove it
        if (state.followedUsers.includes(action.payload)) {
            const filteredUsers = state.followedUsers.filter((id: number) => id !== action.payload);
            state.followedUsers = filteredUsers;
        }

        // check if user doesn't exist in blockedUsers yet
        // if it doesn't, add it
        if (!state.blockedUsers.includes(action.payload)) {
            state.blockedUsers.push(action.payload);
        }
    },
    unblockUser: (state: any, action: PayloadAction<number>) => {
        // remove user from blockedUsers
        state.blockedUsers = state.blockedUsers.filter((id: number) => id !== action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    setUsers, 
    setErrorMessage,
    followUser, 
    unfollowUser,
    blockUser, 
    unblockUser 
} = usersReducer.actions

export default usersReducer.reducer