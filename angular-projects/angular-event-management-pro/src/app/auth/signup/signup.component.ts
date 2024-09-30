import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { StorageService } from '../../storage/storage.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  userName: string = '';
  email: string = '';
  birthDate: string = '';
  password: string = '';
  confirmPassword: string = '';

  nameErrorMsg: string | null = null;
  emailErrorMsg: string | null = null;
  dateErrorMsg: string | null = null;
  passwordErrorMsg: string | null = null;

  constructor(private router: Router, private userService: UserService,private storageService:StorageService) {}

  nameError() {
    this.nameErrorMsg = this.userName.trim() === '' ? 'Enter a name..' : null;
  }

  emailError() {
    if (this.email.trim() === '') {
      this.emailErrorMsg = 'Enter an Email..';
    } else if (this.userService.isUserExists(this.email)) {
      this.emailErrorMsg = 'Email already exists..';
    } else {
      this.emailErrorMsg = null;
    }
  }

  dateError() {
    this.dateErrorMsg = this.birthDate === '' ? 'Enter a Date of Birth..' : null;
  }

  passwordInputError() {
    this.passwordErrorMsg = this.password !== this.confirmPassword ? 'Passwords do not match.' : null;
  }

  addUser() {
    if (!this.nameErrorMsg && !this.emailErrorMsg && !this.dateErrorMsg && !this.passwordErrorMsg) {
      const newUser: User = {
        userName: this.userName,
        userEmail: this.email,
        userPassword: this.password,
        userRole: 'user', 
        userBirthDate: this.birthDate,
        invitations:[],
        notifications: [] 
      };
      
      this.storageService.addUser(newUser);
      alert('Account created!');
      this.router.navigate(['/login']);
    } else {
      alert('Please fix the errors before submitting.');
    }
  }
}
