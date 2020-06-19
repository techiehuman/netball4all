import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'id-card',
        loadChildren: () => import('../id-card/id-card.module').then(m => m.IdCardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('../logout/logout.module').then(m => m.LogoutPageModule)
      },
      {
        path: 'app',
        redirectTo: '/tabs/id-card',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'app',
    redirectTo: '/tabs/id-card',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
