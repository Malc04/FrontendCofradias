export interface Usuario {
    id?: number;
    nombreUsuario: string;
    email: string;
    contrasenya: string;
    fechaRegistro?: string;
    idRol?: number;
    idHermano?: number | null;
}
