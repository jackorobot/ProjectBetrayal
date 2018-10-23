import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Component } from '@angular/core';

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
       extends DialogComponent<AddActionModel, {origin: string, target: string, actionType: string, team: string}>
       implements AddActionModel {

  origin: string;
  target: string;
  actionType: string;
  team: string;

  cells: any;
  teams: any;

  constructor(dialogService: DialogService) {
    super(dialogService);
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
