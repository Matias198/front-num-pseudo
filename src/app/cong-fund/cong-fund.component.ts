import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core'; 
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2'
import { __await } from 'tslib'; 

@Component({
  selector: 'app-cong-fund',
  templateUrl: './cong-fund.component.html',
  styleUrls: ['./cong-fund.component.css']
})
export class CongFundComponent {
  public loading = false;
    
  vi = new FormControl('5');
  vik = new FormControl('4');
  a = new FormControl('5');
  c = new FormControl('3');
  k = new FormControl('1');
  m = new FormControl('100');


  repeticiones = new FormControl('50');
  significancia = new FormControl('');
  chicuadrado = new FormControl('');
  pvalor = new FormControl('');
  se = new FormControl('');
  sn = new FormControl('');
  pest = new FormControl('');
  pest2 = new FormControl('');
  gl = new FormControl('');
  secuencia = ""

  constructor(private http:HttpClient){}

  generarNumeros():any{
    let vi:any = this.vi.value 
    let vik:any = this.vik.value
    let a:any = this.a.value 
    let c:any = this.c.value
    let k:any = this.k.value 
    let m:any = this.m.value
    let repeticiones:any = this.repeticiones.value
    console.log(vi,vik,a,c,k,m,repeticiones)
 
    if (!(vi > 0 || vi < m)){
      Swal.fire({
        title: 'Error',
        text: 'El valor de V(i) debe ser mayor a 0 y menor que "m"',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }
    if (!(vik >= 0 || vik < m)){
      Swal.fire({
        title: 'Error',
        text: 'El valor de V(i-k) debe ser mayor o igual a 0 y menor que "m"',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }
    if (!(a > 0 || a < m)){
      Swal.fire({
        title: 'Error',
        text: 'El valor de "a" debe ser mayor a 0 y menor que "m"',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }
    if (!(c > 0)){
      Swal.fire({
        title: 'Error',
        text: 'El valor de "c" debe ser mayor a 0',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }
    if (!(k > 0 || k < repeticiones)){
      Swal.fire({
        title: 'Error',
        text: 'El valor de "k" debe ser mayor o igual a 0 y menor que la cantidad de repeticiones',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }
    if (!(m > 0)){
      Swal.fire({
        title: 'Error',
        text: 'El valor de "m" debe ser mayor a 0',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }


    repeticiones = parseInt(repeticiones, 10);

    if (repeticiones > 100){
      Swal.fire({
        title: 'Error',
        text: 'La cantidad de repeticiones debe ser un numero menor a 100',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }

    if (isNaN(repeticiones) || repeticiones <= 0){
      Swal.fire({
        title: 'Error',
        text: 'La cantidad de repeticiones debe ser un numero mayor a 0',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }
    
    
    this.loading = true
    __await(this.http.post(environment.url + '/cong-fund/crear', {
        'vi':vi,
        'vik':vik,
        'a':a,
        'c':c,
        'k':k,
        'm':m,
        'n':repeticiones
      }).subscribe((res)=>{
      console.log(res)
       
      this.secuencia = "";
      Array.from(JSON.parse(JSON.stringify(res)).mensaje.toString().split(',')).forEach(e => {
        this.secuencia += e
      });
      this.loading = false
      Swal.fire({
        title: 'Correcto',
        text: 'La secuencia se generó correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      return 0;
    },
    (err)=>{
      console.log(err)
      this.loading = false
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error inesperado',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }))
  }

  comprobarChiCuadrado():any{
    this.loading = true
    __await(this.http.post(environment.url + '/app-controller/comprobar/chi-cuadrado', {
      'secuencia':this.secuencia.toString()
    }).subscribe((res:any)=>{
      console.log(res) 
      this.chicuadrado.setValue(res.chicuadrado.toString()) 
      this.significancia.setValue(res.significancia.toString()) 
      this.gl.setValue(res.gl.toString())   
      this.pest2.setValue(res.pest.toString()) 
      this.loading = false
    },(err)=>{
      console.log(err)
      this.loading = false
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error inesperado',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }))
    
  }

  comprobarMonobits():any{
    this.loading = true
    __await(this.http.post(environment.url + '/app-controller/comprobar/monobits', { 
        'secuencia':this.secuencia.toString()
      }).subscribe((res:any)=>{
        console.log(res) 
        this.pvalor.setValue(res.pvalor.toString()) 
        this.se.setValue(res.se.toString()) 
        this.sn.setValue(res.sn.toString()) 
        this.pest.setValue(res.pest.toString())   
        this.loading = false
    },
    (err)=>{
      console.log(err)
      this.loading = false
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error inesperado',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }))
  }

  guardarSecuencia(){
    this.loading = true
    __await(this.http.post(environment.url + '/cong-fund/guardar', {
        'vi':this.vi.value,
        'vik':this.vik.value,
        'a':this.a.value,
        'c':this.c.value,
        'k':this.k.value,
        'm':this.m.value,
        'repeticiones':this.repeticiones.value,
        'secuencia':this.secuencia
      }).subscribe((res)=>{
      console.log(res)  
      this.loading = false
      Swal.fire({
        title: 'Correcto',
        text: 'La secuencia se guardó correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      return 0;
    },
    (err)=>{
      console.log(err)
      this.loading = false
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error inesperado',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return 1;
    }))
  }
  
  descartar(){ 
    this.vi.setValue("")
    this.vik.setValue("")
    this.a.setValue("")
    this.c.setValue("")
    this.k.setValue("")
    this.m.setValue("")
    this.repeticiones.setValue("")
    this.significancia.setValue("")
    this.chicuadrado.setValue("")
    this.gl.setValue("")
    this.pest.setValue("")
    this.pest2.setValue("")
    this.sn.setValue("")
    this.se.setValue("")
    this.pvalor.setValue("")
    this.secuencia = ""
  } 

}
