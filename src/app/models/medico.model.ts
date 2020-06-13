import { Usuario } from './usuario.model';

export class Medico {
    constructor(

        public id: Usuario,
        public especialidad?: string,
        public fechaContratacion?: Date,
        public fechaFinContrato?: Date
    ) { }
}
