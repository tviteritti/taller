import { CheckLoginGuard } from './guards/check-login.guard';
import { TiendaComponent } from './components/tienda/tienda.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
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
  { path: 'tienda', component: TiendaComponent, canActivate:[CheckLoginGuard]},
  { path: 'agregarProducto', component: AgregarProductoComponent, canActivate:[CheckLoginGuard]},
  {path: 'terminar_compra/:email', component: TerminarCompraComponent, canActivate:[CheckLoginGuard]},
  { path: '**', component:PageNotFoundComponent, canActivate:[CheckLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);

