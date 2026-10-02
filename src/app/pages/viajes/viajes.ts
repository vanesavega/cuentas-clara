import { Component, inject } from '@angular/core';
import { CardViaje } from '../../components/card-viaje/card-viaje';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ViajesService } from '../../services/viajes-service';
import { DatePipe } from '@angular/common';
@Component({
  imports: [CardViaje, RouterLink, DatePipe],
  selector: 'app-viajes',
  styleUrl: './viajes.css',
  templateUrl: './viajes.html',
})
export class Viajes {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly viajesService = inject(ViajesService);
  viajes = this.viajesService.viajes;

  irAlDetalle(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
