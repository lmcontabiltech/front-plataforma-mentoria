import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentoriasComponent } from './mentorias/mentorias.component';
import { AlunosComponent } from './alunos/alunos.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CaixaDeEntradaComponent } from './caixa-de-entrada/caixa-de-entrada.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'caixa-de-entrada', component: CaixaDeEntradaComponent },
  { path: 'mentorias', component: MentoriasComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'calculadora', component: CalculadoraComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
