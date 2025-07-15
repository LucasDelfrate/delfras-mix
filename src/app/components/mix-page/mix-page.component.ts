import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Jogador } from 'src/app/interfaces/jogador';
import { Time } from 'src/app/interfaces/time';
import { NovoJogadorComponent } from '../novo-jogador/novo-jogador.component';

@Component({
  selector: 'app-mix-page',
  templateUrl: './mix-page.component.html',
  styleUrls: ['./mix-page.component.scss']
})
export class MixPageComponent implements OnInit {
   time1: Time = {
    nome: 'Time 1',
    jogadores: []
  }
  time2: Time = {
    nome: 'Time 2',
    jogadores: []
  }
  jogadores: Jogador[] = [
    { nick: 'Delfra', level: 20, time: 1 },
    { nick: 'Mainginski', level: 16, time: 1 },
    { nick: 'Fidelis', level: 15, time: 1 },
  ]

  jogadorSelecionado?: Jogador;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  
    dragStart(jogador: Jogador) {
        this.jogadorSelecionado = jogador;
    }
    
    drop(event: any) {
        if (this.jogadorSelecionado) {
            let jogadorSelecionadoIndex = this.findIndex(this.jogadorSelecionado);
            this.jogadorSelecionado = undefined;
        }
    }
    
    dragEnd() {
        this.jogadorSelecionado = undefined;
    }
    
    findIndex(jogador: Jogador) {
        let index = -1;
        return index;
    }

    getLevelColor(level: number) {
        switch (level) {
            case 1:
                return 'rgba(221, 0, 255, 1)';
            case 2:
                return 'rgba(212, 0, 255, 1)';
            case 3:
                return 'rgba(187, 0, 255, 1)';
            case 4:
                return 'rgba(115, 0, 255, 1)';
            case 5:
                return 'rgba(85, 0, 255, 1)';
            case 6:
                return 'rgba(76, 0, 255, 1)';
            case 7:
               return 'rgba(55, 0, 255, 1)';
            case 8:
               return 'rgba(55, 0, 255, 1)';
            case 9:
               return 'rgba(0, 123, 255, 1)';
            case 10:
               return 'rgba(0, 140, 255, 1)';
            case 11:
               return 'rgba(0, 200, 255, 1)';
            case 12:
               return 'rgba(0, 255, 225, 1)';
            case 13:
               return 'rgba(0, 255, 98, 1)';
            case 14:
               return 'rgba(111, 255, 0, 1)';
            case 15:
               return 'rgba(200, 255, 0, 1)';
            case 16:
               return 'rgba(255, 225, 0, 1)';
            case 17:
               return 'rgba(255, 191, 0, 1)';
            case 18:
               return 'rgba(255, 140, 0, 1)';
            case 19:
               return 'rgba(255, 72, 0, 1)';
            case 20:
               return 'rgba(255, 0, 0, 1)';
            default:
                return 'rgb(0, 0, 0)';
        }
    }

    addJogador(){
      this.dialog.open(NovoJogadorComponent, {
        width: '80%',
        height: '160px'
      }).afterClosed().subscribe((jogador: Jogador) => {
        if(jogador){
          this.jogadores.push(jogador)
        }
      })
    }
}
