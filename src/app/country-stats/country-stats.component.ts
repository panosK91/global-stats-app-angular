import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; 
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-country-stats',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './country-stats.component.html',
  styleUrl: './country-stats.component.css'
})
export class CountryStatsComponent implements OnInit {
  countries: Array<{continentName: string, regionName: string, countryName: string, year: number, population: number, gdp:number}> = [];
  filteredCountries: Array<{continentName: string, regionName: string, countryName: string, year: number, population: number, gdp:number}> = [];  // Filtered array for display

  regions: [] = [];
  fromYear: number  = 0;
  searchQuery: string = '';  // Search query string
  toYear: number  = 0;
  selectedValue: string = '';

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;  // Default number of rows per page
  totalPages: number = 1;
  pagesArray: number[] = [];
  rowsPerPageOptions: number[] = [5, 10, 25, 50]; // Options for rows per page

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.fetchRegionsNames();
  }

  fetchRegionsNames() {
    this.http.get("http://localhost:4200/api/regions").subscribe((resp: any) => {
      this.regions = resp.map((region: any) => region.name);
    });
  }

  applyFilters() {
    this.fetchStats();
  }

  fetchStats() {
    let queryParams = '';

    if (this.selectedValue) {
      queryParams = `regionName=${this.selectedValue}`;
    }
    
    if (this.fromYear > 0) {
      queryParams += queryParams ? `&fromYear=${this.fromYear}` : `fromYear=${this.fromYear}`;
    }

    if (this.toYear) {
      queryParams += queryParams ? `&toYear=${this.toYear}` : `toYear=${this.toYear}`;
    }

    this.http.get(`http://localhost:4200/api/countries/search?${queryParams}`).subscribe((resp: any) => {
      this.countries = resp;
      this.calculatePagination(); // Recalculate pagination after fetching data
    });
  }

  // Search method to filter countries based on the search query only on the visible page data
  public searchCountries() {
    const query = this.searchQuery.toLowerCase();

    // Perform search on the entire filteredCountries before applying pagination
    this.filteredCountries = this.countries.filter(country => 
      country.continentName.toLowerCase().includes(query) ||
      country.regionName.toLowerCase().includes(query) || 
      country.countryName.toLowerCase().includes(query)
    );


    if (query == '') this.calculatePagination()
  }

  // Function to calculate the pagination based on itemsPerPage
  calculatePagination() {
    const itemsPerPage = Number(this.itemsPerPage);

    // Calculate the total number of pages based on the full filteredCountries array
    this.totalPages = Math.ceil(this.countries.length / itemsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Create an array of page numbers
    // After calculating pagination, slice the filteredCountries to show only the current page
    this.applyPagination();
  }

  applyPagination() {
    const itemsPerPage = Number(this.itemsPerPage);
    const start = (this.currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    // Slice the filteredCountries array to display only the countries on the current page
    this.filteredCountries = this.countries.slice(start, end);
  }

  // Move to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  // Move to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  // Set the current page
  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyPagination();
    }
  }

  // Set the number of rows per page and reset to the first page
  setRowsPerPage(rows: number) {
    this.itemsPerPage = rows;
    this.currentPage = 1; // Always reset to the first page when changing itemsPerPage
    this.calculatePagination(); // Recalculate the pagination after changing the page size
  }

  goBack(): void {
    this.location.back();  // Use Location service to go back
  }

  // Clear region selection and reset the dropdown
  clearSelection() {
    this.selectedValue = '';
  }


  
}
