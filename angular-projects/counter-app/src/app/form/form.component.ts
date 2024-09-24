import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarService } from '../car.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent{
  //using decorator
  // @Output() carAdded=new EventEmitter<string>();
     carName='';

    constructor(private carService:CarService){

    }
     onSubmit(){
      console.log(this.carName);
      // send value using output decorator
      // this.carAdded.emit(this.carName);

      //sending the value using car service
      this.carService.addCarName(this.carName);
      this.carName=' ';
     }
      
     
}
