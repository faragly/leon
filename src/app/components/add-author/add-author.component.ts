import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { subYears } from 'date-fns';

import { DataService } from 'app/services/data.service';
import { CreateAuthor } from 'app/models';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDateFnsModule, MatButtonModule, MatIconModule],
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent {
  readonly #fb = inject(FormBuilder);
  #dataService = inject(DataService);
  form = this.#fb.group({
    firstName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    lastName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    fatherName: new FormControl(''),
    dob: new FormControl<Date>(new Date(1900, 0, 1), { validators: [Validators.required], nonNullable: true })
  });
  maxDate = subYears(new Date(), 18);

  handleAdd() {
    const formValue = this.form.getRawValue();
    const value: CreateAuthor = {
      ...formValue,
      fatherName: formValue.fatherName ?? undefined
    };
    this.#dataService.addAuthor(value);
    this.form.reset();
  }
}
