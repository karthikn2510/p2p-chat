import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incoming-call',
  standalone: true,
  imports: [],
  templateUrl: './incoming-call.html',
  styleUrl: './incoming-call.css'
})
export class IncomingCall {
  @Input() callerName = 'Unknown';
  @Output() accept = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();

  onAccept() {
    this.accept.emit();
  }

  onReject() {
    this.reject.emit();
  }
}
