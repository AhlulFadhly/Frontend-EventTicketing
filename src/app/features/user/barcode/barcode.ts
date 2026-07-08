import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-barcode',
  imports: [MatIconModule, QRCodeComponent],
  templateUrl: './barcode.html',
  styleUrl: './barcode.scss',
})
export class Barcode {

  @Input() invoiceId: string = '';
  @Input() eventTitle: string = '';

  @Output() onClose = new EventEmitter<void>();

}
