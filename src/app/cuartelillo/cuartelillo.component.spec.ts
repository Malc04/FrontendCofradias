import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuartelilloComponent } from './cuartelillo.component';

describe('CuartelilloComponent', () => {
  let component: CuartelilloComponent;
  let fixture: ComponentFixture<CuartelilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuartelilloComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CuartelilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
