import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bio',
    pathMatch: 'full'
  },
  // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  // { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'bio', loadChildren: './bio/bio.module#BioPageModule' },
  { path: 'gmap', loadChildren: './gmap/gmap.module#GmapPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
