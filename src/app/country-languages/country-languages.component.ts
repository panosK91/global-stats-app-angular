import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet  } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-country-languages',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './country-languages.component.html',
  styleUrl: './country-languages.component.css'
})
export class CountryLanguagesComponent implements OnInit {
  countryCode: string | null = null;
  countryLanguages: any = null;
  countryName: string | null = null
  
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private location: Location) { }

  ngOnInit(): void {
    this.countryCode = this.route.snapshot.paramMap.get('countryCode');

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.countryName = navigation.extras.state['countryName'];  // Retrieve the country name from the state
    }

    if(this.countryCode) {
      this.http.get(`http://localhost:4200/api/countries/${this.countryCode}/languages`).subscribe(
        (languages: any) => {
          this.countryLanguages = languages;
        }
      );
    }
  }

  // Back navigation method
  goBack(): void {
    this.location.back();  // <-- Go back to the previous page
  }
}
