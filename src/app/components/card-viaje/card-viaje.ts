import { Component, input } from '@angular/core';
import { Viaje } from '../../models/viaje';
@Component({
  imports: [],
  selector: 'app-card-viaje',
  styleUrl: './card-viaje.css',
  templateUrl: './card-viaje.html',
})
export class CardViaje {
  viaje = input.required<Viaje>();
}
