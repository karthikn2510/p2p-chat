import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketChat } from './socket-chat';

describe('SocketChat', () => {
  let component: SocketChat;
  let fixture: ComponentFixture<SocketChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocketChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocketChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
