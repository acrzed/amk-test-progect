import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './shared/classes/token.interceptor';

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { UserFormComponent } from './users-page/user-form/user-form.component';
import { DepartsPageComponent } from './departs-page/departs-page.component';
import { DepartFormComponent } from './departs-page/depart-form/depart-form.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AuthLayoutComponent,
    RegisterPageComponent,
    LoginPageComponent,
    SiteLayoutComponent,
    DepartsPageComponent,
    DepartFormComponent,
    UsersPageComponent,
    UserFormComponent,
    NameEditorComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
