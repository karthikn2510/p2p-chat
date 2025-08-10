import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loadingspinner } from './loadingspinner';

describe('Loadingspinner', () => {
  let component: Loadingspinner;
  let fixture: ComponentFixture<Loadingspinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loadingspinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loadingspinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
