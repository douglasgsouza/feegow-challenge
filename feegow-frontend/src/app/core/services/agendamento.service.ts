import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Agendamento} from '../interfaces/agendamento';
import {AgendamentoPair} from '../interfaces/agendamento-pair';
import {Professional} from '../interfaces/professional';
import {Specialty} from '../interfaces/specialty';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private selectedPairSubject = new Subject<AgendamentoPair>();
  abrirAgendamento$ = this.selectedPairSubject.asObservable();

  constructor(private http: HttpClient) {
  }


  abrirAgendamento(specialty?: Specialty, professional?: Professional): void {
    this.selectedPairSubject.next({specialty, professional});
  }

  salvarAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(environment.apiUrl + '/agendamentos', agendamento);
  }
}
