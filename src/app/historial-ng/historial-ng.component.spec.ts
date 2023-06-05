import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialNgComponent } from './historial-ng.component';

describe('HistorialNgComponent', () => {
  let component: HistorialNgComponent;
  let fixture: ComponentFixture<HistorialNgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialNgComponent]
    });
    fixture = TestBed.createComponent(HistorialNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
