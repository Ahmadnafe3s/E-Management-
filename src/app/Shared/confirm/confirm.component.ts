import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();
  
  onClose(): void {
    this.close.emit()
  }

  onOk(){
    this.ok.emit()
  }
}
