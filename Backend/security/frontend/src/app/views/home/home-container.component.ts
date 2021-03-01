import {Component} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {MainState} from "../../reducers/reducers";
import {AuthenticationService} from "../../services/authentication.service";
import {Door} from "../../interfaces/door.interface";
import {loadDoorsAction, loginAction, updateDoorAction} from "../../actions/app.actions";
import {selectIsUserPermittedForDoorChanges} from "../../reducers/app.reducer";

@Component({
  selector: "app-home",
  templateUrl: "./home-container.component.html",
  styleUrls: ["./home-container.component.scss"]
})
export class HomeContainerComponent {

  /**
   * The available doors.
   */
  doors$ = this.store.pipe(
    select(state => state.app.doors)
  );

  /**
   * If the user is permitted to open/close the available doors.
   */
  isUserPermittedForDoorChanges$ = this.store.pipe(
    select(selectIsUserPermittedForDoorChanges)
  );

  constructor(private store: Store<MainState>,
              public authService: AuthenticationService) {
  }

  /**
   * Publishes that the user has made a change to an existing door.
   * @param door The changed door.
   */
  publishDoorStateChange(door: Door): void {
    this.store.dispatch(updateDoorAction({door}));
  }

  /**
   * Reloads the list of available doors.
   */
  refreshDoorList(): void {
    this.store.dispatch(loadDoorsAction());
  }

  /**
   * Starts the login flow.
   */
  login(): void {
    this.store.dispatch(loginAction());
  }
}
