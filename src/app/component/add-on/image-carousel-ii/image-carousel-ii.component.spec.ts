import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCarouselIIComponent } from './image-carousel-ii.component';

describe('ImageCarouselIIComponent', () => {
  let component: ImageCarouselIIComponent;
  let fixture: ComponentFixture<ImageCarouselIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCarouselIIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCarouselIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
