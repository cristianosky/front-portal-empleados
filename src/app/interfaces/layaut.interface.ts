export interface Usuario {
    apellido: string;
    email: string;
    id: number;
    nombre: string;
    role: 'admin' | 'user';
    photo: string
}