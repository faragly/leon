import { Component, Signal, computed, inject } from '@angular/core';
import { AddAuthorComponent } from '../add-author/add-author.component';
import { AuthorsTableComponent } from '../authors-table/authors-table.component';
import { DataService } from 'app/services/data.service';
import { Author } from 'app/models';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [AddAuthorComponent, AuthorsTableComponent],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  #dataService = inject(DataService);
  authors: Signal<Author[]> = computed(() => this.#dataService.state().authors);
}
