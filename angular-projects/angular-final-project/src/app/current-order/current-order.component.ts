import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-current-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-order.component.html',
  styleUrl: './current-order.component.css'
})
export class CurrentOrderComponent {
  showOrderItems:boolean=true; //hide and visible the order items

  toggleOrderItems(){
    this.showOrderItems=!this.showOrderItems;
  }
}
