import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AgendamentoPair} from '../interfaces/agendamento-pair';
import {Professional} from '../interfaces/professional';
import {Specialty} from '../interfaces/specialty';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private selectedPairSubject  = new Subject<AgendamentoPair>();
  abrirAgendamento$ = this.selectedPairSubject.asObservable();

  constructor() { }


  abrirAgendamento(specialty?: Specialty, professional?: Professional): void {
    this.selectedPairSubject.next({specialty, professional});
  }
}
