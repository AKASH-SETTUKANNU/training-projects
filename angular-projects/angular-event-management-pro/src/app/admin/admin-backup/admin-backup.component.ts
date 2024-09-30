import { Component } from '@angular/core';
import { BackupRestoreService } from '../../services/backup-restore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-backup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-backup.component.html',
  styleUrl: './admin-backup.component.css'
})
export class AdminBackupComponent  {
  fileInputVisible = false;
  selectedFileName = '';
  restoreSuccessMessage = '';
  restoreErrorMessage = '';
  backupHistory: string[] = [];
  restoreHistory: string[] = [];
  
  constructor(private backupRestoreService: BackupRestoreService) {
    this.loadHistory();
  }

  toggleFileInput() {
    this.fileInputVisible = !this.fileInputVisible;
  }

  backupData() {
    const fileName = this.backupRestoreService.backupData();
    this.backupHistory.push(fileName);
  }

  onFileSelected(event: Event) {
    const fileInput = (event.target as HTMLInputElement);
    const file = fileInput.files?.[0];
    if (file) {
      this.selectedFileName = file.name;
      this.backupRestoreService.restoreData(file).then(
        (message: string) => {
          this.restoreSuccessMessage = message;
          this.restoreHistory.push(file.name);
        },
        (error: string) => {
          this.restoreErrorMessage = error;
        }
      );
    }
  }

  clearBackupHistory() {
    this.backupRestoreService.clearBackupHistory();
    this.backupHistory = [];
  }

  clearRestoreHistory() {
    this.backupRestoreService.clearRestoreHistory();
    this.restoreHistory = [];
  }

  private loadHistory() {
    this.backupHistory = this.backupRestoreService.getBackupHistory();
    this.restoreHistory = this.backupRestoreService.getRestoreHistory();
  }
}