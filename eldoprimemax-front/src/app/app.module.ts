import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { MovieviewComponent } from './pages/movieview/movieview.component';
import { MoviefilterComponent } from './pages/moviefilter/moviefilter.component';
import { MovielistComponent } from './pages/movielist/movielist.component';
import { MoviecardComponent } from './pages/moviecard/moviecard.component';
import { AddmovieComponent } from './pages/addmovie/addmovie.component';
import { EditmovieComponent } from './pages/editmovie/editmovie.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieviewComponent,
    MovielistComponent,
    MoviecardComponent,
    MoviefilterComponent,
    AddmovieComponent,
    EditmovieComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, BrowserAnimationsModule,
    MatIconModule,ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }