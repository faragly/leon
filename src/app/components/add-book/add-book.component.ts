import { Component, Signal, computed, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { isEqual } from 'lodash';
import { getYear, setYear, subYears } from 'date-fns';

import { DataService } from 'app/services/data.service';
import { Author, CreateBook } from 'app/models';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDateFnsModule, MatButtonModule, MatIconModule, MatSelectModule],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'yyyy',
        },
        display: {
          dateInput: 'yyyy',
          monthYearLabel: 'MMM yyyy',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM yyyy'
        }
      }
    }
  ],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  readonly #fb = inject(FormBuilder);
  #dataService = inject(DataService);
  authors: Signal<Author[]> = computed(() => this.#dataService.state().authors, { equal: isEqual });
  form = this.#fb.group({
    authorId: new FormControl<number | null>(null, { validators: [Validators.required], nonNullable: true }),
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    publisher: new FormControl(),
    year: new FormControl<Date>(new Date(1900, 0, 1), { validators: [Validators.required], nonNullable: true })
  });
  maxDate = subYears(new Date(), 18);

  handleAdd() {
    const { name, authorId, year, publisher } = this.form.getRawValue();
    if (authorId) {
      const value: CreateBook = {
        name,
        authorId,
        publisher: publisher ?? undefined,
        year: getYear(year),
      };
      this.#dataService.addBook(value);
      this.form.reset();
    }
  }

  setYear(date: Date, datepicker: MatDatepicker<Date>) {
    const { year } = this.form.getRawValue();
    if (year) {
      this.form.patchValue({ year: setYear(year, getYear(date)) });
    }
    datepicker.close();
  }
}
