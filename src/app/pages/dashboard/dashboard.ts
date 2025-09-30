import { Component } from '@angular/core';
import { Nav } from '../../shared/nav/nav';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  isLogin=false;
  username = 'Marcos'
}
