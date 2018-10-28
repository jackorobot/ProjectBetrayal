import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AddActionModel {
  cells: any;
  teams: any;
}

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})

export class AddActionComponent
  extends SimpleModalComponent<AddActionModel, { origin: string, target: string, actionType: string, team: string }>
  implements AddActionModel {

  origin: string;
  target: string;
  actionType: string;
  team: string;

  cells: any;
  teams: any;

  constructor() {
    super();
  }

  add() {
    this.result = {
      origin: this.origin,
      target: this.target,
      actionType: this.actionType,
      team: this.team
    };
    this.close();
  }

}
