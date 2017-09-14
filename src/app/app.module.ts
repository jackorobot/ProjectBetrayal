import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { TeamsService } from './teams.service';
import { CellsService } from './cells.service';
import { ActionsService } from './actions.service';

import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MessageComponent } from './message/message.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { CellsComponent } from './cells/cells.component';
import { TagItemsComponent } from './tag-items/tag-items.component';
import { AddCellComponent } from './add-cell/add-cell.component';
import { ActionsComponent } from './actions/actions.component';
import { AddActionComponent } from './add-action/add-action.component';
import { MapViewComponent } from './map-view/map-view.component';

const ROUTES = [
  {
    path: 'admin',
    redirectTo: 'admin/teams',
    pathMatch: 'full'
  },
  {
    path: 'admin/teams',
    component: TeamsComponent
  },
  {
    path: 'admin/cells',
    component: CellsComponent
  },
  {
    path: 'admin/actions',
    component: ActionsComponent
  },
  {
    path: 'admin/mapview',
    component: MapViewComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    ConfirmComponent,
    MessageComponent,
    AddTeamComponent,
    CellsComponent,
    TagItemsComponent,
    AddCellComponent,
    ActionsComponent,
    AddActionComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    BootstrapModalModule
  ],
  entryComponents: [
    ConfirmComponent,
    MessageComponent,
    AddTeamComponent,
    AddCellComponent,
    AddActionComponent
  ],
  providers: [
    TeamsService,
    CellsService,
    ActionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
