import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CellsService } from './cells.service';
import { CommonModule } from '@angular/common';
import { defaultSimpleModalOptions } from 'ngx-simple-modal/dist/simple-modal/simple-modal-options';
import { FormsModule } from '@angular/forms';
import { GameService } from './game.service';
import { HttpModule } from '@angular/http';
import { MapViewComponent } from './map-view/map-view.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimpleModalModule } from 'ngx-simple-modal';
import { TeamsService } from './teams.service';
import { UserModule } from './user/user.module';




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
    SimpleModalModule.forRoot({ container: 'modal-container' }, {
      ...defaultSimpleModalOptions, ...{
        closeOnEscape: true,
        closeOnClickOutside: true
      }
    }),
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
