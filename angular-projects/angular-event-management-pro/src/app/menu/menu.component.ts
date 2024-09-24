import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuItems: Array<{ name: string; link: string; icon: string }> = [];

  constructor(private menuService: MenuService) {}
  ngOnInit(): void {
    this.setMenuItems();
  }

  setMenuItems() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    const userRole = loggedInUser ? loggedInUser.userRole : ''; 
    console.log(userRole);
    this.menuItems = this.menuService.getMenuItems(userRole); 
  }
}
