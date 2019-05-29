import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'base',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/base/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'claim',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/claim/claim.module#ClaimPageModule'
                    }
                ]
            },
            {
                path: 'bookmark',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/bookmark/bookmark.module#BookmarkPageModule'
                    }
                ]
            },
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: '../pages/account/account.module#AccountPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/base/home',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
