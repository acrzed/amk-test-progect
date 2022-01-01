import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/classes/auth.guard';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { DepartsPageComponent } from './departs-page/departs-page.component';
import { DepartFormComponent } from './departs-page/depart-form/depart-form.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { UserFormComponent } from './users-page/user-form/user-form.component';

import { NameEditorComponent } from './name-editor/name-editor.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'test', component: TestComponent},
      {path: 'name', component: NameEditorComponent},
      {path: 'departs', component: DepartsPageComponent},
      {path: 'departs/new', component: DepartFormComponent},
      {path: 'departs/:id', component: DepartFormComponent},
      {path: 'users', component: UsersPageComponent},
      {path: 'users/new', component: UserFormComponent},
      {path: 'users/:id', component: UserFormComponent},
      // {path: 'categories', component: CategoriesPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
