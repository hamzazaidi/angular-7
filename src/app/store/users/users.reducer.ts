import { IUser } from '../../user/models/user';
import { UsersActionTypes } from './users.actions';

export const initialUsers: IUser[] = [];

const updateUserIsProcessing = (users: IUser[], user: IUser) => users.map(u => {
    if (u.id === user.id) { u.isProcessing = true; }
    return u;
});
const createUser = (users: IUser[], user: IUser) => [ ...users, user ];
const updateUser = (users: IUser[], user: IUser) => users.map(u => u.id === user.id ? user : u);
const deleteUser = (users: IUser[], userId: number) => users.filter(u => u.id !== userId);

// Define the shape of the State
export interface UsersState {
    users: IUser [];
    selectedUserId: null | string;
    isLoading: boolean;
    isAdding: boolean;
}

// Initial State
export const initialState: UsersState = {
    users: [],
    selectedUserId: null,
    isLoading: false,
    isAdding: false
};

// Define reducer
export function usersReducer(state = initialState, action): UsersState {
    switch (action.type) {
        case UsersActionTypes.LoadUsers:
            return {
                ...state,
                isLoading: true
            };
        case UsersActionTypes.LoadUsersSuccess:
            return {
                ...state,
                isLoading: false,
                users: action.payload
            };
        case UsersActionTypes.SelectUser:
            return  {
                ...state,
                selectedUserId: action.payload,
                users: state.users
            };
        case UsersActionTypes.AddUser:
            return  {
                ...state,
                isAdding: true
            };
        case UsersActionTypes.AddUserSuccess:
            return  {
                ...state,
                isAdding: false,
                users: createUser(state.users, action.payload)
            };
        case UsersActionTypes.UpdateUser:
            return  {
                ...state,
                users: updateUserIsProcessing(state.users, action.payload)
            };
        case UsersActionTypes.UpdateUserSuccess:
            return  {
                ...state,
                users: updateUser(state.users, action.payload)
            };
        case UsersActionTypes.DeleteUser:
            return  {
                ...state,
                users: updateUserIsProcessing(state.users, action.payload)
            };
        case UsersActionTypes.DeleteUserSuccess:
            return  {
                ...state,
                users: deleteUser(state.users, action.payload)
            };
        default:
            return state;
    }
}

// Selectors
export const getSelectedUserId = (state: UsersState) => state.selectedUserId;
export const getAllUsers = (state: UsersState) => state.users;
export const getIsLoading = (state: UsersState) => state.isLoading;
export const getIsAdding = (state: UsersState) => state.isAdding;
