import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfUploaderComponent } from './pdf-uploader/pdf-uploader.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PdfUploaderComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CO2web';
}
