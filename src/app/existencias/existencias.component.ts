import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.css'],
})
export class ExistenciasComponent {
  public loading = false;
  public matcher = new MyErrorStateMatcher();
  mediaFormControl = new FormControl(150, Validators.required);
  desvioFormControl = new FormControl(25, Validators.required);
  costoFormControl = new FormControl(1000, Validators.required);
  diasFormControl = new FormControl(365, Validators.required);
  icFormControl = new FormControl(5, Validators.required);
  pFormControl = new FormControl('0.4,0.5,0.1', Validators.required);
  demoraFormControl = new FormControl('1,2,3', Validators.required);
  stockFormControl = new FormControl(2000, Validators.required);
  comprarRangoFormControl = new FormControl(5, Validators.required);
  criticoFormControl = new FormControl(300, Validators.required);
  idNumGenFormControl = new FormControl(15, Validators.required);

  vecesNoSatisfaceDemanda = 0
  perdidaButo = 0
  ganandciaBruto = 0
  gananciaNto = 0

  displayedColumns: string[] = [
    'dia',
    'existenciaPrincipioDia',
    'demanda',
    'demandaInsatisfecha',
    'cantidadPedir',
    'existenciaFinalDia',
    'perdidaTotal',
    'costoTotal',
    'leyenda',
  ];
  dataSource:any

  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  handlePageEvent(e: PageEvent) { 

  } 

  constructor(private rutas: Router, private http: HttpClient) {}

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data:  [],// Aquí debes agregar los datos de la distribución media normal
        label: 'Ganancia en Bruto',
        backgroundColor: 'rgba(3, 135, 18, 0.3)',
        borderColor: 'rgba(0, 135, 18, 0.8)',
        pointBackgroundColor: 'green',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'green',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Perdidas en bruto',
        backgroundColor: 'rgba(255, 25, 0, 0.3)',
        borderColor: 'rgba(255, 0, 0, 0.8)',
        pointBackgroundColor: 'red',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'red',
        fill: 'origin',
      },
    ],
    labels: []
  }
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },    
  };
  enviarDatos() {
    console.log(
      this.mediaFormControl.value,
      this.desvioFormControl.value,
      this.diasFormControl.value,
      this.icFormControl.value,
      this.pFormControl.value,
      this.demoraFormControl.value,
      this.stockFormControl.value,
      this.comprarRangoFormControl.value,
      this.costoFormControl.value,
      this.criticoFormControl.value,
      this.idNumGenFormControl.value
    );
    if (
      this.mediaFormControl.value != undefined &&
      this.desvioFormControl.value != undefined &&
      this.diasFormControl.value != undefined &&
      this.icFormControl.value != undefined &&
      this.pFormControl.value != undefined &&
      this.demoraFormControl.value != undefined &&
      this.stockFormControl.value != undefined &&
      this.comprarRangoFormControl.value != undefined &&
      this.costoFormControl.value != undefined &&
      this.criticoFormControl.value != undefined &&
      this.idNumGenFormControl.value != undefined
    ) {
      const media = this.mediaFormControl.value;
      const desvio = this.desvioFormControl.value;
      const costo = this.costoFormControl.value;
      const dias = this.diasFormControl.value;
      const IC = this.icFormControl.value;
      const P = Array.from(
        this.pFormControl.value.toString().split(',').map(Number)
      );
      const demora = Array.from(
        this.demoraFormControl.value.toString().split(',').map(Number)
      );
      const idNumGen = this.idNumGenFormControl.value;
      const stock = this.stockFormControl.value;
      const comprarRango = this.comprarRangoFormControl.value;
      const critico = this.criticoFormControl.value;
      
      this.vecesNoSatisfaceDemanda = 0 
      this.perdidaButo = 0
      this.ganandciaBruto = 0
      this.gananciaNto = 0
      const json = {
        media,
        desvio,
        costo,
        dias,
        IC,
        P,
        demora,
        idNumGen,
        stock,
        comprarRango,
        critico,
      };
      console.log(json);
      this.http.post(environment.url + '/existencias/crear', json).subscribe(
        (res) => {
          let response:any = JSON.parse(JSON.stringify(res))
          response.demanda = Array.from(JSON.stringify(response.demanda).toString().replace(/("|\{|\})/g, '').split(',')).reverse().map(Number)
          response.dia = Array.from(JSON.stringify(response.dia).toString().replace(/("|\{|\})/g, '').split(',')).reverse().map(Number)
          for (let i = 1; i < parseInt(comprarRango.toString()); i++) {
            response.demanda.pop()
            response.dia.pop()
          }
          response.dia.pop()
          response.demanda = response.demanda.reverse()
          response.demanda.pop()
          response.dia = response.dia.reverse()  
          
          let json:any
          let ELEMENT_DATA:PeriodicElement[] = []
          for (let i = 0; i < response.dia.length-1; i++) {
            json = {
              'cantidadPedir':response.cantidadPedir[i],
              'costoTotal':response.costoTotal[i],
              'demanda':response.demanda[i],
              'demandaInsatisfecha':response.demandaInsatisfecha[i],
              'dia':response.dia[i],
              'existenciaFinalDia':response.existenciaFinalDia[i],
              'existenciaPrincipioDia':response.existenciaPrincipioDia[i],
              'leyenda':response.leyenda[i],
              'perdidaTotal':response.perdidaTotal[i]
            }
            ELEMENT_DATA.push(json)
          }
          this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); 
          for (let i = 0; i < response.cantidadPedir.length; i++) {
            const element = response.cantidadPedir[i];
            if (element != 0){
              this.vecesNoSatisfaceDemanda++ 
            }
          }
          this.perdidaButo = response.totalPerdida
          this.ganandciaBruto = response.totalCosto
          this.gananciaNto = this.ganandciaBruto - this.perdidaButo
          
          this.lineChartData.datasets[1].data = response.perdidaTotal
          this.lineChartData.datasets[0].data = response.costoTotal
          this.lineChartData.labels = response.dia.map((_:any, index:any) => index.toString());
          this.chart?.update()

          Swal.fire({
            title: '<h1 style="color:white;">Correcto</h1>',
            text: 'El modelo se genero correctamente',
            icon: 'success',
            confirmButtonText: 'OK',
            background: 'rgba(30, 30, 30)',
            color: 'white',
            backdrop: `
            rgba(53,53,53,0.4)
            `,
          });
        },
        (err) => {
          Swal.fire({
            title: '<h1 style="color:white;">Error</h1>',
            text: err.mesage.mensaje,
            icon: 'error',
            confirmButtonText: 'OK',
            background: 'rgba(30, 30, 30)',
            color: 'white',
            backdrop: `
          rgba(53,53,53,0.4)
          `,
          });
        }
      );
    }
  }

  goToVonNeuman() {
    this.rutas.navigate(['von-neuman']);
  }

  goToNumGen() {
    this.rutas.navigate(['num-gen']);
  }

  goToCongFund() {
    this.rutas.navigate(['cong-fund']);
  }

  goToNumGenHistory() {
    this.rutas.navigate(['num-gen/historial']);
  }
}

export interface PeriodicElement {
  dia:any,
  existenciaPrincipioDia:any
  demanda:any
  demandaInsatisfecha:any
  cantidadPedir:any
  existenciaFinalDia:any
  perdidaTotal:any
  costoTotal:any
  gananciaNeta:any
  leyenda:any
  totalCosto:any
  totalPerdida:any
}