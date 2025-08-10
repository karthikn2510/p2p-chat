import { Routes } from '@angular/router';
import { Chat } from './p2p-chat/p2p-chat';
import { SocketChat } from './wp-chat/wp-chat';
import { Login } from './login/login';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'wp-chat', component: SocketChat, canActivate: [authGuard] },
  { path: 'p2p-chat', component: Chat, canActivate: [authGuard] },
  { path: '**', redirectTo: ''}
];
