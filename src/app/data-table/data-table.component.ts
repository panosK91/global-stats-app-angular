

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; 
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {
  countries: Array<{name: string, area: string, countryCode2: string}> = [];
  filteredCountries: Array<{name: string, area: string, countryCode2: string}> = [];
  searchQuery: string = '';  // Search query string


  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;  // Default number of rows per page
  totalPages: number = 1;
  pagesArray: number[] = [];
  rowsPerPageOptions: number[] = [5, 10, 25, 50]; // Options for rows per page
  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.fetchDetails();
  }

  public fetchDetails() {
    this.http.get("http://localhost:4200/api/countries/ordered").subscribe(
      (resp: any) => {
        this.countries = resp.map((country: any) => ({
          name: country.name,
          area: country.area,
          countryCode2: country.countryCode2
        }));

        // Initially display all countries
        this.filteredCountries = this.countries;
        this.calculatePagination()
      }
    );
  }

  // Search method to filter countries based on the search query
  public searchCountries() {
    const query = this.searchQuery.toLowerCase();

    this.filteredCountries = this.countries.filter(country => 
      country.name.toLowerCase().includes(query) || 
      country.area.includes(query) || 
      country.countryCode2.toLowerCase().includes(query)
    );

    if (query == '') this.calculatePagination()
    
  }

  // Navigate to detail page with the country code
  public navigateToDetail(countryCode: string, countryName: string) {
    this.router.navigate(['/country-languages', countryCode], { state: { countryName: countryName } });
  }


  // Function to calculate the pagination based on itemsPerPage
  calculatePagination() {
    const itemsPerPage = Number(this.itemsPerPage)
    this.totalPages = Math.ceil(this.filteredCountries.length / itemsPerPage);
    this.pagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Create an array of page numbers
    this.applyPagination(); // Apply pagination to display the correct data
  }

  applyPagination() {
    // Calculate the correct slice for the current page based on itemsPerPage
    const itemsPerPage = Number(this.itemsPerPage)
    const start = (this.currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
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
}
