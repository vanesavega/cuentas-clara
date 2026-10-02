import { Component, inject } from '@angular/core';
import { CardViaje } from '../../components/card-viaje/card-viaje';
import { RouterLink } from '@angular/router';
import { ViajesService } from '../../services/viajes-service';

@Component({
  imports: [CardViaje, RouterLink],
  selector: 'app-viajes',
  styleUrl: './viajes.css',
  templateUrl: './viajes.html',
})
export class Viajes {
  private readonly viajesService = inject(ViajesService);
  viajes = this.viajesService.viajes;
}
