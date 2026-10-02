import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule], // Angular 17+ ya reconoce @if y @for de forma nativa aquí
  selector: 'app-nuevo-viaje',
  styleUrl: './nuevo-viaje.css',
  templateUrl: './nuevo-viaje.html',
})
export class NuevoViaje {
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
      this.showModal.set(true);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cerrarModal() {
    this.showModal.set(false);
    this.form.reset({ dias: 1 }); 
  }
}
