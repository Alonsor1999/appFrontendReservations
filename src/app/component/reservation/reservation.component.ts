import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';
import { ReservationResponse } from '../../model/ReservationResponse';
import { Reservation } from '../../model/Reservation';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../service/reservation.service';

@Component({
  selector: 'app-reservation',
  imports: [MatCardModule, MatButtonModule, MatDialogModule,
    MatTableModule, CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, OnDestroy {
  empList: Reservation[] = [];  // Lista de reservas, no es necesario que sea ReservationResponse[] aquí
  dataSource!: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['spaceName', 'userName', 'startDate', 'endDate', 'action'];
  subscription = new Subscription();

  constructor(private dialog: MatDialog, private service: ReservationService) {}

  ngOnInit(): void {
    this.GetallReservation();
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción al destruir el componente
    this.subscription.unsubscribe();
  }

  GetallReservation() {
    let sub = this.service.GetAllReservation().subscribe((response: ReservationResponse) => {
      // Acceder a la propiedad 'data' que contiene el arreglo de reservas
      this.empList = response.data ? response.data : [];  // Asignar directamente a empList
      this.dataSource = new MatTableDataSource(this.empList);  // Asignar la fuente de datos para la tabla
    });
    this.subscription.add(sub);  // Añadir la suscripción para su limpieza posterior
  }

  // Método para eliminar la reserva
  DeleteReservation(id: string): void {
    // Llamamos al servicio para eliminar la reserva
    let sub = this.service.DeleteReservation(id).subscribe(() => {
      // Filtrar la lista empList para eliminar la reserva con el 'id' especificado
      this.empList = this.empList.filter(reservation => reservation.id !== id);
  
      // Actualizamos la fuente de datos para reflejar los cambios en la tabla
      this.dataSource = new MatTableDataSource(this.empList); 
    });
    this.subscription.add(sub);  // Añadimos la suscripción para su limpieza
  }


  addReservation() {
    this.dialog.open(AddReservationComponent, {
      width: '50%',
      exitAnimationDuration: '500ms',
      enterAnimationDuration: '500ms'
    });
  }
}