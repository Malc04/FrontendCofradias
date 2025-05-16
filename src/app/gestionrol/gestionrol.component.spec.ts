import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionrolComponent } from './gestionrol.component';

describe('GestionrolComponent', () => {
  let component: GestionrolComponent;
  let fixture: ComponentFixture<GestionrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionrolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
