export class Cita {
    constructor(
        public idPaciente: number,
        public idMedico?:string,
        public fechaProgramada? : string,
        public fechaRegistro?: Date,
        public horaCita? :number,
        public urgencia?: string     
    ) { }
}
