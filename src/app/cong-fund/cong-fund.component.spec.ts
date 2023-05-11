import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongFundComponent } from './cong-fund.component';

describe('CongFundComponent', () => {
  let component: CongFundComponent;
  let fixture: ComponentFixture<CongFundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CongFundComponent]
    });
    fixture = TestBed.createComponent(CongFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
