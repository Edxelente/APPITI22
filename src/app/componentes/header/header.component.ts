import { Component, Input } from '@angular/core';
import { IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {

  @Input() titulo: string = '';

  constructor() { }
}
