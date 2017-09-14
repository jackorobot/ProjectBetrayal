import { ActionsService } from './../actions.service';
import { TeamsService } from './../teams.service';
import { CellsService } from './../cells.service';
import { Component, ViewChild, ElementRef, AfterViewInit, Input , OnChanges } from '@angular/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements AfterViewInit, OnChanges {
  public _size: number;
  private canvas: CanvasRenderingContext2D;

  private cells: any = [];
  private teams: any = [];
  private actions: any = [];

  @ViewChild('mapView') mapView: ElementRef;

  constructor(private el: ElementRef,
    private cellsService: CellsService,
    private teamsService: TeamsService,
    private actionsService: ActionsService) {
      const elementHeight = 500;
      const elementWidth = 500;

    if (elementHeight > elementWidth) {
      this._size = elementWidth;
    } else {
      this._size = elementHeight;
    }
  }

  ngAfterViewInit() {
    this.canvas = this.mapView.nativeElement.getContext('2d');
    this.canvas.fillStyle = 'blue';
    this.canvas.fillRect(0, 0, this._size, this._size);

    this.updateCanvas();
    setInterval(() => {
      this.updateCanvas();
    }, 5000);
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

    this.cellsService.getAllCells().subscribe(cells => {
      this.cells = cells;
    });

    this.actionsService.getAllActions().subscribe(actions => {
      this.actions = actions;
    });
  }

  updateCanvas() {
    this.updateList();
    this.drawCanvas();
  }

  drawCanvas() {

  }
}
