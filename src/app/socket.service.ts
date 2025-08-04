import { Injectable } from "@angular/core";
import {io, Socket} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket: Socket;
    
    constructor() {
        this.socket = io('https://socket-server-hx0w.onrender.com/'); // Adjust the URL as needed
    }
    
    on(event: string, callback: (...args: any[]) => void) {
        this.socket.on(event, callback);
    }
    
    emit(event: string, data: any) {
        this.socket.emit(event, data);
    }
    
    disconnect() {
        this.socket.disconnect();
    }
}