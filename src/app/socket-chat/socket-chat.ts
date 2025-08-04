import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-socket-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './socket-chat.html',
  styleUrl: './socket-chat.css'
})
export class SocketChat {
  username = '';
  room = '';
  message = '';
  joined = false;
  messages: { user: string, text: string }[] = [];

  constructor(private socket: SocketService) {
    this.socket.on('chat-message', (data) => {
      this.messages.push(data);
    });
  }

  joinRoom() {
    if (this.username && this.room) {
      this.socket.emit('join-room', { username: this.username, room: this.room });
      this.joined = true;
    }
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socket.emit('chat-message', {
        room: this.room,
        user: this.username,
        text: this.message
      });
      this.messages.push({ user: 'You', text: this.message });
      this.message = '';
    }
  }

}
