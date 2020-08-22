import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaskPipe, NgxMaskModule} from 'ngx-mask';
import {AgendamentoModalComponent} from './agendamento-modal/agendamento-modal.component';
import {ProfessionalBoxComponent} from './professional-box/professional-box.component';
import {ProfessionalGridComponent} from './professional-grid/professional-grid.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [ProfessionalBoxComponent, ProfessionalGridComponent, AgendamentoModalComponent],
  providers: [MaskPipe],
  exports: [
    ProfessionalBoxComponent,
    ProfessionalGridComponent,
    AgendamentoModalComponent
  ]
})
export class ComponentsModule {
}
