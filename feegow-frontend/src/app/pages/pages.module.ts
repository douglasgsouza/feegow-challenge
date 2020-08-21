import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SobreComponent} from './sobre/sobre.component';
import { ContatoComponent } from './contato/contato.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    SobreComponent,
    ContatoComponent,
  ],
})
export class PagesModule { }
