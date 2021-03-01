import {Injectable, OnDestroy} from "@angular/core";
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {BehaviorSubject, Subject} from "rxjs";
import {distinctUntilChanged, takeUntil, tap} from "rxjs/operators";

@Injectable()
export class AuthenticationService implements OnDestroy {

  /**
   * The OAuth configuration for communication with authentication server.
   * @private
   */
  private readonly authCodeFlowConfig: AuthConfig = {
    issuer: "http://localhost:8081/auth/realms/MHP",
    logoutUrl: "http://localhost:8081/auth/realms/MHP/protocol/openid-connect/logout",
    redirectUri: window.location.origin + "/home",
    clientId: "mhp-door-service",
    responseType: "code token id_token",
    scope: "openid profile email roles",
    dummyClientSecret: 'secret',
    showDebugInformation: true,
    requireHttps: false,
    oidc: true
  };

  private destroyed$ = new Subject();

  private isUserAuthenticated$ = new BehaviorSubject<boolean>(false);

  /**
   * If the user is currently authenticated and a valid access and id token exists.
   */
  public isAuthenticated$ = this.isUserAuthenticated$.pipe(
    distinctUntilChanged()
  );

  constructor(private oAuthService: OAuthService) {
    this.oAuthService.events.pipe(
      tap((ev) => {
        this.isUserAuthenticated$.next(this.oAuthService.hasValidAccessToken() && this.oAuthService.hasValidIdToken());
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   * Starts the OAuth login flow with the authentication server.
   * If no valid session with a valid access token and/or id token is present,
   * the user is redirected to the login form.
   */
  public login() {
    return this.oAuthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (!this.oAuthService.hasValidAccessToken() || !this.oAuthService.hasValidIdToken()) {
          this.oAuthService.initLoginFlow();
        }
      });
  }

  /**
   * Destroys the current session and invalidates the tokens.
   */
  public logout() {
    this.oAuthService.logOut();
  }

  /**
   * Initial method to check for existing valid sessions/tokens after bootstrapping the app.
   * This is needed to get the tokens after the user is redirected from the authentication
   * server (login form) back to the app.
   */
  public init() {
    this.oAuthService.configure(this.authCodeFlowConfig);
    return this.oAuthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => this.oAuthService.setupAutomaticSilentRefresh())
      .then(() => this.oAuthService.loadUserProfile())
  }
}
