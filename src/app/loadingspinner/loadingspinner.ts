import { Component } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loadingspinner.html',
  styleUrl: './loadingspinner.css',
})
export class Loadingspinner {
constructor(public loadingService: LoadingService) { }
}
