import { Service, signal } from '@angular/core';
import { Viaje } from '../models/viaje';
import { Persona } from '../models/persona';
import { Participacion } from '../models/participacion';

@Service()
export class ViajesService {
    private _viajes = signal<Viaje[]>([]);
    private _personas = signal<Persona[]>([]);
    private _participaciones = signal<Participacion[]>([]);

    public  readonly viajes = this._viajes.asReadonly();
    public  readonly personas = this._personas.asReadonly();

    crearViaje(viaje: Omit<Viaje, 'id'>): void {
        const nuevoId = crypto.randomUUID();
        const viajeConId : Viaje = { id: nuevoId , ...viaje };
        this._viajes.update(viajes => [...viajes, viajeConId]);
    }

    agregarParticipantes(viajeId: string, personas: string[]): void {
        const viaje = this._viajes().find(v => v.id === viajeId);
        if (viaje) {
            const participantes = this._participaciones().filter(p => p.viajeId === viajeId).map(p => p.personaId);
            const participanetsNuevos = personas.filter(persona => !participantes.includes(persona)).map(persona => ({
                personaId: persona,
                viajeId: viajeId
            }));
            this._participaciones.update(participaciones => [...participaciones, ...participanetsNuevos]);
        }
    }

    crearPersona(persona: Omit<Persona, 'id'>): string {
        const nuevoId = crypto.randomUUID();
        const personaConId = { id: nuevoId, ...persona };
        this._personas.update(personas => [...personas, personaConId]);
        return nuevoId;
    }

    getViajeById(id: string): Viaje | undefined {
        return this._viajes().find(viaje => viaje.id === id);
    }

    getParticipantesByViajeId(viajeId: string): Persona[] {
        const participantesIds = this._participaciones().filter(p => p.viajeId === viajeId).map(p => p.personaId);
        return this._personas().filter(persona => participantesIds.includes(persona.id));
    }

    getParticipantesDisponibles(viajeId: string): Persona[] {
        const participantesIds = this._participaciones().filter(p => p.viajeId === viajeId).map(p => p.personaId);
        return this._personas().filter(persona => !participantesIds.includes(persona.id));
    }
}
