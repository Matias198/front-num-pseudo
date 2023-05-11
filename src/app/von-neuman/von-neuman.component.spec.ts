import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VonNeumanComponent } from './von-neuman.component';

describe('VonNeumanComponent', () => {
  let component: VonNeumanComponent;
  let fixture: ComponentFixture<VonNeumanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VonNeumanComponent]
    });
    fixture = TestBed.createComponent(VonNeumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
