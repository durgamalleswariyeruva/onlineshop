import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { RouteGuard } from './route.guard';
import { UserdashboardComponent } from './users/userdashboard/userdashboard.component';
import { UsersModule } from './users/users.module';


const routes: Routes = [
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'category', component: CategoryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admindashboard', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
