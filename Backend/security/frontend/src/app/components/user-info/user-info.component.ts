import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {UserInfo} from "angular-oauth2-oidc";
import {BehaviorSubject} from "rxjs";
import {UserRoles} from "../../interfaces/user.roles";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.scss"]
})
export class UserInfoComponent implements OnInit, OnChanges {

  /**
   * The user info provided by the authentication server.
   */
  @Input()
  userInfo: UserInfo = {} as UserInfo;

  /**
   * The user's rights regarding the doors.
   */
  isReadAccessGranted$ = new BehaviorSubject<boolean>(false);
  isWriteAccessGranted$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.userInfo || !this.userInfo.realm_access || !this.userInfo.realm_access.roles) {
      this.isReadAccessGranted$.next(false);
      this.isWriteAccessGranted$.next(false);
      return;
    }
    this.isReadAccessGranted$.next(this.userInfo.realm_access.roles.indexOf(UserRoles.DOOR_VIEWER) !== -1);
    this.isWriteAccessGranted$.next(this.userInfo.realm_access.roles.indexOf(UserRoles.DOOR_USER) !== -1);
  }
}
