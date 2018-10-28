import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

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
  extends SimpleModalComponent<AddCellModel, { name: string, owner: string, neighbours: any }>
  implements AddCellModel {
  name: string;
  owner: string;
  neighbours: any = [];

  cells: any;
  teams: any;

  constructor() {
    super();
  }

  add() {
    this.result = { name: this.name, owner: this.owner, neighbours: this.neighbours };
    this.close();
  }

}
