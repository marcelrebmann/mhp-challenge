import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Door} from "../interfaces/door.interface";
import {HttpClient} from "@angular/common/http";
import {OAuthService} from "angular-oauth2-oidc";

/**
 * Load and update doors.
 * This service is designed to interact with an OAuth2 protected API.
 */
@Injectable()
export class DoorService {

  // For development purposes, this is configured as a proxy via Angular.
  private static readonly DOORS_API_HOST = "/api"

  constructor(private http: HttpClient,
              private oauthService: OAuthService) {
  }

  /**
   * Loads all available doors from the API.
   */
  loadDoors(): Observable<Door[]> {
    return this.http.get<Door[]>(`${DoorService.DOORS_API_HOST}/v1/door`, this.getAuthenticationOptions());
  }

  /**
   * Update a specific door.
   * @param door The updated door.
   */
  updateDoorState(door: Door): Observable<Door> {
    return this.http.post<Door>(`${DoorService.DOORS_API_HOST}/v1/door`, door, this.getAuthenticationOptions());
  }

  /**
   * Constructs the request header for the required authentication with the API.
   * @private
   */
  private getAuthenticationOptions(): {headers: {[key: string]: string}} {
    return {
      headers: {
        "Authorization": "Bearer " + this.oauthService.getAccessToken()
      }
    }
  }
}
