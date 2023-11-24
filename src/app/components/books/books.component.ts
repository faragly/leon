import { Component } from '@angular/core';
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AddBookComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  
}
