import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../storage/storage.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  emailError: string | null = null;
  passwordError: string | null = null;

  constructor(private router: Router, private userService: UserService, private storageService: StorageService) {}
 
   ngOnInit(): void {
       this.initializeDefaultAdmin();
   }
   private initializeDefaultAdmin():void{
    const existingUsers=this.userService.getAllUsers();
    if(existingUsers.length===0){
      const defaultAdmin:User={
         userName:'Akash',
         userEmail:'Akash123@gmail.com',
         userPassword:'Akash@2003',
         userRole:'admin',
         userBirthDate:'09/10/2003',
      };
      this.storageService.addUser(defaultAdmin);
      console.log("default Admin Created");
    }
   }
  emailErrorHandle(): void {
    this.emailError = null;
    if (this.email.trim() === '') {
      this.emailError = 'Please enter your Email...';
    } else if (!this.userService.isUserExists(this.email)) {
      this.emailError = 'User does not exist, please sign up...';
    }
  }

  passwordErrorHandle(): void {
    this.passwordError = null;
    const user = this.userService.getUserByEmail(this.email);
    if (this.password.trim() === '') {
      this.passwordError = 'Please enter your password...';
    } else if (user && user.userPassword !== this.password) {
      this.passwordError = 'Password does not match...';
    }
  }

  loginUser(): void {
    const user = this.userService.getUserByEmail(this.email);
    if (user && user.userPassword === this.password) {
      this.storageService.setLoggedInUser(user);
      if (user.userRole === 'admin') {
        this.router.navigate(['/admin/admin-index']);
      } else {
        alert(`Welcome, ${user.userName}!`);
        this.router.navigate(['/guest/guest-index']);
      }
    } else {
      alert('Invalid email or password.');
    }
  }
}
