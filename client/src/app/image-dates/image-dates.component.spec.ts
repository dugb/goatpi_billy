import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDatesComponent } from './image-dates.component';

describe('ImageDatesComponent', () => {
  let component: ImageDatesComponent;
  let fixture: ComponentFixture<ImageDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
