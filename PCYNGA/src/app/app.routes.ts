import { Routes } from '@angular/router';
import { EstudianteList } from './estudiante-list/estudiante-list';
import { EstudianteDetalle } from './estudiante-detalle/estudiante-detalle';

export const routes: Routes = [
  { path: '', component: EstudianteList },
  { path: 'detalle/:id', component: EstudianteDetalle }
];