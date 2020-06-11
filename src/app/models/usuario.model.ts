
export class Usuario {
    constructor(
       
        public email: string,
        public password: string,
        public nombre?: string,
        public apellidos?: string,
        public rol?: number,
        public dni?: string,
        public createAt?: Date,
        public telefono?: string,
        public imagen?: string,
        public id?: string,
    ) { }
}
