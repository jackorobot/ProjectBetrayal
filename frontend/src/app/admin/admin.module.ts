import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AdminComponent } from './admin.component';
import { TeamsComponent } from './teams/teams.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MessageComponent } from '../message/message.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { CellsComponent } from './cells/cells.component';
import { TagItemsComponent } from './tag-items/tag-items.component';
import { AddCellComponent } from './add-cell/add-cell.component';
import { ActionsComponent } from './actions/actions.component';
import { AddActionComponent } from './add-action/add-action.component';
import { MapViewComponent } from '../map-view/map-view.component';
import { GameComponent } from './game/game.component';

import { CellsService } from './../cells.service';
import { TeamsService } from './../teams.service';
import { GameService } from '../game.service';

const ROUTES = [
  {
    path: 'supersecretadmin',
    component: AdminComponent,
    children: [
      {
        path: 'teams',
        component: TeamsComponent
      },
      {
        path: 'cells',
        component: CellsComponent
      },
      {
        path: 'actions',
        component: ActionsComponent
      },
      {
        path: 'mapview',
        component: MapViewComponent
      },
      {
        path: 'game',
        component: GameComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    AdminComponent,
    TeamsComponent,
    ConfirmComponent,
    MessageComponent,
    AddTeamComponent,
    CellsComponent,
    TagItemsComponent,
    AddCellComponent,
    ActionsComponent,
    AddActionComponent,
    GameComponent
  ],
  entryComponents: [
    TeamsComponent,
    ConfirmComponent,
    MessageComponent,
    AddTeamComponent,
    CellsComponent,
    TagItemsComponent,
    AddCellComponent,
    ActionsComponent,
    AddActionComponent
  ],
  providers: [
    TeamsService,
    CellsService,
    GameService
  ],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
