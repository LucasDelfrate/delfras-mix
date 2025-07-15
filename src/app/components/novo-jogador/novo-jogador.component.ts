import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Jogador } from 'src/app/interfaces/jogador';

@Component({
  selector: 'app-novo-jogador',
  templateUrl: './novo-jogador.component.html',
  styleUrls: ['./novo-jogador.component.scss']
})
export class NovoJogadorComponent implements OnInit {
  levels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  ]
  jogador: Jogador = {
    nick: '',
    level: 0,
    time: 0
  }
  constructor(private dialogRef: MatDialogRef<NovoJogadorComponent>) { }

  ngOnInit(): void {
  }

  salvarPlayer(){
    this.dialogRef.close(this.jogador);
  }

}
