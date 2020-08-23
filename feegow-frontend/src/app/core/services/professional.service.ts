import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, finalize, map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Professional} from '../interfaces/professional';

interface ProfessionalListResponse {
  success: boolean;
  content: Professional[];
}

interface ProfessionalBySpeciality {
  [key: string]: Professional[];
}

/**
 * Serviço de Profissionais
 *
 * Faz a comunicação com a API da FeeGow
 */
@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {

  /**
   * Flag para verificar se já existe um request em andamento
   */
  private loading = false;

  /**
   * Armazena a lista de especialidades em cache
   */
  private professionals = new BehaviorSubject<Professional[]>(null);
  private professionalsBySpeciality = new BehaviorSubject<ProfessionalBySpeciality>(null);

  /**
   * Observável filtrado com a lista de profissionais em cache
   */
  private professionals$ = this.professionals.asObservable().pipe(filter(val => !!val));
  private professionalsBySpeciality$ = this.professionalsBySpeciality.asObservable().pipe(filter(val => !!val));

  constructor(private http: HttpClient) {
  }

  /**
   * Retorna a lista completa de Profissionais
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
  getAll(reload: boolean = false): Observable<Professional[]> {

    // verifica se está carregando, se não tem dados em cache ou se solicitou o reload
    if (!this.loading && this.professionals.value === null || reload) {

      // faz o request a API
      this.loading = true;
      return this.http.get<ProfessionalListResponse>(environment.feegowApiUrl + '/professional/list').pipe(
        map(response => response.content), // mapeia o resultado
        switchMap(result => {
          this.professionals.next(result); // envia o resultado para o fluxo observável para o cache dos dados
          return this.professionals$; // returna o fluxo observável cacheado
        }),
        finalize(() => this.loading = false)
      );

      // returna o fluxo observável cacheado
    } else {
      return this.professionals$;
    }
  }

  /**
   * Retorna a lista de Profissionais da especialidade especificada
   *
   * Este método utiliza técnicas para armazenamento em cache de um fluxo observável, impedindo requests desnecessários quando
   * os dados já estão armazenados em memória ou em carregamento.
   *
   * Na primeira subscrição, será requisitado os dados da API e o resultado será armazenado em cache antes de ser entregue ao observador.
   * Caso outras subscrições ao método seja feita enquanto uma requisição a API estiver em andamento, o resultado será retornado
   * para todas as subscrições assim que a primeira resposta for retornada.
   *
   * @param specialtyId Id da Especialidade
   * @param reload Indica se deseja forçar o recarregamento dos dados, caso estejam em cache
   */
  getBySpecialty(specialtyId: number, reload: boolean = false): Observable<Professional[]> {

    // verifica se está carregando, se não tem dados em cache ou se solicitou o reload
    if (!this.loading && (this.professionalsBySpeciality.value === null || !this.professionalsBySpeciality.value[specialtyId])
      || reload) {

      const params = {
        especialidade_id: specialtyId.toString()
      };

      // faz o request a API
      this.loading = true;
      return this.http.get<ProfessionalListResponse>(environment.feegowApiUrl + '/professional/list', {params}).pipe(
        map(response => response.content), // mapeia o resultado
        switchMap(result => {
          const currentVal = this.professionalsBySpeciality.value || {};
          currentVal[specialtyId] = result;
          this.professionalsBySpeciality.next(currentVal); // envia o resultado para o fluxo observável para o cache dos dados
          return this.professionalsBySpeciality$.pipe(map(obj => obj[specialtyId]));
        }),
        finalize(() => this.loading = false)
      );

      // returna o fluxo observável cacheado
    } else {
      return this.professionalsBySpeciality$.pipe(filter(obj => obj[specialtyId] !== undefined), map(obj => obj[specialtyId]));
    }
  }
}
