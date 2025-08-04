import { Routes } from '@angular/router';
import { Chat } from './chat/chat';
import { SocketChat } from './socket-chat/socket-chat';

export const routes: Routes = [
  { path: 'wp-chat', component: SocketChat },
  { path: 'p2p-chat', component: Chat},
  { path: '', redirectTo: 'wp-chat', pathMatch: 'full' }, // optional default route
  { path: '**', redirectTo: 'wp-chat' }
];
