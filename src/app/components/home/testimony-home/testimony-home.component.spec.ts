import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyHomeComponent } from './testimony-home.component';

describe('TestimonyHomeComponent', () => {
  let component: TestimonyHomeComponent;
  let fixture: ComponentFixture<TestimonyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonyHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
