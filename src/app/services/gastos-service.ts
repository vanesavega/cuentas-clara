import { Service, signal } from '@angular/core';
import { Gasto, NuevoGasto } from '../models/gasto';

@Service()
export class GastosService {
    private readonly _gastos = signal<Gasto[]>([]);
    public readonly gastos = this._gastos.asReadonly();

    agregar(viajeId: string, nuevo: NuevoGasto): void {
        const gasto: Gasto = { id: crypto.randomUUID(), viajeId, ...nuevo };
        this._gastos.update(gastos => [...gastos, gasto]);
    }

    gastosDeViaje(viajeId: string): Gasto[] {
        return this._gastos().filter(gasto => gasto.viajeId === viajeId);
    }
}