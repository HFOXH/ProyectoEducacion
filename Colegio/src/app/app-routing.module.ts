import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { NotasComponent } from './components/notas/notas.component';

const routes: Routes = [

  {path: 'estudiante', component: EstudianteComponent},
  {path: 'profesor', component: ProfesorComponent},
  {path: 'notas', component: NotasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
