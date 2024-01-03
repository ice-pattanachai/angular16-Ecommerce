import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartgoComponent } from './cartgo.component';

describe('CartgoComponent', () => {
  let component: CartgoComponent;
  let fixture: ComponentFixture<CartgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartgoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
