export interface Gasto {
    id: string;
    monto: number;
    descripcion: string;
    fecha: string;
    pagadorId: string;
    repartidoEntre: string[];
    viajeId: string;
}
