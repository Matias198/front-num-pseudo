import { ChangeDetectionStrategy, Component } from '@angular/core';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent{ 

  constructor(private rutas:Router){}

  goToVonNeuman(){
    this.rutas.navigate(['von-neuman']);
  }

  goToNumGen(){
    this.rutas.navigate(['num-gen']);
  }

  goToExistencias(){
    this.rutas.navigate(['existencias']);
  }

  goToCongFund(){
    this.rutas.navigate(['cong-fund']);
  }

  goToNumGenHistory(){
    this.rutas.navigate(['num-gen/historial']);
  }

  goToExistenciasHistory(){
    this.rutas.navigate(['existencias/historial']);
  }
}
