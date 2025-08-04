import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  private peer!: RTCPeerConnection;
  private dataChannel!: RTCDataChannel;

  dataChannelOpen = signal(false);
  messages = signal<string[]>([]);

  constructor() {
    if (typeof RTCPeerConnection !== 'undefined') {
      this.peer = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
    } else {
      console.error('WebRTC is not supported in this environment.');
    }
  }

  async initCaller(): Promise<RTCSessionDescriptionInit | undefined> {
    try {
      this.dataChannel = this.peer.createDataChannel('chat');
      this.setupChannel();

      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);

      console.log('✅ Offer created and set as local description');
      return offer;
    } catch (error) {
      console.error('❌ Error creating offer:', error);
      return undefined;
    }
  }

  async initReceiver(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    this.peer.ondatachannel = (e) => {
      console.log('📥 Received data channel from caller');
      this.dataChannel = e.channel;
      this.setupChannel();
    };

    if (offer.type === 'offer') {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);

      console.log('✅ Answer created and set as local description');
      return answer;
    } else {
      console.warn('⚠️ Received SDP is not an offer.');
      throw new Error('Expected SDP offer, got: ' + offer.type);
    }
  }

  setRemoteDescription(desc: RTCSessionDescriptionInit) {
    return this.peer.setRemoteDescription(new RTCSessionDescription(desc));
  }

  send(msg: string) {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      this.dataChannel.send(msg);
      this.messages.update(messages => [...messages, msg]);
    } else {
      console.warn('❌ DataChannel not open. Cannot send message.');
    }
  }

  private setupChannel() {
    this.dataChannel.onopen = () => {
      console.log('✅ Data channel is open');
      this.dataChannelOpen.set(true);
    };

    this.dataChannel.onclose = () => {
      console.log('❌ Data channel is closed');
      this.dataChannelOpen.set(false);
    };

    this.dataChannel.onmessage = (event) => {
      this.messages.update(msgs => [...msgs, `Peer: ${event.data}`]);
    };
  }

  onIceCandidate(cb: (candidate: RTCIceCandidate) => void) {
    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('📡 ICE candidate:', event.candidate);
        cb(event.candidate);
      }
    };
  }

  addIceCandidate(candidate: RTCIceCandidateInit) {
    this.peer.addIceCandidate(new RTCIceCandidate(candidate))
      .then(() => console.log('✅ ICE candidate added'))
      .catch(error => console.error('❌ Error adding ICE candidate:', error));
  }
}
