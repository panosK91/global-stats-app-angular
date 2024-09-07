import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing

@Component({
  selector: 'app-menu',
  standalone: true,  // <-- Standalone component
  imports: [RouterModule],  // <-- Import RouterModule to use `routerLink`
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent { }
