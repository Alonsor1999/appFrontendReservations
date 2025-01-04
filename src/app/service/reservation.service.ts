import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Space } from '../model/Space';  // Importa tu modelo Space
import { Reservation } from '../model/Reservation';
import { ReservationResponse } from '../model/ReservationResponse';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:5257/api';  // URL de tu API

  constructor(private http:HttpClient) { }

  // Obtener los espacios
  getSpaces(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/space`);
  }

  // Obtener los usuarios
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`);
  }

  // Método para obtener todas las reservas
  GetAllReservation(): Observable<ReservationResponse> {
    return this.http.get<ReservationResponse>(`${this.apiUrl}/Reservation`);
  }

  // Eliminar una reserva
  DeleteReservation(id: string): Observable<any> {
    return this.http.delete<ReservationResponse>(`${this.apiUrl}/Reservation/${id}`);
  }


  CreateReservation(data: any) {
    return this.http.post(`${this.apiUrl}/Reservation`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Especifica que el contenido es JSON
      }),
    });
  }
  
  Delete(empId: number) {
    return this.http.delete(`${this.apiUrl}/Reservation` + '/' + empId);
  }
}
