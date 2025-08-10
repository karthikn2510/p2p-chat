import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Loadingspinner } from './loadingspinner/loadingspinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AsyncPipe, Loadingspinner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('p2p-chat');
  user$: Observable<any>;

  constructor(public auth: AuthService) {
    this.user$ = this.auth.user$;
  }
}
