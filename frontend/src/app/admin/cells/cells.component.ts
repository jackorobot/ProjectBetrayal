import { AddCellComponent } from './../add-cell/add-cell.component';
import { MessageComponent } from '../../message/message.component';
import { ConfirmComponent } from './../confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { TeamsService } from '../../teams.service';
import { CellsService } from '../../cells.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css']
})
export class CellsComponent implements OnInit {
  cells: any = [];
  teams: any = [];

  constructor(private cellsService: CellsService,
    private teamsService: TeamsService,
    private dialogService: DialogService) { }

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

  updateCell(cell) {
    this.cellsService.updateCell(cell).subscribe(resp => {
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

  addCell() {
    const addCellPopup = this.dialogService.addDialog(AddCellComponent, {cells: this.cells, teams: this.teams})
    .subscribe(answer => {
      if (answer.name !== '' && answer.owner !== '') {
        this.cellsService.addCell(answer).subscribe(resp => {
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
  deleteCell(cell) {
    const confirmPopup = this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this cell?'
    }).subscribe( (isConfirmed) => {
      if (isConfirmed) {
        // Confirmed is true, so do delete
        this.cellsService.deleteCell(cell).subscribe(resp => {
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
