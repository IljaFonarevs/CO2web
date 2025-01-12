import { Component } from '@angular/core';
import { PdfFileService } from '../pdf.service'; // Adjust the path to your actual service
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, 
  imports: [CommonModule],
  selector: 'app-pdf-uploader',
  templateUrl: './pdf-uploader.component.html',
  styleUrls: ['./pdf-uploader.component.css'],
})
export class PdfUploaderComponent {
  showUploadSection = false;
  dragOver = false;

  categories: any[] = [];
  amount: any[] = [];
  emission: any[] = [];
  results: any[] = [];
  TotalAmount: number = 0;
  
  selectedFile: File | null = null;
  isLoading = false;
  reportCreated= true;
  reloadBtn = false;
  userId = 1; // Example user ID; you may retrieve this from a user service, JWT, etc.

  reportData: any[] = []; // This will store the data from the processed report
  errorMessage = '';

  constructor(private pdfService: PdfFileService) {}

  /**
   * Toggles the appearance of the upload section.
   */
  toggleUploadSection(): void {
    this.showUploadSection = !this.showUploadSection;
  }

  /**
   * Handles manual file selection from an <input> type="file"/>
   */
  onFileSelected(event: any): void {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  /**
   * Drag enter event to highlight the drop area.
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Allow drop
    this.dragOver = true;
  }

  /**
   * Drag leave event to un-highlight the drop area.
   */
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  /**
   * Drop event to get the dropped file(s).
   */
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      // Only take the first file for simplicity; adapt as needed.
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  /**
   * Uploads the PDF file using the PdfFileService, then shows table data.
   */
  onCreateReport(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select or drop a file first.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    this.pdfService.uploadPdfFile(this.selectedFile, this.userId).subscribe({
      next: (response) => {
        // Assume 'response' includes a 'data' property with the table data
        this.categories = response?.categories || [];
        this.amount = response?.amounts || [];
        this.emission = response?.emissions || [];
        this.isLoading = false;
        this.emission.forEach((item, index) => {
          this.emission[index] = item/1000;
          this.TotalAmount += this.emission[index];
        })
        this.reportCreated = false;
        this.reloadBtn = true;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message || 'File upload failed.';
        this.isLoading = false;
      },
    });
  }
  reload(){
    window.location.reload();
  }
}
