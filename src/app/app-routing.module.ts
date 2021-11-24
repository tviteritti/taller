import { TiendaComponent } from './components/tienda/tienda.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
  { path: 'register', component: RegisterComponent,  pathMatch: 'full'},
  { path: 'home/:email', component: HomeComponent},
  { path: 'tienda', component: TiendaComponent},
  { path: 'agregarProducto' , component:AgregarProductoComponent},
  { path: '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);

