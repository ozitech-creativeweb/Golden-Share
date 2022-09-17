import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './dashboard-manager/components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLogoutComponent } from './admin-logout/admin-logout.component';
import { AdminAuthGuard } from '../data/services/admin-auth.guard';

const routes: Routes = [
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'logout', component: AdminLogoutComponent },
    {
        path: '',
        loadChildren: () => import(
            './dashboard-manager/dashboard-manager.module'
        ).then(mod => mod.DashboardManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'dahboard',
        loadChildren: () => import(
            './dashboard-manager/dashboard-manager.module'
        ).then(mod => mod.DashboardManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'settings-manager',
        loadChildren: () => import(
            './settings-manager/settings-manager.module'
        ).then(mod => mod.SettingsManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'admin-manager',
        loadChildren: () => import(
            './admin-manager/admin-manager.module'
        ).then(mod => mod.AdminManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'content-manager',
        loadChildren: () => import(
            './content-manager/content-manager.module'
        ).then(mod => mod.ContentManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'testimonial-manager',
        loadChildren: () => import(
            './testimonial-manager/testimonial-manager.module'
        ).then(mod => mod.TestimonialManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'activity-manager',
        loadChildren: () => import(
            './activity-manager/activity-manager.module'
        ).then(mod => mod.ActivityManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'order-manager',
        loadChildren: () => import(
            './order-manager/order-manager.module'
        ).then(mod => mod.OrderManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'product-manager',
        loadChildren: () => import(
            './product-manager/product-manager.module'
        ).then(mod => mod.ProductManagerModule),
        canLoad: [AdminAuthGuard]
    },
    {
        path: 'user-manager',
        loadChildren: () => import(
            './user-manager/user-manager.module'
        ).then(mod => mod.UserManagerModule),
        canLoad: [AdminAuthGuard]
    },

    {
        path: 'other-manager',
        loadChildren: () => import(
          './other-manager/other-manager.module'
        ).then(mod => mod.OtherManagerModule),
        canLoad: [AdminAuthGuard]
    },

    {
        path: 'media-manager',
        loadChildren: () => import(
          './media-manager/media-manager.module'
        ).then(mod => mod.MediaManagerModule),
        canLoad: [AdminAuthGuard]
    },

    {
        path: 'donation-manager',
        loadChildren: () => import(
          './donation-manager/donation-manager.module'
        ).then(mod => mod.DonationManagerModule),
        canLoad: [AdminAuthGuard]
    },

    {
        path: 'manual-merging-manager',
        loadChildren: () => import(
          './manual-merging-manager/manual-merging-manager.module'
        ).then(mod => mod.ManualMergingManagerModule),
        canLoad: [AdminAuthGuard]
    },

    {
        path: 'withdrawal-manager',
        loadChildren: () => import(
          './withdrawal-manager/withdrawal-manager.module'
        ).then(mod => mod.WithdrawalManagerModule),
        canLoad: [AdminAuthGuard]
    },

    {
        path: 'news-manager',
        loadChildren: () => import(
          './news-manager/news-manager.module'
        ).then(mod => mod.NewsManagerModule),
        canLoad: [AdminAuthGuard]
    },

    {
        path: 'support-manager',
        loadChildren: () => import(
          './support-manager/support-manager.module'
        ).then(mod => mod.SupportManagerModule),
        canLoad: [AdminAuthGuard]
    },
    
    {
        path: 'packages-manager',
        loadChildren: () => import(
          './packages-manager/packages-manager.module'
        ).then(mod => mod.PackagesManagerModule),
        canLoad: [AdminAuthGuard]
    },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
