import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AgendamentoService} from './services/agendamento.service';
import {ApiTokenInterceptor} from './services/api-token.interceptor';
import {PatientService} from './services/patient.service';
import {ProfessionalService} from './services/professional.service';
import {SpecialtiesService} from './services/specialties.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTokenInterceptor,
      multi: true,
    },
    SpecialtiesService,
    ProfessionalService,
    PatientService,
    AgendamentoService,
  ]
})
export class AppCoreModule {

  constructor(@Optional() @SkipSelf() parentModule: AppCoreModule) {
    if (parentModule) {
      throw new Error(
        'AppCoreModule já foi carregado. Importe-o apenas no AppModule.');
    }
  }
}
