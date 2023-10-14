import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitRoomComponent } from './exit-room.component';

describe('ExitRoomComponent', () => {
  let component: ExitRoomComponent;
  let fixture: ComponentFixture<ExitRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
