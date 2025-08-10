import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-socket-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './wp-chat.html',
  styleUrl: './wp-chat.css'
})
export class SocketChat {
  username = '';
  room = '';
  message = '';
  joined = false;
  messages: { user: string, text: string }[] = [];
  typingUser: string | null = null;
  typingTimeout: any;
  roomUsers: { id: string, username: string }[] = [];

  constructor(private socket: SocketService) {
    this.socket.on('chat-message', (data) => {
      this.messages.push(data);
    });

    this.socket.on('typing', (data: { user: string }) => {
      this.typingUser = data.user;

      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        this.typingUser = null;
      }, 3000); // Remove after 3 seconds of no typing
    });

    this.socket.on('room-users', (users) => {
      this.roomUsers = users;
    })

  }

  ngOnInit() {
   this.username = localStorage.getItem('username') || '';
  }

  ngAfterViewChecked() {
    const el = document.getElementById('messages');
    if (el) el.scrollTop = el.scrollHeight;
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
      this.message = '';
    }
  }

  onTyping() {
    this.socket.emit('typing', { user: this.username, room: this.room });
  }


}
