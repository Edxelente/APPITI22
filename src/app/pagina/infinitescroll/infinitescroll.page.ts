import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-infinitescroll',
  templateUrl: './infinitescroll.page.html',
  styleUrls: ['./infinitescroll.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule,ComponentesModule],
})
export class InfinitescrollPage implements OnInit {

 datos: any[] = [];
  totalItems = 28;
  ultimoItem = 0;
  constructor() { 
        this.cargarDatosIniciales();

  }
 cargarDatosIniciales() {
    for (let i = 1; i <= this.totalItems; i++) {
      this.datos.push({ id: i });
    }
    this.ultimoItem = this.totalItems;
  }

  cargarMasDatos(event: any) {
    setTimeout(() => {
      const nuevosDatos = 28; // Cantidad a cargar cada vez
      
      for (let i = 1; i <= nuevosDatos; i++) {
        this.datos.push({ id: this.ultimoItem + i });
      }

      this.ultimoItem += nuevosDatos;
      event.target.complete();

      // Opcional: Deshabilitar infinite scroll si se alcanza un límite
      if (this.ultimoItem >= 100) { // Ejemplo: límite de 100 elementos
        event.target.disabled = true;
      }
    }, 1000); // Simula delay de carga
  }
  ngOnInit() {
  }

}
