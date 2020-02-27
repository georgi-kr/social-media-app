import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { MaterialModule } from './material/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TokenInterceptorService } from './common/auth/token-interceptor.service';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { UsersModule } from './components/users/users.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ConformationDialogBoxComponent } from './shared/conformation-dialog-box/conformation-dialog-box.component';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostDetailPreviewComponent } from './components/post/post-detail-preview/post-detail-preview.component';
import { ServerErrorInterceptor } from './common/exceptons/server-error';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NavModule } from './components/nav/nav.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    NgxSpinnerModule,
    MatDialogModule,
    NavModule,
    CoreModule,
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    UsersModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      countDuplicates: true,
    }),
    JwtModule.forRoot({ config: {} }),
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [ConformationDialogBoxComponent, PostDetailPreviewComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
