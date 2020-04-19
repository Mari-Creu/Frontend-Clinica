
export class Usuario {
    constructor(
       
        public email: string,
        public password: string,
        public nombre?: string,
        public apellidos?: string,
        public dni?: string,
        public createAt?: Date,
        public telefono?: string,
        public imagen?: string,
        public id?: string,
        public rol?: string,
    ) { }
}
