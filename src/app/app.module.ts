import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VonNeumanComponent } from './von-neuman/von-neuman.component';
import { CongFundComponent } from './cong-fund/cong-fund.component';
import { MainComponent } from './main/main.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'; 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    VonNeumanComponent,
    CongFundComponent,
    MainComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
