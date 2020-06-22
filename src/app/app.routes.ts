import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './shared/error/error.component';
import { RegistroComponent } from './login/registro/registro.component';
import { PublicoComponent } from './publico/publico.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'public', component: PublicoComponent },
  { path: '**', component: ErrorComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: false } );
