import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MyAuthGuard } from './myauthguard';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:"", redirectTo:"\login", pathMatch:"full"},
  {path:"\login", component:LoginComponent},
  {path:"\dashboard", component:DashboardComponent, canActivate:[MyAuthGuard]},
  {path:"\signUp", component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

