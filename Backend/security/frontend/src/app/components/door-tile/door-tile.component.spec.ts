import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorTileComponent } from './door-tile.component';

describe('DoorTileComponent', () => {
  let component: DoorTileComponent;
  let fixture: ComponentFixture<DoorTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoorTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
