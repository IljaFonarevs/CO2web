import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PDFFile } from './pdffile';

@Injectable({
  providedIn: 'root',
})
export class PdfFileService {
  private apiUrl = 'http://localhost:5000'; // Replace with your backend base URL
  private http: HttpClient;
  constructor(private https: HttpClient) {
    this.http = https;
  }

  /**
   * Upload a PDF file with associated user data and categories.
   * @param file PDF file to upload.
   * @param userId ID of the user uploading the file.
   * @returns Observable of the uploaded file's data.
   */
  uploadPdfFile(file: File, userId: number): Observable<PDFFile> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId.toString());

    return this.http.post<PDFFile>(`${this.apiUrl}/upload`, formData);
  }

  /**
   * Download a PDF file by ID.
   * @param fileId ID of the PDF file to download.
   * @returns Observable of the file as a Blob.
   */
  downloadPdfFile(fileId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${fileId}`, {
      responseType: 'blob', // Expect binary data for file download
    });
  }
}
