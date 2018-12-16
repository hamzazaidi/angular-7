import * as fromUsers from './users/users.reducer';
import { ActionReducer, MetaReducer, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
    usersState: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
    usersState: fromUsers.usersReducer
};

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [debug];

// Users Selectors
export const selectUsersState = createFeatureSelector<fromUsers.UsersState>('usersState');

export const selectAllUsers = createSelector(
    selectUsersState,
    fromUsers.getAllUsers
);

export const selectUsersIsLoading = createSelector(
    selectUsersState,
    fromUsers.getIsLoading
);

export const selectUserIsAdding = createSelector(
    selectUsersState,
    fromUsers.getIsAdding
);

export const selectSelectedUserId = createSelector(
    selectUsersState,
    fromUsers.getSelectedUserId
);

