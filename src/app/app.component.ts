import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  reservationForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      space: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  onSubmit() {
    console.log(this.reservationForm.value);
  }
}