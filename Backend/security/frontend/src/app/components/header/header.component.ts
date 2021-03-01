import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UserInfo} from "angular-oauth2-oidc";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  /**
   * If the user is currently logged in / authenticated.
   */
  @Input()
  isLoggedIn: boolean = false;

  /**
   * The user info provided by the authentication server.
   */
  @Input()
  userInfo: UserInfo = {} as UserInfo;

  /**
   * Propagate user requested login requests.
   */
  @Output()
  loginRequested: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Propagate user requested logout requests.
   */
  @Output()
  logoutRequested: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  requestLogin(): void {
    this.loginRequested.emit();
  }

  requestLogout(): void {
    this.logoutRequested.emit();
  }

}
