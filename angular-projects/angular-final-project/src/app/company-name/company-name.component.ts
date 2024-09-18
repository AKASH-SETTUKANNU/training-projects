import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-name',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './company-name.component.html',
  styleUrl: './company-name.component.css'
})
export class CompanyNameComponent {
  displayMenu:boolean=false;
  toggleMenu(){
    this.displayMenu=!this.displayMenu;
  }
}
