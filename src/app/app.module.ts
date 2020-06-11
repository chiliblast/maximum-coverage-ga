import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

import { AppComponent } from './app.component';
import { EngineComponent } from './engine/engine.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxNavbarModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
