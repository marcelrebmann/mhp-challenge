import { Component } from "@angular/core";
import {checkAuthenticationAction, loginAction, logoutAction} from "./actions/app.actions";
import {select, Store} from "@ngrx/store";
import {AuthenticationService} from "./services/authentication.service";
import {Observable} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {MainState} from "./reducers/reducers";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  readonly title = "Door App";

  /**
   * The user info provided by the authentication server.
   */
  userInfo$ = this.store.pipe(
    select(state => state.app.user)
  );

  /**
   * If the user is currently logged in / authenticated.
   */
  isLoggedIn$: Observable<boolean> = this.authService.isAuthenticated$.pipe(
    distinctUntilChanged()
  );

  constructor(private store: Store<MainState>,
              private authService: AuthenticationService) {
    this.store.dispatch(checkAuthenticationAction());
  }

  /**
   * Starts the login flow.
   */
  onLogin(): void {
    this.store.dispatch(loginAction());
  }

  /**
   * Starts the logout flow.
   */
  onLogout(): void {
    this.store.dispatch(logoutAction());
  }
}
