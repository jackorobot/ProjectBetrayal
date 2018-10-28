import { CellsService } from './../cells.service';
import { Component, OnInit } from '@angular/core';
import { MessageComponent } from './../message/message.component';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { TeamsService } from './../teams.service';

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

  constructor(private simpleModalService: SimpleModalService,
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
    } else {
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
    } else if (cell.actionType === 'attack') {
      this.cells.forEach(element => {
        if (element._id === cell.target._id && element.owner === cell.team) {
          cell.team = cell.owner;
        }
      });
    }

    this.cellsService.updateCell(cell).subscribe(resp => {
      if (resp.errmsg) {
        // Popup with errmsg
        const messagePopup = this.simpleModalService.addModal(MessageComponent, {
          title: resp.name,
          message: resp.errmsg
        }).subscribe();

        setTimeout(() => {
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
    // Popup with message
    const messagePopup = this.simpleModalService.addModal(MessageComponent, {
      title: 'Help',
      message: 'Het doel van dit spel is om de meeste cellen in bezit te hebben.\
                Dit doe je door zo veel mogelijk cellen over te nemen van je tegenstanders.\
                Iedere ronde krijgt een cel de kans om een actie uit te voeren.\
                Elke ronde heeft een cel 20 eenheden voor de eigenaar om mee te beginnen.\
                Bij elke actie worden er 10 eenheden van de eigenaar gehaald, en verplaatst naar de gekozen target namens het team dat\
                opgegeven is. Hiermee kan je dus aanvallen of verdedigen namens jezelf of andere teams. Wanneer een team een cell van\
                zichzelf heeft getarget is het altijd een DEFEND actie, en krijgt deze speler een bonus eenheid erbij.\
                Dan wordt er dus 10 eenheden weggehaald bij de originele cell, en 11 bij de target cel opgeteld.\
                Na elke ronde wordt er per cel gekeken welk team de meeste eenheden heeft staan op een bepaalde cel. Bij gelijkspel\
                blijft de originele eigenaar staan. Dus onthoud dat als je aanvalt met een cel, je daar maar 10 eenheden overhoudt!'
    }).subscribe();
  }

  logoutBtn() {
    this.router.navigate(['/user/logout']);
  }
}
