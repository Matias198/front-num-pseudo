
import { HttpClient } from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router'; 
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { environment } from 'src/environments/environment.development'; 

@Component({
  selector: 'app-historial-ng',
  templateUrl: './historial-ng.component.html',
  styleUrls: ['./historial-ng.component.css']
})
export class HistorialNgComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'chi', 'mono'];
  pagina:any
  tPagina:any
  dataSource:any 
  e:any = [] 
  datos:number[] = []
  labels:string[] = []
  listaAnterior:PeriodicElement[] = []
  indicesBaneados:any[] = [0]
  public loading = false;
 
  @ViewChild(MatPaginator) paginator:any;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  handlePageEvent(e: PageEvent) { 
    if (e.pageIndex > 0){
      let valor = true
      this.indicesBaneados.forEach((elemento:number)=>{
        if (elemento === e.pageIndex){
          valor = false
        }
      })
      if (valor){
        this.indicesBaneados.push(e.pageIndex)
        this.pagina = e.pageIndex + 1;  
        this.buscarElementos(this.pagina, this.tPagina)  
      }
    }
  } 

  constructor(private rutas:Router, private http:HttpClient){ 
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data:  [],// Aquí debes agregar los datos de la distribución media normal
        label: 'Valores',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Probabilidades',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
    ],
    //labels: ['0', '0.125', '0.25', '0.375', '0.5', '0.625', '0.75', '0.875', '1']
    labels: [] //agregar aca los valores de los labls de X
  }
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },    
  };

  ngOnInit() { 
    this.pagina = 1
    this.tPagina = 20
    this.buscarElementos(this.pagina, this.tPagina) 
  }

  graficarCampanaGauss(datosContinuos: number[]) {
    const media = this.calcularMedia(datosContinuos);
    const desvioEstandar = this.calcularDesvioEstandar(datosContinuos);
    const z = this.calcularValoresZ(datosContinuos, media, desvioEstandar); 
   
    // Definir la amplitud de Z
    const amplitudZ = 4; // Ejemplo: de -2 a 2
    const cantidadPuntos = datosContinuos.length; // Cantidad de puntos para graficar

    // Calcular los valores de Z y las probabilidades correspondientes
    const valoresZ = this.calcularValoresZAmplitud(amplitudZ, cantidadPuntos);
    const probabilidades = valoresZ.map(z => this.calcularFuncionDensidadProbabilidad(z));

        
    this.lineChartData.datasets[0].data = datosContinuos.sort()
    this.lineChartData.labels = datosContinuos.map((_, index) => index.toString()); // valoresZ.map(String);
    let aux = JSON.parse(JSON.stringify(this.lineChartOptions))
    aux.scales = 
    {
      'x':{
        type: 'linear',
        min: -1 * amplitudZ / 2, // Valor mínimo del eje X
        max: amplitudZ / 2, // Valor máximo del eje X
        ticks: {
          stepSize: amplitudZ / cantidadPuntos, // Espaciado entre los valores del eje X
        },
      }
    };
    //this.lineChartOptions = aux  
    //this.lineChartData.datasets[0].data = valoresZ.sort()
    //this.lineChartData.labels = valoresZ.map((_, index) => index.toString());
    this.chart?.update()
   
  }

  calcularValoresZAmplitud(amplitud: number, cantidadPuntos: number): number[] {
    const paso = amplitud / cantidadPuntos;
    const valoresZ = [];
    for (let i = -amplitud / 2; i <= amplitud / 2; i += paso) {
      valoresZ.push(i);
    }
    return valoresZ;
  }

  calcularMedia(datosContinuos: number[]){ 
    const n = datosContinuos.length;
    return datosContinuos.reduce((sum, value) => sum + value, 0) / n;  
  }

  calcularDesvioEstandar(datosContinuos: number[]): number {
    const n = datosContinuos.length;
    // Paso 1: Calcular la media
    const media = datosContinuos.reduce((sum, value) => sum + value, 0) / n;  
    // Paso 2: Calcular la suma de los cuadrados de las diferencias
    const sumCuadradosDiferencias = datosContinuos.reduce((sum, value) => sum + Math.pow(value - media, 2), 0);
    // Paso 3: Calcular la desviación estándar
    const desvioEstandar = Math.sqrt(sumCuadradosDiferencias / (n - 1));
    return desvioEstandar;
  }

  calcularValoresZ(datosContinuos: number[], media: number, desvioEstandar: number): number[] {
    return datosContinuos.map(x => (x - media) / desvioEstandar);
  }

  calcularFuncionDensidadProbabilidad(z: number): number {
    const denominador = Math.sqrt(2 * Math.PI);
    const exponente = -Math.pow(z, 2) / 2; 
    return Math.exp(exponente) / denominador;
  }

  deleteRow(){
    console.log("Eliminando...")
    let url = environment.url + '/num-gen/borrar/'+this.e.id
    this.http.delete(url).subscribe(
      (resp)=>{
        this.buscarElementos(this.pagina, this.tPagina)
        console.log(resp)
      }
    )
  }

  buscarElementos(pagina:any, tPagina:any){
    let body = {'pagina':pagina,'tPagina':tPagina}
    this.http.post(environment.url + '/num-gen/listar', body).subscribe((res)=>{
      let response:any = JSON.parse(JSON.stringify(res))
      let ELEMENT_DATA:PeriodicElement[] = Array.from(response)
      let secuencia:any 
      for (let i = 0; i < ELEMENT_DATA.length; i++) {
        secuencia = ELEMENT_DATA[i].numeros.toString().replace(/("|\{|\})/g, '') 
        let aux:number[] = []
        Array.from(secuencia.split(',')).forEach((elemento:any)=>{
          aux.push(parseFloat(elemento))
        }) 
        ELEMENT_DATA[i].numeros = aux
      } 
      ELEMENT_DATA.forEach((element:any)=>{
        this.listaAnterior.push(element)
      }) 
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.listaAnterior.sort());
      this.dataSource.paginator = this.paginator; 
      this.e = ELEMENT_DATA[0]  
      this.graficarCampanaGauss(this.e.numeros) 
      console.log(this.e)
    },(err)=>{
      console.log(err.mensaje)
    })

  }

  verDetalles(row:any){ 
    this.e = row
    this.graficarCampanaGauss(this.e.numeros) 
    console.log(this.e)
  }
 
  goToVonNeuman(){
    this.rutas.navigate(['von-neuman']);
  }

  goToCongFund(){
    this.rutas.navigate(['cong-fund']);
  }
  
  goToNumGen(){
    this.rutas.navigate(['num-gen']);
  }

  goToExistencias(){
    this.rutas.navigate(['existencias']);
  }
}

export interface PeriodicElement {
  id:any;
  semilla:any;
  generador:any;
  cantidad:any;
  mono:any,
  chi:any
  numeros:any;
}


