import { Component, Signal, computed, inject } from '@angular/core';

import { AddBookComponent } from '../add-book/add-book.component';
import { BooksTableComponent } from '../books-table/books-table.component';
import { DataService } from 'app/services/data.service';
import { BookExt } from 'app/models';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AddBookComponent, BooksTableComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  #dataService = inject(DataService);
  books: Signal<BookExt[]> = computed(() => {
    const { authors,books } = this.#dataService.state();
    return books.map(book => {
      const author = authors.find(({ id }) => book.authorId === id);
      return { ...book, author: author ? `${author.lastName} ${author.firstName} ${author.fatherName}` : '' };
    })
  });
}
