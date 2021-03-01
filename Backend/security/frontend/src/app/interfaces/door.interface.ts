export interface Door {
  readonly id: number;
  readonly type: string;
  readonly state: DoorState;
  readonly location: string;
}

export enum DoorState {
  LOCKED = "LOCKED",
  UNLOCKED = "UNLOCKED"
}
