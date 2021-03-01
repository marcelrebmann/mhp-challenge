import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Door, DoorState} from "../../interfaces/door.interface";

@Component({
  selector: 'app-door-list',
  templateUrl: './door-list.component.html',
  styleUrls: ['./door-list.component.scss']
})
export class DoorListComponent implements OnInit {

  /**
   * The list of doors to show.
   */
  @Input()
  doors: Door[] = [];

  /**
   * If the user is enabled to make changes to the doors.
   */
  @Input()
  areChangesEnabled = false;

  /**
   * Propagate a door that was modified by the user.
   */
  @Output()
  doorStateChanged: EventEmitter<Door> = new EventEmitter<Door>();

  /**
   * Propagate that the user requested a refresh of the door list.
   */
  @Output()
  refreshRequested: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  openDoor(door: Door): void {
    this.emitDoorStateChange(door, DoorState.UNLOCKED);
  }

  closeDoor(door: Door): void {
    this.emitDoorStateChange(door, DoorState.LOCKED);
  }

  requestRefresh(): void {
    this.refreshRequested.emit();
  }

  /**
   * Sets a new door state and propagates the changed door.
   * @param door The door to change.
   * @param newDoorState The new state to apply to the door.
   * @private
   */
  private emitDoorStateChange(door: Door, newDoorState: DoorState): void {
    this.doorStateChanged.emit({
      ...door,
      state: newDoorState
    });
  }
}
