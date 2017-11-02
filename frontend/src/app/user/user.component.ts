import { MessageComponent } from './../message/message.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { TeamsService } from './../teams.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CellsService } from './../cells.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  teamCells: any = [];
  teamId: string;
  team: any = {};

  teams: any = [];
  cells: any = [];

  constructor(private dialogService: DialogService,
    private cellsService: CellsService,
    private teamsService: TeamsService,
    private router: Router) { }

  ngOnInit() {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this.teamId = JSON.parse(userString)._id;
    } else {
      this.router.navigate(['/user/login']);
    }

    this.getData();
    setInterval(() => {
      this.getData();
    }, 5000);
  }

  updateAction(cell) {
    if (cell._id === cell.target._id) {
      cell.actionType = 'defend';
    }else{
      this.cells.forEach(element => {
        if (element._id === cell.target._id && element.owner === cell.owner._id) {
          cell.actionType = 'defend';
        }
      });
    }

    if (cell.actionType === 'defend') {
      this.cells.forEach(element => {
        if (element._id === cell.target._id) {
          cell.team = element.owner;
        }
      });
    }else if (cell.actionType === 'attack') {
      this.cells.forEach(element => {
        if (element._id === cell.target._id && element.owner === cell.team){
          cell.team = cell.owner;
        }
      });
    }

    this.cellsService.updateCell(cell).subscribe(resp => {
      if (resp.errmsg) {
        // Popup with errmsg
        const messagePopup = this.dialogService.addDialog(MessageComponent, {
          title: resp.name,
          message: resp.errmsg
        }).subscribe();

        setTimeout( () => {
          messagePopup.unsubscribe();
        }, 10000);
      }

      this.getData();
    });
  }

  getData() {
    this.teamsService.getTeam(this.teamId).subscribe(team => {
      this.team = team;
    });

    this.cellsService.getAllCells().subscribe(cells => {
      this.cells = cells;
    });

    this.cellsService.getCellsByOwner(this.teamId).subscribe(cells => {
      this.teamCells = cells;
    });

    this.teamsService.getAllTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  helpBtn() {
    window.alert('NOPE.avi');
  }

  logoutBtn() {
    this.router.navigate(['/user/logout']);
  }
}
