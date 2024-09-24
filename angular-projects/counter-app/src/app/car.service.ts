import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  private carNamesSubject = new BehaviorSubject<string[]>([]);
  carName$ = this.carNamesSubject.asObservable();

  addCarName(name: string) {
    const currentNames = this.carNamesSubject.getValue();
    const updatedNames = [...currentNames, name];
    this.carNamesSubject.next(updatedNames);
  }
}
