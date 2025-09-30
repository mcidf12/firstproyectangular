import { Component } from '@angular/core';
import { Nav } from '../../shared/nav/nav';

@Component({
  selector: 'app-dashboard',
  imports: [Nav],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  isLogin=false;

}
