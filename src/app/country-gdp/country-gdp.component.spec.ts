import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryGdpComponent } from './country-gdp.component';

describe('CountryGdpComponent', () => {
  let component: CountryGdpComponent;
  let fixture: ComponentFixture<CountryGdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryGdpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryGdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
