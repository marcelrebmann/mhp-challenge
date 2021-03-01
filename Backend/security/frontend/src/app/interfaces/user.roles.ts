/**
 * The door service specific user roles.
 * DOOR_VIEWER -> Permission to view doors (read only)
 * DOOR_USER -> Permission to modify (open(close) doors
 */
export enum UserRoles {
  DOOR_VIEWER = "DOOR_VIEWER",
  DOOR_USER = "DOOR_USER"
}
