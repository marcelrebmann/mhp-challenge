import {appReducer, AppState} from "./app.reducer";

export interface MainState {
  app: AppState
}

export const reducers = {
  app: appReducer
}
