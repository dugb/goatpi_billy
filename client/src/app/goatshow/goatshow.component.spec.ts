import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoatshowComponent } from './goatshow.component';

describe('GoatshowComponent', () => {
  let component: GoatshowComponent;
  let fixture: ComponentFixture<GoatshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoatshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoatshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
