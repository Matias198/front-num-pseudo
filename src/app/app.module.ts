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
import { NbToggleModule, NbRadioModule, NbMenuModule, NbCardModule, NbAccordionModule, NbButtonModule, NbLayoutModule, NbSidebarModule, NbThemeModule, NbUserModule, NbActionsModule, NbContextMenuModule, NbDialogModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HistorialNgComponent } from './historial-ng/historial-ng.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { NgChartsModule } from 'ng2-charts';
import { NumGenComponent } from './num-gen/num-gen.component';
import { ExistenciasComponent } from './existencias/existencias.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    VonNeumanComponent,
    CongFundComponent,
    MainComponent,
    HistorialNgComponent,
    NumGenComponent,
    ExistenciasComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NbEvaIconsModule, 
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbAccordionModule,
    NbCardModule,
    BrowserAnimationsModule,  
    NbMenuModule.forRoot(), 
    NbUserModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule, 
    NbThemeModule.forRoot({ name: 'cosmic' }),  
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule,
    NbDialogModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    NgChartsModule, 
    MatFormFieldModule,
    MatSelectModule,
    NbRadioModule,
    NbToggleModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
