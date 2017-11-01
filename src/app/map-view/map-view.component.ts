import { GameService } from './../game.service';
import { TeamsService } from './../teams.service';
import { CellsService } from './../cells.service';
import { Component, ViewChild, ElementRef, AfterViewInit, Input , OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements AfterViewInit, OnChanges {
  public _width: number;
  public _height: number;
  private canvas: CanvasRenderingContext2D;

  private $counter: Observable<number>;
  private subscription: any;
  private diff: number;
  private timeStamp = 0;
  public gameState = 0;
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
    this.$counter = Observable.interval(1000).map((x) => {
      this.diff = Math.floor(this.timeStamp - new Date().getTime());
      if (this.diff < 0) {
        this.diff = 0;
      }
      return x;
    });

    this.subscription = this.$counter.subscribe((x) => this.timeDisp = this.timeString(this.diff));

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
      this.canvas.fillText(cell.name + ' (' + cell.owner.name + ')', scaleX * cell.center.x, scaleY * cell.center.y);
    });
    // Add time
    this.canvas.font = '24px sans-serif';
    this.canvas.fillStyle = 'white';
    this.canvas.fillText(this.timeDisp, 32, 24);
  }
}
