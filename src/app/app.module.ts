import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { HomePageComponent } from './components/home-page/home-page.component'; // Importando o módulo do PrimeNG
import { DragDropModule } from 'primeng/dragdrop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MixPageComponent } from './components/mix-page/mix-page.component'; 
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NovoJogadorComponent } from './components/novo-jogador/novo-jogador.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MixPageComponent,
    NovoJogadorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    DropdownModule,
    InputTextModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
