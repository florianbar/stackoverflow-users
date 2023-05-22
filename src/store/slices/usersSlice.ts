import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
    users: any[],
    usersLoading: boolean,
    pageNumber: number,
    followedUsers: number[],
    blockedUsers: number[],
    errorMessage: string | null
};

export const usersReducer = createSlice({
  name: "users",
  initialState: {
    users: [],
    usersLoading: false,
    pageNumber: 1,
    followedUsers: [],
    blockedUsers: [],
    errorMessage: null
  } as initialStateType,
  reducers: {
    setUsers: (state: any, action: PayloadAction<any>) => {
        state.users = action.payload;
    },
    setUsersLoading: (state: any, action: PayloadAction<boolean>) => {
        state.usersLoading = action.payload;
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
    },
    incrementPageNumber: (state: any) => {
        state.pageNumber++;
    },
    decrementPageNumber: (state: any) => {
        state.pageNumber = state.pageNumber > 1 ? state.pageNumber - 1 : 1;
    },
    setPageNumber: (state: any, action: PayloadAction<number>) => {
        state.pageNumber = action.payload;
    }
  },
})

export const { 
    setUsers, 
    setUsersLoading,
    setErrorMessage,
    followUser, 
    unfollowUser,
    blockUser, 
    unblockUser,
    incrementPageNumber,
    decrementPageNumber,
    setPageNumber
} = usersReducer.actions

export default usersReducer.reducer