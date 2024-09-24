import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from './task.model';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  newTask: string = '';
  tasks: Task[] = [];
  nextId: number = 1;
  editingTaskId: number | null = null;
  originalTaskName: string = '';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        id: this.nextId++,
        name: this.newTask.trim(),
        completed: false
      });
      this.newTask = '';
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    if (this.editingTaskId === taskId) {
      this.cancelEdit();
    }
  }

  editTask(taskId: number) {
    this.editingTaskId = taskId;
  }

  saveTask(taskId: number, newName: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task && newName.trim()) {
      task.name = newName.trim();
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editingTaskId = null;
  }

  toggleCompletion(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  }
}
