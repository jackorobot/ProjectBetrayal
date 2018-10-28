import { AddActionComponent } from './../add-action/add-action.component';
import { CellsService } from '../../cells.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from './../confirm/confirm.component';
import { MessageComponent } from '../../message/message.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { TeamsService } from '../../teams.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  cells: any = [];
  teams: any = [];
  actions: any = [];

  constructor(
    private teamsService: TeamsService,
    private cellsService: CellsService,
    private simpleModalService: SimpleModalService) { }

  ngOnInit() {
    this.teamsService.getAllTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.updateList();
  }

  updateList() {
    this.cellsService.getAllCells().subscribe(cells => {
      this.cells = cells;
    });
  }

  updateAction(action) {
    this.cellsService.updateCell(action).subscribe(resp => {
      if (resp.message) {
        // Popup with message
        const messagePopup = this.simpleModalService.addModal(MessageComponent, {
          title: 'Message',
          message: resp.message
        }).subscribe();

        setTimeout(() => {
          messagePopup.unsubscribe();
        }, 10000);
      } else if (resp.errmsg) {
        // Popup with errmsg
        const messagePopup = this.simpleModalService.addModal(MessageComponent, {
          title: resp.name,
          message: resp.errmsg
        }).subscribe();

        setTimeout(() => {
          messagePopup.unsubscribe();
        }, 10000);
      }
    });
  }
}
