import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceModule } from '../services/service.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ServiceModule,
        PipesModule
    ],
    declarations: [
        ErrorComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    exports: [
        ErrorComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ]
})
export class SharedModule { }
