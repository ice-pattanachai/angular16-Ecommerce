import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductUserComponent } from './buy-product-user.component';

describe('BuyProductUserComponent', () => {
  let component: BuyProductUserComponent;
  let fixture: ComponentFixture<BuyProductUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyProductUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyProductUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
