import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingletonMsgComponent} from './singleton-msg.component';

describe('SingletonMsgComponent', () => {
  let component: SingletonMsgComponent;
  let fixture: ComponentFixture<SingletonMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingletonMsgComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingletonMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
