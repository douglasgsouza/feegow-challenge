import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ComponentsModule} from '../components/components.module';
import {ContatoComponent} from './contato/contato.component';
import {HomeComponent} from './home/home.component';
import {SobreComponent} from './sobre/sobre.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    SobreComponent,
    ContatoComponent,
  ]
})
export class PagesModule { }
