import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';  // Asegúrate de importar EventEmitter y Output
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { Reservation } from '../../model/Reservation';
import { ReservationService } from '../../service/reservation.service';
// import { Employee } from '../../model/Employee';
// import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Space } from '../../model/Space';
// import { ToastrService } from 'ngx-toastr';
// import { Store } from '@ngrx/store';
// import { addEmployee, getEmployee, updateEmployee } from '../../Store/Employee.Action';
// import { selectEmployee } from '../../Store/Employee.Selector';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { User } from '../../model/User';


@Component({
  selector: 'app-add-reservation',
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule,
    MatIconModule, CommonModule],
    providers: [provideNativeDateAdapter()],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.css'
})
export class AddReservationComponent implements OnInit {
  spaces: Space[] = [];  // Aquí almacenamos los espacios obtenidos
  users: User[] = [];    // Almacenamos los usuarios obtenidos

  ngOnInit(): void {
    // Llamar a la API para obtener los espacios disponibles
    this.service.getSpaces().subscribe({
      next: (response) => {
        // Verificar si la respuesta tiene la propiedad 'data' con los espacios
        if (response && response.data) {
          this.spaces = response.data;  // Asignamos la lista de espacios
        } else {
          console.error('No se encontraron espacios en la respuesta.');
          alert('No se pudieron cargar los espacios disponibles.');
        }
      },
      error: (err) => {
        console.error('Error al obtener los espacios:', err);
        alert('No se pudieron cargar los espacios disponibles.');
      }
    });

     // Obtener los usuarios
     this.service.getUsers().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.users = response.data;
        } else {
          console.error('No se encontraron usuarios en la respuesta.');
          alert('No se pudieron cargar los usuarios disponibles.');
        }
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
        alert('No se pudieron cargar los usuarios disponibles.');
      }
    });
  }



  constructor(private service: ReservationService, private ref: MatDialogRef<AddReservationComponent>){

  }

  title = 'Create Reservation'
  empForm=new FormGroup({
    // spaceId:new FormControl(0),
    spaceId:new FormControl('', Validators.required),
    userId:new FormControl('', Validators.required),
    startDate:new FormControl(new Date(),Validators.required),
    endDate:new FormControl(new Date(),Validators.required),
  })

  @Output() reservationSaved = new EventEmitter<void>();  // Emisor de evento

  SaveReservation() {
    if (this.empForm.valid) {
      // Crear el objeto reservationPostDto con el formato esperado por la API
      let _data: any = {
        reservationPostDto: {
          spaceId: this.empForm.value.spaceId as string,
          userId: this.empForm.value.userId as string,
          startDate: new Date(this.empForm.value.startDate as Date).toISOString(),
          endDate: new Date(this.empForm.value.endDate as Date).toISOString(),
        },
      };
  
      console.log(_data); // Verifica en la consola los datos a enviar
  
      // Llamar al servicio para crear la reserva
      this.service.CreateReservation(_data).subscribe({
        next: () => {
          alert('Reserva guardada exitosamente.');
          this.reservationSaved.emit();  // Emitir el evento después de guardar la reserva
   
          // this.empForm.reset(); // Limpiar el formulario
          this.ref.close();
        },
        error: (err) => {
          console.error('Error al guardar la reserva:', err);
          alert('Error al guardar la reserva. Por favor, intente nuevamente.');
        },
      });
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  closepopup() {
    this.ref.close();
  }
  // dialodata: any;
  // isEdit = false;
}
