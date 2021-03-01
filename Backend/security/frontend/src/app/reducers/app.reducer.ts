import {Action, createReducer, createSelector, on} from "@ngrx/store";
import {Door} from "../interfaces/door.interface";
import {loadDoorsSuccessAction, setUserInfoAction, updateDoorSuccessAction} from "../actions/app.actions";
import {UserInfo} from "angular-oauth2-oidc";
import {MainState} from "./reducers";
import {UserRoles} from "../interfaces/user.roles";

export interface AppState {
  doors: Door[];
  accessToken: string;
  user: UserInfo
}

export const initialState: AppState = {
  doors: [],
  accessToken: "",
  user: {} as UserInfo
}

const _appReducer = createReducer(
  initialState,
  on(loadDoorsSuccessAction, (state, {doors}) => ({...state, doors: doors})),
  on(updateDoorSuccessAction, (state: AppState, {door}) => {
    const doors: Door[] = ([] as Door[]).concat(state.doors);
    const doorIndex = doors.findIndex(d => d.id === door.id);
    doors[doorIndex] = door;
    return {
      ...state,
      doors
    };
  }),
  on(setUserInfoAction, (state, {userInfo}) => ({...state, user: userInfo}))
)

export function appReducer(state: AppState | undefined, action: Action) {
  return _appReducer(state, action);
}

export const selectAppState = (state: MainState) => state.app;

/**
 * The user is permitted to open/close doors, if she/he was granted the 'DOOR_USER' role.
 */
export const selectIsUserPermittedForDoorChanges = createSelector(
  selectAppState,
  (state) => {
    const user = state.user;
    return !!user
    && user.realm_access
    && user.realm_access.roles
    && user.realm_access.roles.indexOf(UserRoles.DOOR_USER) !== -1
  }
  )
