import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

/**
 * Classe Http Interceptor para injetar o access-token nos requests para a API da FeeGow
 */
@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {

    constructor() {
    }

  /**
   *  Verifica se a URL requisitada é composta pela URL da API e injeta o cabeçalho x-access-token
   */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(environment.feegowApiUrl)) {
            req = req.clone({
                headers: req.headers.set('x-access-token', environment.feegowApiToken)
            });
        }
        return next.handle(req);
    }

}
