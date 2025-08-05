import { Component } from '@angular/core';
import { WebrtcService } from '../webrtc.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../socket.service';
import { IncomingCall } from '../incoming-call/incoming-call';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, ],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {

  input = '';
  messages: any;
  isCaller: any;

  constructor(public webrtc: WebrtcService,
    private socket: SocketService
  ) {
    this.messages = this.webrtc.messages;

    this.socket.on('offer', async ({offer}) => {
      const answer = await this.webrtc.initReceiver(offer);
      this.socket.emit('answer', {answer, roomId: 'chat-room'});
    })

    this.socket.on('answer', ({answer}) => {
      if (this.isCaller) {
      this.webrtc['peer'].setRemoteDescription(answer);
      }
    });

    this.socket.on('ice-candidate', ({candidate}) => {
      this.webrtc.addIceCandidate(candidate);
    });

    this.webrtc.onIceCandidate((candidate) => {
      this.socket.emit('ice-candidate', {candidate, roomId: 'chat-room'});
    });
  }

  start(isCaller: boolean) {
    this.isCaller = isCaller;
    this.socket.emit('join', 'chat-room');
    if (isCaller) {
      this.webrtc.initCaller().then(offer => {
        console.log('Send this offer to peer:', offer);
        this.socket.emit('offer', {roomId: 'chat-room',offer});
      });
    }
  }

  send() {
    this.webrtc.send(this.input);
    this.input = '';
  }
}
