import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatErrorComponent } from './cat-error.component';

describe('CatErrorComponent', () => {
  let component: CatErrorComponent;
  let fixture: ComponentFixture<CatErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
