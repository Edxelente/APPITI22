import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

interface estlista {
  name: string;
  redirectTo: string;
  icon: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class InicioPage {

constructor() { }

  ngOnInit() {
  }

  Elementos: estlista[] = [
    {
      name: 'Alerta',
      redirectTo: '/alert',
      icon: 'alert-outline'
    },
    {
      name: 'Card',
      redirectTo: '/card',
      icon: 'card-outline'
    },
    {
      name: 'DateTime',
      redirectTo: '/datetime',
      icon: 'calendar-outline'
    },
    {
      name: 'CheckBox',
      redirectTo: '/checkbox',
      icon: 'checkbox-outline'
    },
    {
      name: 'Fab',
      redirectTo: '/fab',
      icon: 'chevron-up-circle-outline'
    },
      {
      name: 'Grid',
      redirectTo: '/grid',
      icon: 'grid-outline'
    },
        {
      name: 'Infinite Scroll',
      redirectTo: '/infinitescroll',
      icon: 'infinite-outline'
    },
          {
      name: 'Inputs',
      redirectTo: '/inputs',
      icon: 'enter-outline'
    },
                  {
      name: 'Modal',
      redirectTo: '/modal',
      icon: 'archive-outline'
    },
              {
      name: 'Popover',
      redirectTo: '/popover',
      icon: 'notifications-circle-outline'
    },
                  {
      name: 'List',
      redirectTo: '/list',
      icon: 'list-outline'
    },
{
     name: 'Notificación',
      redirectTo: '/notification-test',
      icon: 'chatbox-ellipses-outline'
    },

  ]

}
