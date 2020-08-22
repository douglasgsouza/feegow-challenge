import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, finalize, map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {PatientSource} from '../interfaces/patient-source';

interface PatientSourceListResponse {
  success: boolean;
  content: PatientSource[];
}

/**
 * Serviço de Pacientes
 *
 * Faz a comunicação com a API da FeeGow
 */
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  /**
   * Flag para verificar se já existe um request em andamento
   */
  private loading = false;

  /**
   * Armazena a lista de origens em cache
   */
  private sources  = new BehaviorSubject<PatientSource[]>(null);

  /**
   * Observável filtrado com a lista de origens em cache
   */
  private sources$ = this.sources.asObservable().pipe(filter(val => !!val));

  constructor(private http: HttpClient) {
  }

  /**
   * Retorna a lista de Origens
   *
   * Este método utiliza técnicas para armazenamento em cache de um fluxo observável, impedindo requests desnecessários quando
   * os dados já estão armazenados em memória ou em carregamento.
   *
   * Na primeira subscrição, será requisitado os dados da API e o resultado será armazenado em cache antes de ser entregue ao observador.
   * Caso outras subscrições ao método seja feita enquanto uma requisição a API estiver em andamento, o resultado será retornado
   * para todas as subscrições assim que a primeira resposta for retornada.
   *
   * @param reload Indica se deseja forçar o recarregamento dos dados, caso estejam em cache
   */
  getPatientSources(reload: boolean = false): Observable<PatientSource[]> {

    // verifica se já está carregando, se não tem dados em cache ou se solicitou o reload
    if (!this.loading && this.sources.value === null || reload) {

      // faz o request a API
      this.loading = true;
      return this.http.get<PatientSourceListResponse>(environment.apiUrl + '/patient/list-sources').pipe(
        map(response => response.content), // mapeia o resultado
        switchMap(result => {
          this.sources.next(result); // envia o resultado para o fluxo observável para o cache dos dados
          return this.sources$; // returna o fluxo observável cacheado
        }),
        finalize(() => this.loading = false)
      );

    // returna o fluxo observável cacheado
    } else {
      return this.sources$;
    }
  }
}
