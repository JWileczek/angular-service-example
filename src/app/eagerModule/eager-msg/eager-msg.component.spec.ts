import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EagerMsgComponent} from './eager-msg.component';

describe('EagerMsgComponent', () => {
  let component: EagerMsgComponent;
  let fixture: ComponentFixture<EagerMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EagerMsgComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EagerMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
