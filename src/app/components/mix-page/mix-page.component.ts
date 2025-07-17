import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Jogador } from 'src/app/interfaces/jogador';
import { Time } from 'src/app/interfaces/time';
import { NovoJogadorComponent } from '../novo-jogador/novo-jogador.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnter,
  CdkDropList,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-mix-page',
  templateUrl: './mix-page.component.html',
  styleUrls: ['./mix-page.component.scss'],
})
export class MixPageComponent implements OnInit {
  private divisoesOtimas: { time1: any[]; time2: any[] }[] = [];
  private indiceDivisaoAtual = 0;
  lixeiraData: any[] = [];
  time1: Time = {
    nome: 'Time 1',
    jogadores: [],
  };
  time2: Time = {
    nome: 'Time 2',
    jogadores: [],
  };
  imagensDisponiveis = [
    'assets/ak-47.png',
    'assets/awp.png',
    'assets/m4.png',
    'assets/pistola.png',
  ];
  jogadores: Jogador[] = [];

  jogadorSelecionado?: Jogador;

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const jogadoresSalvos = localStorage.getItem('jogadores');
    const time1Salvo = localStorage.getItem('time1');
    const time2Salvo = localStorage.getItem('time2');

    if (jogadoresSalvos) {
      this.jogadores = JSON.parse(jogadoresSalvos);
    }

    if (time1Salvo) {
      this.time1.jogadores = JSON.parse(time1Salvo);
    }

    if (time2Salvo) {
      this.time2.jogadores = JSON.parse(time2Salvo);
    }
  }

  dragStart(jogador: Jogador) {
    this.jogadorSelecionado = jogador;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) return;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.divisoesOtimas = [];
    this.indiceDivisaoAtual = 0;
    this.salvarJogadoresLocalStorage();
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

  addJogador() {
    this.dialog
      .open(NovoJogadorComponent, {
        width: '40%',
        height: '160px',
      })
      .afterClosed()
      .subscribe((jogador: Jogador) => {
        if (jogador) {
          const novaImagem =
            this.imagensDisponiveis[Math.floor(Math.random() * this.imagensDisponiveis.length)];

          jogador.imagem = novaImagem;
          this.jogadores.push(jogador);
          this.messageService.add({
            severity: 'success',
            summary: `Jogador ${jogador.nick} adicionado com sucesso!`,
          });
          this.salvarJogadoresLocalStorage();
        }
      });
  }

  getLevelMedio(jogadores: Jogador[]) {
    let soma = 0;
    jogadores.forEach((jogador) => {
      soma += jogador.level;
    });
    return Math.round(soma / jogadores.length);
  }

  onTrashDrop(event: CdkDragEnter<any[], any[]>) {
    if (event.item.dropContainer.data) {
      const jogador = event.item.dropContainer.data[0];

      this.confirmationService.confirm({
        header: 'Remover jogador',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Remover',
        rejectLabel: 'Cancelar',
        acceptIcon: 'pi pi-trash',
        message: 'Tem certeza que deseja remover o jogador "' + jogador.nick + '"?',
        accept: () => {
          this.removeJogador(jogador);
        },
      });
    }
  }

  removeJogador(jogadorToRemove: Jogador) {
    // Remova jogador da lista 'jogadores'
    this.jogadores = this.jogadores.filter((j) => j !== jogadorToRemove);

    // Também pode querer remover dos times, caso esteja lá:
    this.time1.jogadores = this.time1.jogadores.filter((j) => j !== jogadorToRemove);
    this.time2.jogadores = this.time2.jogadores.filter((j) => j !== jogadorToRemove);
    this.divisoesOtimas = [];
    this.indiceDivisaoAtual = 0;
    this.messageService.add({
      severity: 'success',
      summary: `Jogador ${jogadorToRemove.nick} removido com sucesso`,
    });
    this.salvarJogadoresLocalStorage();
  }

  getAllCombinations(array: any[], k: number): any[][] {
    const result: any[][] = [];

    const backtrack = (start: number, path: any[]) => {
      if (path.length === k) {
        result.push([...path]);
        return;
      }

      for (let i = start; i < array.length; i++) {
        path.push(array[i]);
        backtrack(i + 1, path);
        path.pop();
      }
    };

    backtrack(0, []);
    return result;
  }

  calcularMediaLevel(jogadores: any[]): number {
    if (jogadores.length === 0) return 0;
    const soma = jogadores.reduce((total, j) => total + j.level, 0);
    return soma / jogadores.length;
  }

  autoDistribuirTimes() {
    if (this.todosJogadores.length !== 10) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Número de jogadores insuficiente.',
        detail: 'Você deve ter 10 jogadores para fazer a auto-distribuição dos times',
      });
      return;
    }

    // Se ainda não calculamos ou se mudaram os jogadores
    if (this.divisoesOtimas.length === 0) {
      const allCombinations = this.getAllCombinations(this.todosJogadores, 5);
      let melhorDiferenca = Infinity;
      let divisoes: { time1: any[]; time2: any[] }[] = [];

      for (const time1 of allCombinations) {
        const time2 = this.todosJogadores.filter((j) => !time1.includes(j));
        const media1 = this.calcularMediaLevel(time1);
        const media2 = this.calcularMediaLevel(time2);
        const diferenca = Math.abs(media1 - media2);

        if (diferenca < melhorDiferenca) {
          melhorDiferenca = diferenca;
          divisoes = [{ time1, time2 }];
        } else if (diferenca === melhorDiferenca) {
          divisoes.push({ time1, time2 });
        }
      }

      this.divisoesOtimas = divisoes;
      this.indiceDivisaoAtual = 0;
    }

    const divisaoAtual = this.divisoesOtimas[this.indiceDivisaoAtual];

    this.time1.jogadores = [...divisaoAtual.time1];
    this.time2.jogadores = [...divisaoAtual.time2];
    this.jogadores = [];

    this.indiceDivisaoAtual = (this.indiceDivisaoAtual + 1) % this.divisoesOtimas.length;
    this.salvarJogadoresLocalStorage();
  }

  limparTimes() {
    if (this.time1.jogadores.length === 0 && this.time2.jogadores.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Não há jogadores nos times',
        detail: 'Para limpar os times você deve ter pelo menos 1 jogador neles',
      });
      return; // Não faz nada se os times estiverem vazios
    }

    this.jogadores = [...this.jogadores, ...this.time1.jogadores, ...this.time2.jogadores];
    this.time1.jogadores = [];
    this.time2.jogadores = [];
    this.salvarJogadoresLocalStorage();
  }

  get todosJogadores() {
    let t = [...this.jogadores, ...this.time1.jogadores, ...this.time2.jogadores];
    return t;
  }

  salvarJogadoresLocalStorage() {
    localStorage.setItem('jogadores', JSON.stringify(this.jogadores || []));
    localStorage.setItem('time1', JSON.stringify(this.time1?.jogadores || []));
    localStorage.setItem('time2', JSON.stringify(this.time2?.jogadores || []));
  }
}
