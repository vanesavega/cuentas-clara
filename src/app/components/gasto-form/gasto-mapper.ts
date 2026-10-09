import { ModoReparto, NuevoGasto } from '../../models/gasto';

export interface GastoFormValue {
  descripcion: string;
  monto: number;
  fecha: string;
  pagadorId: string;
  modo: ModoReparto;
  iguales: { personaId: string; participa: boolean }[];
  porcentajes: { personaId: string; porcentaje: number }[];
  montos: { personaId: string; monto: number }[];
}

export function construirNuevoGasto(raw: GastoFormValue): NuevoGasto {
  const base = {
    descripcion: raw.descripcion,
    monto: raw.monto,
    fecha: raw.fecha,
    pagadorId: raw.pagadorId,
  };

  switch (raw.modo) {
    case 'iguales':
      return {
        ...base,
        reparto: {
          modo: 'iguales',
          entre: raw.iguales.filter(fila => fila.participa).map(fila => fila.personaId),
        },
      };
    case 'porcentajes':
      return {
        ...base,
        reparto: {
          modo: 'porcentajes',
          porcentajes: Object.fromEntries(raw.porcentajes.map(fila => [fila.personaId, fila.porcentaje])),
        },
      };
    case 'montos':
      return {
        ...base,
        reparto: {
          modo: 'montos',
          montos: Object.fromEntries(raw.montos.map(fila => [fila.personaId, fila.monto])),
        },
      };
  }
}