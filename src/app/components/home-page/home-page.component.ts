import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/interfaces/jogador';
import { Time } from 'src/app/interfaces/time';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  tela: string = 'inicial'

  constructor() { }

  ngOnInit(): void {
  }

  novoMix() {
    console.log('Novo mix');
    this.tela = 'mix'
  }

}
