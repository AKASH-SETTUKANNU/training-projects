import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { CounterComponent } from './counter/counter.component';
import { ChildComponent } from './child/child.component';
import { FormsModule } from '@angular/forms';
import { SimpleMessageComponent } from './simple-message/simple-message.component';
import { HelloComponent } from './hello/hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterComponent, CommonModule, FormComponent, ListComponent, ChildComponent,FormsModule,SimpleMessageComponent,HelloComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //   carNames:string[]=[];
  // oncarAdded(carName: string) {
  //   console.log(carName, 'Form App');
  //   this.carNames.push(carName);
  // }
   itemList=[
    {id:1, name:'apple'},
    {id:1, name:'oragne'},
    {id:1, name:'mango'},
    {id:1, name:'grapes'},
    {id:1, name:'banana'}
   ];

   title='hello';

  toDate = new Date();
  message='';
  ngOnInit(): void {
      this.message="wellcome!";
  }
}
