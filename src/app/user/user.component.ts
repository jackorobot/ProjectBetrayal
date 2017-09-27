import { TeamsService } from './../teams.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CellsService } from './../cells.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {
  teamCells: any = [];
  teamId: string;
  team: any = {};

  teams: any = [];
  cells: any = [];

  constructor(private cellsService: CellsService,
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
  }

  ngOnChanges() {
    if (this.teamId) {

    }
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
