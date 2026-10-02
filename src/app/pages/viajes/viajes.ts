import { Component } from '@angular/core';
import { CardViaje } from '../../components/card-viaje/card-viaje';
import { Viaje } from '../../models/viaje';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CardViaje, RouterLink],
  selector: 'app-viajes',
  styleUrl: './viajes.css',
  templateUrl: './viajes.html',
})
export class Viajes {
  viajes : Viaje[] = []
}
