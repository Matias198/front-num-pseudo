import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-num-gen',
  templateUrl: './num-gen.component.html',
  styleUrls: ['./num-gen.component.css']
})
export class NumGenComponent implements OnInit{
  public loading = false;
  options = [
    { value: 'Von Neuman', label: 'Von Neuman', checked:true },
    { value: 'Congruencia Fundamental', label: 'Congruencia Fundamental', checked:false }
  ];
  valor = 'Von Neuman'
  chi = false
  monobits = false 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'chi', 'mono'];
  dataSource:any 
  listaAnterior:PeriodicElement[] = []

  constructor(private rutas:Router, private http:HttpClient){ 
  }


  seleccionDeMetodo(valor:any){
    this.valor = valor.toString()
    console.log(valor)
  }

  cambiarEstadoTest(valor:any){
    if (valor === 1){ 
        this.monobits = !this.monobits 
    }else{
      this.chi = !this.chi
    }
    //console.log(this.monobits, this.chi)
  }

  generarNumeros(cantidad:any){
    this.loading = true
    let body =  {'cantidad':parseInt(cantidad), 'chi':this.chi, 'mono':this.monobits}
    this.http.post(environment.url + '/num-gen/crear-von-neuman', body).subscribe((res)=>{
      this.loading = false 
      let response:any = JSON.parse(JSON.stringify(res)) 

      let ELEMENT_DATA: PeriodicElement[] = [
        { id: response.id, semilla: response.semilla, generador: response.generador, cantidad: response.cantidad, mono: response.mono, chi: response.chi, numeros: response.numros},
      ]; 

      console.log(ELEMENT_DATA)
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA) 
      ELEMENT_DATA.forEach((element:any)=>{
        this.listaAnterior.push(element)
      }) 
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.listaAnterior.sort());
      Swal.fire({
        title: 'OK',
        text: 'Secuencia de numeros generada correctamente con id: ' + response.id,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },(err)=>{
      this.loading = false
      Swal.fire({
        title: 'Error',
        text: 'Error interno del servidor',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.log(err)
    })
  }
  /*let ELEMENT_DATA:PeriodicElement[] = []
      ELEMENT_DATA.push(response.id)
      ELEMENT_DATA.push(response.semilla)
      ELEMENT_DATA.push(response.generador)
      ELEMENT_DATA.push(response.cantidad)
      ELEMENT_DATA.push(response.mono)
      ELEMENT_DATA.push(response.chi)*/
  
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

  goToNumGenHistory(){
    this.rutas.navigate(['num-gen/historial']);
  }
  
  ngOnInit(): void {
      console.log(this.valor)
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