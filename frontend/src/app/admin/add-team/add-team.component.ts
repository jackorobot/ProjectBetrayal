import { SimpleModalComponent } from "ngx-simple-modal";
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})

export class AddTeamComponent extends SimpleModalComponent<{}, { name: string, color: string, username: string, password: string }> {
  name: string;
  color: string;
  username: string;
  password: string;

  constructor() {
    super();
  }

  add() {
    this.result = { name: this.name, color: this.color, username: this.username, password: this.password };
    this.close();
  }
}
