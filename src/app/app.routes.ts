import { Routes } from '@angular/router';
import { ThreeComponent } from './components/three/three.component';
import { FbxComponent } from './components/fbx/fbx.component';

export const routes: Routes = [
  { path: 'model', component: ThreeComponent },
  { path: 'modelf', component: FbxComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
