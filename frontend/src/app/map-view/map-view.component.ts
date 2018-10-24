import { GameService } from './../game.service';
import { TeamsService } from './../teams.service';
import { CellsService } from './../cells.service';
import { Component, ViewChild, ElementRef, AfterViewInit, Input , OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { interval } from 'rxjs';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements AfterViewInit, OnChanges {
  public _width: number;
  public _height: number;
  private canvas: CanvasRenderingContext2D;

  private counter: Observable<number>;
  private subscription: any;
  private diff: number;
  private timeStamp = 0;
  public gameState = 0;
  public winner = '';
  public timeDisp = '';

  private cells: any = [];
  private teams: any = [];

  @ViewChild('mapView') mapView: ElementRef;

  constructor(private el: ElementRef,
    private cellsService: CellsService,
    private teamsService: TeamsService,
    private gameService: GameService) {
      this._width = 1280;
      this._height = 1024;
  }

  ngAfterViewInit() {
    this.counter = interval(1000);
    this.counter.map((x) => {
      this.diff = Math.floor(this.timeStamp - new Date().getTime());
      if (this.diff < 0) {
        this.diff = 0;
      }
      return x;
    });

    this.subscription = this.counter.subscribe((x) => this.timeDisp = this.timeString(this.diff));

    this.canvas = this.mapView.nativeElement.getContext('2d');

    this.updateCanvas();
    setInterval(() => {
      this.updateCanvas();
      this.updateGameState();
    }, 1000);
  }

  ngOnChanges() {
    if (this.canvas) {
      this.updateCanvas();
    }
  }

  updateGameState() {
    this.gameService.getGameState().subscribe(state => {
      this.gameState = state.gamestate;
      this.timeStamp = state.timestamp;
      this.winner = state.winner;
    });
  }

  updateList() {
    this.teamsService.getAllTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.cellsService.getAllCellsPopulated().subscribe(cells => {
      this.cells = cells;
    });
  }

  updateCanvas() {
    this.updateList();
    this.drawCanvas();
  }

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

  drawCanvas() {
    const scaleX = this._width / 1000;
    const scaleY = this._height / 1000;

    this.canvas.scale(1, 1);
    this.canvas.lineWidth = 1;
    this.canvas.textAlign = 'center';

    if (this.cells.length > 0) {
      this.cells.forEach(cell => {
        // Draw the cell
        this.canvas.beginPath();
        cell.corners.forEach((corner, i) => {
          if (i > 0) {
            this.canvas.lineTo(scaleX * corner.x, scaleY * corner.y);
          } else {
            this.canvas.moveTo(scaleX * corner.x, scaleY * corner.y);
          }
        });
        this.canvas.closePath();

        // Color the cell
        this.canvas.fillStyle = cell.owner.color;
        this.canvas.fill();
        this.canvas.strokeStyle = 'black';
        this.canvas.stroke();

        // Add text
        this.canvas.font = '24px sans-serif';
        this.canvas.fillStyle = 'white';
        this.canvas.strokeStyle = 'black';
        this.canvas.lineWidth = 1;
        this.canvas.fillText(cell.name + ' (' + cell.owner.name + ')', scaleX * cell.center.x, scaleY * cell.center.y);
        this.canvas.strokeText(cell.name + ' (' + cell.owner.name + ')', scaleX * cell.center.x, scaleY * cell.center.y);
      });
      if (this.winner) {
        // Add winner
        this.canvas.font = '96px sans-serif';
        this.canvas.fillStyle = 'white';
        this.canvas.strokeStyle = 'black';
        this.canvas.lineWidth = 3;
        this.canvas.fillText('The winner is: ' + this.winner, this._width / 2, this._height / 2);
        this.canvas.strokeText('The winner is: ' + this.winner, this._width / 2, this._height / 2);
      } else {
        // Add time
        this.canvas.font = '24px sans-serif';
        this.canvas.fillStyle = 'white';
        this.canvas.strokeStyle = 'black';
        this.canvas.lineWidth = 1;
        this.canvas.fillText(this.timeDisp, 32, 24);
        this.canvas.strokeText(this.timeDisp, 32, 24);
      }
    } else {
      this.canvas.fillStyle = 'white';
      this.canvas.fillRect(0, 0, this._width, this._height);
      this.canvas.font = '48px sans-serif';
      this.canvas.fillStyle = 'black';
      this.canvas.fillText('Game begins soon™', this._width / 2, this._height / 2);
    }
  }
}
