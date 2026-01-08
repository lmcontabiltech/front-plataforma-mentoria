import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { MentoriasComponent } from './mentorias/mentorias.component';
import { AlunosComponent } from './alunos/alunos.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    MentoriasComponent,
    AlunosComponent,
    EmpresasComponent,
    CalculadoraComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule
  ]
})
export class SistemaModule { }
