import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Component } from '@angular/core';

export interface AddCellModel {
  cells: any;
  teams: any;
}

@Component({
  selector: 'app-add-cell',
  templateUrl: './add-cell.component.html',
  styleUrls: ['./add-cell.component.css']
})

export class AddCellComponent
       extends DialogComponent<AddCellModel, {name: string, owner: string, neighbours: any}>
       implements AddCellModel {
  name: string;
  owner: string;
  neighbours: any = [];

  cells: any;
  teams: any;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  add() {
    this.result = {name: this.name, owner: this.owner, neighbours: this.neighbours};
    this.close();
  }

}
