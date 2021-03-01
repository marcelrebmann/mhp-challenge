import {createAction, props} from "@ngrx/store";
import {Door} from "../interfaces/door.interface";
import {UserInfo} from "angular-oauth2-oidc";

export enum AppActionTypes {
  LOAD_DOORS = "LOAD_DOORS",
  LOAD_DOORS_SUCCESS = "LOAD_DOORS_SUCCESS",
  UPDATE_DOOR = "UPDATE_DOOR",
  UPDATE_DOOR_SUCCESS = "UPDATE_DOOR_SUCCESS",
  REQUEST_FAILED = "REQUEST_FAILED",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_USER_INFO = "SET_USER_INFO",
  CHECK_AUTH = "CHECK_AUTH"
}

export const loadDoorsAction = createAction(AppActionTypes.LOAD_DOORS);
export const loadDoorsSuccessAction = createAction(AppActionTypes.LOAD_DOORS_SUCCESS, props<{doors: Door[]}>());

export const updateDoorAction = createAction(AppActionTypes.UPDATE_DOOR, props<{door: Door}>());
export const updateDoorSuccessAction = createAction(AppActionTypes.UPDATE_DOOR_SUCCESS, props<{door: Door}>());

export const setUserInfoAction = createAction(AppActionTypes.SET_USER_INFO, props<{userInfo: UserInfo}>());

export const requestFailedAction = createAction(AppActionTypes.REQUEST_FAILED);
export const loginAction = createAction(AppActionTypes.LOGIN);
export const logoutAction = createAction(AppActionTypes.LOGOUT);

export const checkAuthenticationAction = createAction(AppActionTypes.CHECK_AUTH);
