import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePordersSellerComponent } from './manage-porders-seller.component';

describe('ManagePordersSellerComponent', () => {
  let component: ManagePordersSellerComponent;
  let fixture: ComponentFixture<ManagePordersSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePordersSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePordersSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
