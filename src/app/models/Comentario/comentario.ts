export interface Comentario {
    id: number;
    idUsuario: number;
    idProducto: number;
    idPedido: number;
    contenido: string;
    valoracion: number;
    fechaComentario: Date;
  }
  