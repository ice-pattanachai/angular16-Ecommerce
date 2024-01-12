import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUserAllComponent } from './setting-user-all.component';

describe('SettingUserAllComponent', () => {
  let component: SettingUserAllComponent;
  let fixture: ComponentFixture<SettingUserAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingUserAllComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingUserAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
