import { CheckLoginGuard } from './guards/check-login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TerminarCompraComponent } from './components/terminar-compra/terminar-compra.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
  { path: 'register', component: RegisterComponent,  pathMatch: 'full'},
  { path: 'home/:email', component: HomeComponent, canActivate:[CheckLoginGuard]},
  {path: 'terminar_compra/:email', component: TerminarCompraComponent, canActivate:[CheckLoginGuard]},
  { path: '**', component:PageNotFoundComponent, canActivate:[CheckLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);

