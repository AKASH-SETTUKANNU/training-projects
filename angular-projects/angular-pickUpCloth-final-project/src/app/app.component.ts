import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PickupOrderComponent } from './pickup-order/pickup-order.component';
import { LastOrderComponent } from './last-order/last-order.component';
import { CurrentOrderComponent } from './current-order/current-order.component';
import { NextOrderComponent } from './next-order/next-order.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CompanyNameComponent } from './company-name/company-name.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProfileComponent,PickupOrderComponent,LastOrderComponent,CurrentOrderComponent,NextOrderComponent,MenuBarComponent,CompanyNameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-final-project';
}
