import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { TeamsService } from './teams.service';
import { CellsService } from './cells.service';
import { GameService } from './game.service';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { MapViewComponent } from './map-view/map-view.component';

const ROUTES = [
  {
    path: 'mapview',
    component: MapViewComponent
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    BootstrapModalModule,
    AdminModule,
    UserModule
  ],
  declarations: [
    AppComponent,
    MapViewComponent
  ],
  entryComponents: [MapViewComponent],
  providers: [
    TeamsService,
    CellsService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
