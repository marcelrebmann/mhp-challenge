import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  AppActionTypes,
  loadDoorsAction,
  loadDoorsSuccessAction,
  requestFailedAction,
  setUserInfoAction,
  updateDoorSuccessAction
} from "../actions/app.actions";
import {catchError, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {DoorService} from "../services/door.service";
import {Door} from "../interfaces/door.interface";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable()
export class AppEffects {

  /**
   * Initial check, if the user is already authenticated via OAuth on application bootstrapping.
   * If the user is authenticated, the retrieved user info is saved and the available doors get loaded.
   */
  checkAuthentication$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.CHECK_AUTH),
    mergeMap(() => fromPromise(this.authenticationService.init()).pipe(
      switchMap(userInfo => [
        setUserInfoAction({userInfo}),
        loadDoorsAction()
      ]),
      catchError(() => of(requestFailedAction()))
    ))
  ));

  /**
   * Triggers the OAuth login flow to authenticate the user.
   */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.LOGIN),
    tap(() => this.authenticationService.login())
  ), {dispatch: false});

  /**
   * Triggers the OAuth flow to logout the user.
   */
  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.LOGOUT),
    tap(() => of(this.authenticationService.logout()))
  ), {dispatch: false})

  /**
   * Loads the available doors from the resource server API.
   */
  loadDoors$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.LOAD_DOORS),
    mergeMap(() => this.doorService.loadDoors().pipe(
      map((doors: Door[]) => {
        return loadDoorsSuccessAction({doors});
      }),
      catchError((err) => {
        return of(requestFailedAction())
      })
      )
    )
  ));

  /**
   * Sends an updated door to the resource server API.
   */
  updateDoor$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.UPDATE_DOOR),
    mergeMap((action) => this.doorService.updateDoorState((action as any).door).pipe(
      map((updatedDoor) => updateDoorSuccessAction({door: updatedDoor})),
      catchError(() => of(requestFailedAction()))
    ))
  ));

  constructor(private actions$: Actions,
              private authenticationService: AuthenticationService,
              private doorService: DoorService) {
  }

}

