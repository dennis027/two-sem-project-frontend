import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfContactComponent } from './prof-contact.component';

describe('ProfContactComponent', () => {
  let component: ProfContactComponent;
  let fixture: ComponentFixture<ProfContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
