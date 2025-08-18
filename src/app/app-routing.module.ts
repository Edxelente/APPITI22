import { HomePage } from './pagina/home/home.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pagina/inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'alert',
    loadChildren: () => import('./pagina/alert/alert.module').then(m => m.AlertPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./pagina/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'checkbox',
    loadChildren: () => import('./pagina/checkbox/checkbox.module').then( m => m.CheckboxPageModule)
  },
  {
    path: 'chip',
    loadChildren: () => import('./pagina/chip/chip.module').then( m => m.ChipPageModule)
  },
  {
    path: 'fab',
    loadChildren: () => import('./pagina/fab/fab.module').then( m => m.FabPageModule)
  },
  {
    path: 'datetime',
    loadChildren: () => import('./pagina/datetime/datetime.module').then( m => m.DatetimePageModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./pagina/grid/grid.module').then( m => m.GridPageModule)
  },
  {
    path: 'infinitescroll',
    loadChildren: () => import('./pagina/infinitescroll/infinitescroll.module').then( m => m.InfinitescrollPageModule)
  },
  {
    path: 'inputs',
    loadChildren: () => import('./pagina/inputs/inputs.module').then( m => m.InputsPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pagina/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./pagina/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pagina/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'home',
    loadComponent: () => import('./pagina/home/home.page').then( m => m.HomePage)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
