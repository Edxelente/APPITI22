import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

interface Alumno {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  edad: number;
  email: string;
  telefono: string;
}

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.page.html',
  styleUrls: ['./inputs.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule,ComponentesModule,FormsModule],
})
export class InputsPage implements OnInit {

    constructor() { }

  ngOnInit() {
      this.calcularEdad();
  }

 alumnoActual: Alumno = {
    nombre: 'Edxel',
    apellidos: 'Villarreal Lopez',
    fechaNacimiento: new Date('2004-06-01').toISOString(), 
    edad: 21, 
    email: 'edxel@gmail.com',
    telefono: '897 979 0337',
 };

calcularEdad(event?: any) {
  if (this.alumnoActual.fechaNacimiento) {
    const nacimiento = new Date(this.alumnoActual.fechaNacimiento);
    const hoy = new Date();
    
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    this.alumnoActual.edad = edad;
  }
}
}
