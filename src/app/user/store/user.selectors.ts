import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './user.reducer';

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

