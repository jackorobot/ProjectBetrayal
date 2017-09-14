import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent extends DialogComponent<{}, {name: string, color: string}> {
  name: string;
  color: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  add() {
    this.result = {name: this.name, color: this.color};
    this.close();
  }
}
