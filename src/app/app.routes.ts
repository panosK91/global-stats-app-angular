import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryLanguagesComponent } from './country-languages/country-languages.component';
import { DataTableComponent } from './data-table/data-table.component'; // Import the DataTableComponent
import { CountryGdpComponent } from './country-gdp/country-gdp.component'; // Import the CountryGDPComponent
import { CountryStatsComponent } from './country-stats/country-stats.component'; // Import the CountryGDPComponent

import { MenuComponent } from './menu/menu.component'; // Import the MenuComponent

export const routes: Routes = [  
    { path: '', component: MenuComponent },
    { path: 'data-table', component: DataTableComponent },
    { path: 'country-languages/:countryCode', component: CountryLanguagesComponent },
    { path: 'country-gdp', component: CountryGdpComponent },
    { path: 'country-stats', component: CountryStatsComponent }
    ];


