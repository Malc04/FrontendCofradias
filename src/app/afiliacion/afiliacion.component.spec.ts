import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliacionComponent } from './afiliacion.component';

describe('AfiliacionComponent', () => {
  let component: AfiliacionComponent;
  let fixture: ComponentFixture<AfiliacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfiliacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
