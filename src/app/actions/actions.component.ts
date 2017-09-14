import { ConfirmComponent } from './../confirm/confirm.component';
import { AddActionComponent } from './../add-action/add-action.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { CellsService } from './../cells.service';
import { TeamsService } from './../teams.service';
import { ActionsService } from './../actions.service';
import { Component, OnInit } from '@angular/core';
import { MessageComponent} from '../message/message.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  cells: any = [];
  teams: any = [];
  actions: any = [];

  constructor(private actionsService: ActionsService,
    private teamsService: TeamsService,
    private cellsService: CellsService,
    private dialogService: DialogService) { }

    ngOnInit() {
      this.teamsService.getAllTeams().subscribe(teams => {
        this.teams = teams;
      });

      this.cellsService.getAllCells().subscribe(cells => {
        this.cells = cells;
      });

      this.updateList();
    }

    updateList() {
      this.actionsService.getAllActions().subscribe(actions => {
        this.actions = actions;
      });
    }

    updateAction(action) {
      this.actionsService.updateAction(action).subscribe(resp => {
        if (resp.message) {
          // Popup with message
          const messagePopup = this.dialogService.addDialog(MessageComponent, {
            title: 'Message',
            message: resp.message
          }).subscribe();

          setTimeout( () => {
            messagePopup.unsubscribe();
          }, 10000);
        } else if (resp.errmsg) {
          // Popup with errmsg
          const messagePopup = this.dialogService.addDialog(MessageComponent, {
            title: resp.name,
            message: resp.errmsg
          }).subscribe();

          setTimeout( () => {
            messagePopup.unsubscribe();
          }, 10000);
        }
      });
    }
    addAction() {
      const addActionPopup = this.dialogService.addDialog(AddActionComponent, {cells: this.cells, teams: this.teams})
      .subscribe(answer => {
        if (answer.target !== '' && answer.origin !== '' && answer.actionType !== '' && answer.team !== '') {
          this.actionsService.addAction(answer).subscribe(resp => {
            if (resp.message) {
              // popup with message
              const messagePopup = this.dialogService.addDialog(MessageComponent, {
                title: 'Message',
                message: resp.message
              }).subscribe();

              setTimeout( () => {
                messagePopup.unsubscribe();
              }, 10000);
            } else if (resp.errmsg) {
              // Popup with errmsg
              const messagePopup = this.dialogService.addDialog(MessageComponent, {
                title: resp.name,
                message: resp.errmsg
              }).subscribe();

              setTimeout( () => {
                messagePopup.unsubscribe();
              }, 10000);
            }
          });

          this.updateList();
        }
      });

    }
    deleteAction(action) {
      const confirmPopup = this.dialogService.addDialog(ConfirmComponent, {
        title: 'Confirm delete',
        message: 'Are you sure you want to delete this action?'
      }).subscribe( (isConfirmed) => {
        if (isConfirmed) {
          // Confirmed is true, so do delete
          this.actionsService.deleteAction(action).subscribe(resp => {
            if (resp.message) {
              // Popup with message
              const messagePopup = this.dialogService.addDialog(MessageComponent, {
                title: 'Message',
                message: resp.message
              }).subscribe();

              setTimeout( () => {
                messagePopup.unsubscribe();
              }, 10000);
            } else if (resp.errmsg) {
              // Popup with errmsg
              const messagePopup = this.dialogService.addDialog(MessageComponent, {
                title: resp.name,
                message: resp.errmsg
              }).subscribe();

              setTimeout( () => {
                messagePopup.unsubscribe();
              }, 10000);
            }
          });

          // Update the list of cells
          this.updateList();
        } else {
          // Exit this function, do not delete
          return false;
        }
      });

      setTimeout( () => {
        confirmPopup.unsubscribe();
      }, 10000);
    }
  }
