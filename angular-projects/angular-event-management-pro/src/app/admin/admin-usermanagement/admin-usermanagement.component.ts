import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-usermanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './admin-usermanagement.component.html',
  styleUrls: ['./admin-usermanagement.component.css'],
  providers: [DatePipe]
})
export class AdminUsermanagementComponent implements OnInit {
  users: User[] = [];
  newUser: User = { userName: '', userEmail: '', userPassword: '', userRole: 'user', userBirthDate: '' };
  editIndex: number | null = null;
  
 
  showNameError: boolean = false;
  showEmailError: boolean = false;
  showPasswordError: boolean = false;
  showBirthDateError: boolean = false;
  showSuccessMessage:boolean=false;
  showEmailExistError:boolean=false;
  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.displayUsers();
     
  }

  displayUsers() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  addUser() {
    
    this.validateFields();

    if (this.showNameError || this.showEmailError || this.showPasswordError || this.showBirthDateError) {
      return;
    }

    const emailExists = this.users.some(user => user.userEmail === this.newUser.userEmail);

    if (this.editIndex !== null) {
      if (emailExists && this.users[this.editIndex].userEmail !== this.newUser.userEmail) {
        alert();
        return;
      }
      this.users[this.editIndex] = { ...this.newUser };
      this.editIndex = null;
    } else {
      if (emailExists) {
        this.showEmailExistError=true;
        return;
      }
      this.users.push({ ...this.newUser });
    }

    localStorage.setItem('users', JSON.stringify(this.users));
    this.showSuccessMessage=true;
    this.displayUsers();
    this.resetForm();
  }

  validateFields() {
    this.showNameError = !this.newUser.userName;
    this.showEmailError = !this.newUser.userEmail;
    this.showPasswordError = !this.isPasswordStrong(this.newUser.userPassword);
    this.showBirthDateError = !this.newUser.userBirthDate;
  }

  isPasswordStrong(password: string): boolean {
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return strongPasswordPattern.test(password);
  }

  deleteUser(email: string) {
    this.users = this.users.filter(user => user.userEmail !== email);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.displayUsers();
  }

  editUser(index: number) {
    const user = this.users[index];
    if (user) {
      this.newUser = { ...user };
      this.editIndex = index;
    }
  }

  // Getter for formatted date for input
  get formattedUserBirthDate(): string {
    const [day, month, year] = this.newUser.userBirthDate.split('/');
    return `${year}-${month}-${day}`;
  }

  // Setter to update userBirthDate
  set formattedUserBirthDate(value: string) {
    const [year, month, day] = value.split('-');
    this.newUser.userBirthDate = `${day}/${month}/${year}`; 
  }

  resetForm() {
    this.newUser = { userName: '', userEmail: '', userPassword: '', userRole: 'user', userBirthDate: '' };
    this.showNameError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showBirthDateError = false;
  }

  validateOnBlur(field: string) {
    switch (field) {
      case 'userName':
        this.showSuccessMessage=false;
        this.showNameError = !this.newUser.userName;
        break;
      case 'userEmail':
        this.showSuccessMessage=false;
        this.showEmailError = !this.newUser.userEmail;
        break;
      case 'userPassword':
        this.showSuccessMessage=false;
        this.showPasswordError = !this.isPasswordStrong(this.newUser.userPassword);
        break;
      case 'userBirthDate':
        this.showSuccessMessage=false;
        this.showBirthDateError = !this.newUser.userBirthDate;
        break;
    }
  }
}
