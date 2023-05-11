import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core'; 
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2'
import { __await } from 'tslib'; 

@Component({
  selector: 'app-von-neuman',
  templateUrl: './von-neuman.component.html',
  styleUrls: ['./von-neuman.component.css'], 
})
export class VonNeumanComponent{ 

    public loading = false;
    
    semilla = new FormControl('');
    repeticiones = new FormControl('');
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
      let semilla:any = this.semilla.value 
      let repeticiones:any = this.repeticiones.value

      console.log(semilla, repeticiones)
      if (semilla.toString().length != 4){
        Swal.fire({
          title: 'Error',
          text: 'La semilla debe ser de 4 digitos',
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
      __await(this.http.post(environment.url + '/von-neuman/crear', {
          'semilla':semilla,
          'repeticiones':repeticiones
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
      __await(this.http.post(environment.url + '/von-neuman/comprobar/chi-cuadrado', {
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
      __await(this.http.post(environment.url + '/von-neuman/comprobar/monobits', { 
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
      __await(this.http.post(environment.url + '/von-neuman/guardar', {
          'semilla':this.semilla.value,
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
      this.semilla.setValue("")
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

    descartar2(){
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