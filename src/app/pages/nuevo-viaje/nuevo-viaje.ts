import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViajesService } from '../../services/viajes-service';

@Component({
  imports: [ReactiveFormsModule], // Angular 17+ ya reconoce @if y @for de forma nativa aquí
  selector: 'app-nuevo-viaje',
  styleUrl: './nuevo-viaje.css',
  templateUrl: './nuevo-viaje.html',
})
export class NuevoViaje {
  private readonly viajesService = inject(ViajesService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  
  protected showModal = signal(false);

  form = this.fb.group({
    destino: ['', Validators.required],
    descripcion: ['', Validators.required],
    fecha: ['', Validators.required],
    dias: [1, [Validators.required, Validators.min(1)]],
    imagen: ['', Validators.required],
  });

  crearViaje() {
    if (this.form.valid) {
      this.viajesService.crearViaje({
        destino: this.form.value.destino!,
        descripcion: this.form.value.descripcion!,
        fecha: this.form.value.fecha!,
        dias: this.form.value.dias!,
        imagenUrl: this.form.value.imagen!,
      });
      this.showModal.set(true);
      this.router.navigate(['/']);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cerrarModal() {
    this.showModal.set(false);
    this.form.reset({ dias: 1 }); 
  }
}
