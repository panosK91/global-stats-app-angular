import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataTableComponent } from "./data-table/data-table.component";
import { CountryLanguagesComponent } from "./country-languages/country-languages.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataTableComponent, CountryLanguagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'global-stats-app';
}
