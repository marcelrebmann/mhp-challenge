import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeContainerComponent} from "./views/home/home-container.component";
import {OAuthModule} from "angular-oauth2-oidc";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {appReducer} from "./reducers/app.reducer";
import {AppEffects} from "./effects/app.effects";
import {EffectsModule} from "@ngrx/effects";
import {AuthenticationService} from "./services/authentication.service";
import {DoorService} from "./services/door.service";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { HeaderComponent } from './components/header/header.component';
import { DoorTileComponent } from './components/door-tile/door-tile.component';
import { DoorListComponent } from './components/door-list/door-list.component';
import {reducers} from "./reducers/reducers";
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeContainerComponent,
    HeaderComponent,
    DoorTileComponent,
    DoorListComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    DoorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
