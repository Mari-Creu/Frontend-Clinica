
export class Ingreso {
    constructor(
        public idHabitacion: number,
        public idPaciente: number,
        public fechaIngreso?: Date,
        public fechaSalida?: Date,
        public id?: number,
    ) { }
}