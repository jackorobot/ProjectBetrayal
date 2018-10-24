import { TeamsService } from './../../teams.service';
import { CellsService } from './../../cells.service';
import { interval } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from '../../game.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  public interval = 300000;
  public gameState = 0;
  private timeStamp = 0;
  private counter: Observable<number>;
  private subscription: Subscription;
  public timeDisp: String;
  private diff: number;
  public teams: any;
  public winner: any;
  public returnwinner: any;

  constructor(private gameService: GameService,
    private cellsService: CellsService,
    private teamsService: TeamsService) { }

  timeString(millis) {
    const days = Math.floor(millis / 86400000);
    millis -= days * 86400000;
    const hours = Math.floor(millis / 3600000) % 24;
    millis -= hours * 3600000;
    const minutes = Math.floor(millis / 60000) % 60;
    millis -= minutes * 60000;
    const seconds = Math.floor(millis / 1000) % 1000;

    return [
      minutes,
      seconds > 9 ? seconds : '0' + seconds
    ].join(':');
  }

  ngOnInit() {
    this.updateGameState();

    this.teamsService.getAllTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.counter = interval(10000);

    this.counter.map((x) => {
      this.diff = Math.floor(this.timeStamp - new Date().getTime());
      if (this.diff < 0) {
        this.diff = 0;
      }

      this.updateGameState();

      return x;
    });

    this.subscription = this.counter.subscribe((x) => this.timeDisp = this.timeString(this.diff));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateInterval() {
    this.gameService.setRoundTime(this.interval).subscribe(res => {
      if (res.timestamp) {
        this.timeStamp = res.timestamp;
      }
    });
  }

  updateGameState() {
    this.gameService.getGameState().subscribe(state => {
      this.interval = state.interval;
      this.gameState = state.gamestate;
      this.timeStamp = state.timestamp;
      this.returnwinner = state.winner;
    });
  }
  startGame() {
    this.gameService.startGame(this.interval).subscribe(res => {
      if (res.gamestate !== undefined) {
        this.gameState = res.gamestate;
      }

      if (res.timestamp) {
        this.timeStamp = res.timestamp;
      }
    });
  }

  stopGame() {
    this.gameService.stopGame().subscribe(res => {
      if (res.gamestate !== undefined) {
        this.gameState = res.gamestate;
      }
    });
  }

  clearCells() {
    this.stopGame();
    this.cellsService.deleteAllCells().subscribe();
  }

  declareWinner(team) {
    this.stopGame();
    this.gameService.setWinner(team).subscribe();
  }
}
