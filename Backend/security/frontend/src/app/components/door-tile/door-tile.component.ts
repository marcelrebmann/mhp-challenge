import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Door, DoorState} from "../../interfaces/door.interface";

@Component({
  selector: "app-door-tile",
  templateUrl: "./door-tile.component.html",
  styleUrls: ["./door-tile.component.scss"]
})
export class DoorTileComponent implements OnInit {

  /**
   * The visible door.
   */
  @Input()
  door: Door = {} as Door;

  /**
   * If UI elements for opening/closing the door should be displayed.
   */
  @Input()
  isOpenClosePermitted = false;

  /**
   * Propagate that the user requested to open a door.
   */
  @Output()
  openDoor: EventEmitter<Door> = new EventEmitter<Door>();

  /**
   * Propagate that the user requested to close a door.
   */
  @Output()
  closeDoor: EventEmitter<Door> = new EventEmitter<Door>();

  public doorStates = DoorState;

  constructor() { }

  ngOnInit(): void {
  }
}
