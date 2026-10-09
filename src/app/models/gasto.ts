export type ModoReparto = 'iguales' | 'porcentajes' | 'montos';

export type Reparto =
  | { modo: 'iguales'; entre: string[] }                      
  | { modo: 'porcentajes'; porcentajes: Record<string, number> } 
  | { modo: 'montos'; montos: Record<string, number> };          

export interface Gasto {
    id: string;
    viajeId: string;
    descripcion: string;
    monto: number;
    fecha: string;
    pagadorId: string;
    reparto: Reparto;
}

export type NuevoGasto = Omit<Gasto, 'id' | 'viajeId'>