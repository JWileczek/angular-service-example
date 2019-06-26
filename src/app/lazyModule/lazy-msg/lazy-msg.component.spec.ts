import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LazyMsgComponent} from './lazy-msg.component';

describe('LazyMsgComponent', () => {
  let component: LazyMsgComponent;
  let fixture: ComponentFixture<LazyMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LazyMsgComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
