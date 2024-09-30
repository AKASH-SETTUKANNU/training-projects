import { StorageService } from './../storage/storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackupRestoreService {

  constructor(private StorageService:StorageService) { }
  backupData(): string {
    const allStorageData: { [key: string]: string | null } = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        allStorageData[key] = localStorage.getItem(key);
      }
    }

    const jsonData = JSON.stringify({
      localStorage: allStorageData
    });

    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const user= this.StorageService.getLoggedInUser();
    const date = new Date();
const formattedDate = date.toISOString().split('T')[0]; 
const formattedTime = date.toTimeString().split(' ')[0].replace(/:/g, ':');

const fileName = `backup-${user?.userName}-date=>${formattedDate}-time=>${formattedTime}.json`;

console.log(fileName);


    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);

    this.saveBackupHistory(fileName);
    return fileName;
  }

  async restoreData(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const fileContent = event.target?.result as string;
          const parsedContent = JSON.parse(fileContent);

          if (parsedContent.localStorage) {
            Object.keys(parsedContent.localStorage).forEach(key => {
              localStorage.setItem(key, parsedContent.localStorage[key]);
            });
          }
          this.saveRestoreHistory(file.name);
          resolve('Data restored successfully.');
        } catch (error) {
          reject('Error restoring data. Please try again.');
        }
      };

      reader.onerror = () => {
        reject('Error reading file. Please ensure it is a valid JSON file.');
      };

      reader.readAsText(file);
    });
  }

  getBackupHistory(): string[] {
    const history = localStorage.getItem('backupHistory');
    return history ? JSON.parse(history) : [];
  }

  getRestoreHistory(): string[] {
    const history = localStorage.getItem('restoreHistory');
    return history ? JSON.parse(history) : [];
  }

  clearBackupHistory() {
    localStorage.removeItem('backupHistory');
  }

  clearRestoreHistory() {
    localStorage.removeItem('restoreHistory');
  }

  private saveBackupHistory(fileName: string) {
    console.log("e");
    const history = this.getBackupHistory();
    history.push(fileName);
    localStorage.setItem('backupHistory', JSON.stringify(history));
  }

  private saveRestoreHistory(fileName: string) {
    const history = this.getRestoreHistory();
    history.push(fileName);
    localStorage.setItem('restoreHistory', JSON.stringify(history));
  }
}
