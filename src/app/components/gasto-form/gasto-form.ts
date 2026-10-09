import { ChangeDetectionStrategy, Component, effect, inject, input, output, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persona } from '../../models/persona';
import { ModoReparto, NuevoGasto } from '../../models/gasto';
import { construirNuevoGasto } from './gasto-mapper';

type FilaIgual = FormGroup<{ personaId: FormControl<string>; nombre: FormControl<string>; participa: FormControl<boolean> }>;
type FilaPorcentaje = FormGroup<{ personaId: FormControl<string>; nombre: FormControl<string>; porcentaje: FormControl<number> }>;
type FilaMonto = FormGroup<{ personaId: FormControl<string>; nombre: FormControl<string>; monto: FormControl<number> }>;

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-gasto-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gasto-form.html',
})
export class GastoForm {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly personas = input.required<Persona[]>();
  readonly guardar = output<NuevoGasto>();

  protected readonly form = this.fb.group({
    descripcion: ['', [Validators.required, Validators.maxLength(80)]],
    monto: [0, [Validators.required, Validators.min(1)]],
    fecha: [new Date().toLocaleDateString('en-CA'), Validators.required],
    pagadorId: ['', Validators.required],
    modo: this.fb.control<ModoReparto>('iguales'),
    iguales: this.fb.array<FilaIgual>([]),
    porcentajes: this.fb.array<FilaPorcentaje>([]),
    montos: this.fb.array<FilaMonto>([]),
  });

  protected readonly modo = toSignal(this.form.controls.modo.valueChanges, {
    initialValue: this.form.controls.modo.value,
  });

  constructor() {
    effect(() => {
      const personas = this.personas();
      untracked(() => {
        this.sincronizar(this.form.controls.iguales, personas, p => this.crearFilaIgual(p));
        this.sincronizar(this.form.controls.porcentajes, personas, p => this.crearFilaPorcentaje(p));
        this.sincronizar(this.form.controls.montos, personas, p => this.crearFilaMonto(p));
      });
    });
  }

  private crearFilaIgual(p: Persona): FilaIgual {
    return this.fb.group({ personaId: [p.id], nombre: [`${p.nombre} ${p.apellido}`], participa: [true] });
  }
  private crearFilaPorcentaje(p: Persona): FilaPorcentaje {
    return this.fb.group({ personaId: [p.id], nombre: [`${p.nombre} ${p.apellido}`], porcentaje: [0] });
  }
  private crearFilaMonto(p: Persona): FilaMonto {
    return this.fb.group({ personaId: [p.id], nombre: [`${p.nombre} ${p.apellido}`], monto: [0] });
  }

  private sincronizar(
    filas: FormArray,
    personas: Persona[],
    crearFila: (persona: Persona) => AbstractControl,
  ): void {
    const idsActuales = new Set(personas.map(p => p.id));
    const idsConFila = new Set(filas.controls.map(fila => fila.value.personaId));

    filas.controls
      .filter(fila => !idsActuales.has(fila.value.personaId))
      .forEach(fila => filas.removeAt(filas.controls.indexOf(fila)));

    personas
      .filter(p => !idsConFila.has(p.id))
      .forEach(p => filas.push(crearFila(p)));
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardar.emit(construirNuevoGasto(this.form.getRawValue()));
    this.form.reset();
  }
}