import { Component, computed, inject, input, signal } from '@angular/core';
import { ViajesService } from './../../services/viajes-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { DatePipe, DecimalPipe } from '@angular/common';
import { GastosService } from '../../services/gastos-service';
import { GastoForm } from '../../components/gasto-form/gasto-form';
import { NuevoGasto } from '../../models/gasto';

@Component({
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, RouterLink, GastoForm],
  selector: 'app-viaje-detail',
  styleUrl: './viaje-detail.css',
  templateUrl: './viaje-detail.html',
})
export class ViajeDetail {
  viajeservice = inject(ViajesService);
  private readonly fb = inject(FormBuilder);
  private readonly gastosService = inject(GastosService);
  gastos = computed(() => this.gastosService.gastosDeViaje(this.id()));

  id = input.required<string>();
  viaje = computed(() => {
    return this.viajeservice.getViajeById(this.id());
  })
  personas = computed(() => {
    return this.viajeservice.getParticipantesByViajeId(this.id());
  });
  disponibles = computed(() => {
    return this.viajeservice.getParticipantesDisponibles(this.id());
  });
  selectedPersonas = signal<string[]>([]);

  nuevaPersonaForm = this.fb.group({
    nombre: [''],
    apellido: [''],
  });

  alternarSeleccion(personaId: string) {
    const seleccionadas = this.selectedPersonas();
    if (seleccionadas.includes(personaId)) {
      this.selectedPersonas.set(seleccionadas.filter(id => id !== personaId));
    } else {
      this.selectedPersonas.set([...seleccionadas, personaId]);
    }
  }

  agregarSeleccionadas() {
    const seleccionadas = this.selectedPersonas();
    if (seleccionadas.length > 0) {
      this.viajeservice.agregarParticipantes(this.id(), seleccionadas);
      this.selectedPersonas.set([]);
    }
  }
  
  crearYAgregar() {
    const nombre = this.nuevaPersonaForm.get('nombre')?.value;
    const apellido = this.nuevaPersonaForm.get('apellido')?.value;
    if (nombre && apellido) {
      const personaId = this.viajeservice.crearPersona({ nombre, apellido });
      this.viajeservice.agregarParticipantes(this.id(), [personaId]);
      this.nuevaPersonaForm.reset();
    }
  }

  agregarGasto(nuevo: NuevoGasto) {
    this.gastosService.agregar(this.id(), nuevo);
  }

}
