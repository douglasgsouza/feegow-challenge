import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContatoComponent} from './pages/contato/contato.component';
import {HomeComponent} from './pages/home/home.component';
import {SobreComponent} from './pages/sobre/sobre.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'sobre', component: SobreComponent},
  {path: 'contato', component: ContatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
