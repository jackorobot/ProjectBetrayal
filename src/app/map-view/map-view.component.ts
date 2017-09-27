import { TeamsService } from './../teams.service';
import { CellsService } from './../cells.service';
import { Component, ViewChild, ElementRef, AfterViewInit, Input , OnChanges } from '@angular/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements AfterViewInit, OnChanges {
  public _width: number;
  public _height: number;
  private canvas: CanvasRenderingContext2D;

  private cells: any = [];
  private teams: any = [];

  @ViewChild('mapView') mapView: ElementRef;

  constructor(private el: ElementRef,
    private cellsService: CellsService,
    private teamsService: TeamsService) {
      this._width = 1280;
      this._height = 1024;
  }

  ngAfterViewInit() {
    this.canvas = this.mapView.nativeElement.getContext('2d');

    this.updateCanvas();
    setInterval(() => {
      this.updateCanvas();
    }, 1000);
  }

  ngOnChanges() {
    if (this.canvas) {
      this.updateCanvas();
    }
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
  }
}
