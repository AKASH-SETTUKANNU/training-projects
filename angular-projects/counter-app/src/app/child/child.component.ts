import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],  
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnChanges {
  @Input() items: any[] = [];
  @Input() title: string = '';  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      console.log("Items Property Changed", changes['items']);
    }
    
    if (changes['title']) {
      console.log("Title Property Changed", changes['title']);
    }
  }
}
