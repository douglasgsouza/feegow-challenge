import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, finalize, map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Specialty} from '../interfaces/specialty';

interface SpecialityListResponse {
  success: boolean;
  content: Specialty[];
}

/**
 * Serviço de Especialidades
 *
 * Faz a comunicação com a API da FeeGow
 */
@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  /**
   * Flag para verificar se já existe um request em andamento
   */
  private loading = false;

  /**
   * Armazena a lista de especialidades em cache
   */
  private specialties  = new BehaviorSubject<Specialty[]>(null);

  /**
   * Observável filtrado com a lista de especialidades em cache
   */
  private specialties$ = this.specialties.asObservable().pipe(filter(val => !!val));

  constructor(private http: HttpClient) {
  }

  /**
   * Retorna a lista de Especialidades
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
  getAll(reload: boolean = false): Observable<Specialty[]> {

    // verifica se já está carregando, se não tem dados em cache ou se solicitou o reload
    if (!this.loading && this.specialties.value === null || reload) {

      // faz o request a API
      this.loading = true;
      return this.http.get<SpecialityListResponse>(environment.feegowApiUrl + '/specialties/list').pipe(
        map(response => response.content), // mapeia o resultado
        switchMap(result => {
          this.specialties.next(result); // envia o resultado para o fluxo observável para o cache dos dados
          return this.specialties$; // returna o fluxo observável cacheado
        }),
        finalize(() => this.loading = false)
      );

    // returna o fluxo observável cacheado
    } else {
      return this.specialties$;
    }
  }
}
