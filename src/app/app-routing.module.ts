import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { VonNeumanComponent } from './von-neuman/von-neuman.component';
import { CongFundComponent } from './cong-fund/cong-fund.component';
import { HistorialNgComponent } from './historial-ng/historial-ng.component';
import { NumGenComponent } from './num-gen/num-gen.component';
import { ExistenciasComponent } from './existencias/existencias.component';

const routes: Routes = [
  {path:'', redirectTo: 'main-page', pathMatch:'full'},
  {path:'main-page', component:MainComponent, pathMatch: 'full'},
  {path:'von-neuman', component:VonNeumanComponent, pathMatch:'full'},
  {path:'num-gen/historial', component:HistorialNgComponent, pathMatch:'full'},
  {path:'num-gen', component:NumGenComponent, pathMatch:'full'},
  {path:'existencias', component:ExistenciasComponent, pathMatch:'full'},
  {path:'cong-fund', component:CongFundComponent, pathMatch:'full'},
  {path:'**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
