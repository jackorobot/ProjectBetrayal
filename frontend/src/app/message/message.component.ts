import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface MessageModel {
  title: string;
  message: String;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends DialogComponent<MessageModel, boolean> implements MessageModel {
  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}
