import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface MessageModel {
  title: string;
  message: String;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends SimpleModalComponent<MessageModel, boolean> implements MessageModel {
  title: string;
  message: string;

  constructor() {
    super();
  }
}
