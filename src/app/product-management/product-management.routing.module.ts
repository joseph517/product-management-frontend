import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { NgModule } from '@angular/core';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CreateFormComponent } from './components/create-form/create-form.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'list-products',
                component: ListProductsComponent
            },
            {
                path: 'create-form',
                component: CreateFormComponent
            },
            {
                path: '**',
                redirectTo: 'list-products'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductManagementRoutingModule {}
