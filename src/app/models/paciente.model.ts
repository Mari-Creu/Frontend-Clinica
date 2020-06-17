import { Usuario } from './usuario.model';

export class Paciente {
    constructor(

        public id: Usuario,
        public seguridadSocial?: string,
        public mutua?: string,
        public fechaNacimiento?: Date,
        public baja?: boolean
    ) { }
}
