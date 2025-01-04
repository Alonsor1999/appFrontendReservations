export interface ReservationResponse {
  data: Reservation[];  // Aquí añadimos la propiedad 'data', que es un arreglo de objetos de tipo 'Reservation'
}

export interface Reservation {
  id: string;
  spaceId: string;
  userId: string;
  userName: string;
  spaceName: string;
  startDate: string;  // O puedes usar Date si prefieres trabajar con objetos de fecha
  endDate: string;    // Lo mismo para endDate
  status: boolean;
  createdAt: string;  // O Date si prefieres trabajar con objetos de fecha
  updatedAt: string;  // O Date si prefieres trabajar con objetos de fecha
}
