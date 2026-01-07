import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleheader = new EventEmitter<void>();

  onHamburgerClick() {
    this.toggleSidebar.emit();
  }

  onHamburger1Click() {
    this.toggleheader.emit();
  }

}
