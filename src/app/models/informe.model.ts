

export class Informe {
    constructor(
        public idPaciente:number,
        public idMedico: number,
        public evaluacion: string,
        public observaciones?: string,
        public diagnostico?: string,
        public tratamiento?: string,
        public id?: number,
        public fechaInforme?: string,

    ) { }
}