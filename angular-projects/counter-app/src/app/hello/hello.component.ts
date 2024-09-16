import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
export class HelloComponent implements AfterViewInit
{
  //focus the input once view Initialized
  @ViewChild('nameInput') nameInput!:ElementRef;
  ngAfterViewInit(): void {
      this.nameInput.nativeElement.focus();
      console.log('Input focused!')
  }
}
