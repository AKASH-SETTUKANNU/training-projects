import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Users } from './user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  userName: string = '';
  userRole: string = '';
  userEmail: string = '';
  nameError: string = '';
  emailError: string = '';
  roleError: string = '';
  users: Users[] = [];
  nextId = 1;
  editingUserId: number | null = null;

  addUser() {
   
    this.nameError = '';
    this.emailError = '';
    this.roleError = '';

    if (this.userName.trim() === '') {
      this.nameError = 'Please enter user Name!';
    }

    if (this.userEmail.trim() === '') {
      this.emailError = 'Please enter user Email!';
    } else if (this.users.some(user => user.userEmail === this.userEmail && user.id !== this.editingUserId)) {
      this.emailError = 'Email already exists!';
    }

    if (this.userRole.trim() === '') {
      this.roleError = 'Please select a user Role!';
    }

    if (this.nameError || this.emailError || this.roleError) {
      return; 
    }

    if (this.editingUserId !== null) {
      const userIndex = this.users.findIndex(user => user.id === this.editingUserId);
      if (userIndex !== -1) {
        this.users[userIndex] = {
          id: this.editingUserId,
          userName: this.userName,
          userEmail: this.userEmail,
          userRole: this.userRole
        };
        this.editingUserId = null;
      }
    } else {
      this.users.push({
        id: this.nextId++,
        userName: this.userName,
        userEmail: this.userEmail,
        userRole: this.userRole
      });
    }

  
    this.userName = '';
    this.userEmail = '';
    this.userRole = '';
  }

  deleteUser(UserId: number) {
    this.users = this.users.filter(user => user.id !== UserId);
  }

  editUser(UserId: number) {
    const user = this.users.find(u => u.id === UserId);
    if (user) {
      this.userName = user.userName;
      this.userRole = user.userRole;
      this.userEmail = user.userEmail;
      this.editingUserId = UserId;
    }
  }
}
