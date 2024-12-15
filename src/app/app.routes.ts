import { Routes } from '@angular/router';
import { ThreeComponent } from './components/three/three.component';

export const routes: Routes = [
  { path: 'model', component: ThreeComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
