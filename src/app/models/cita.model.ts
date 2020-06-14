export class Cita {
    constructor(
        public idPaciente: number,
        public idMedico?:string,
        public fechaProgramada? : Date,
        public fechaRegistro?: Date,
        public horaCita? :number,
        public urgencia?: string     
    ) { }
}
