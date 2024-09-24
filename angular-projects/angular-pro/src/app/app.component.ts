import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{FormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponentna {
  title = 'koushik';
  placehold="enter text to Display."
  clickCount=0
  clickMe(){
    this.clickCount++;
  }
}

// export class AppComponent {
//   title = 'Akash';
// }
