import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfessionalBoxComponent} from './professional-box/professional-box.component';
import {ProfessionalGridComponent} from './professional-grid/professional-grid.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfessionalBoxComponent, ProfessionalGridComponent],
  exports: [
    ProfessionalBoxComponent,
    ProfessionalGridComponent
  ]
})
export class ComponentsModule { }
