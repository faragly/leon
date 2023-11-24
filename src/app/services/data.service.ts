import { Injectable, Signal, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { defaults, isEqual } from 'lodash';

import { LocalStorageService } from './local-storage.service';
import { Author, Book, CreateAuthor, CreateBook } from '../models';

interface State {
  authors: Author[];
  books: Book[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  #localStorageService = inject(LocalStorageService);
  state: WritableSignal<State> = signal(defaults(this.#localStorageService.get<State>('state'), { authors: [], books: [] }), { equal: isEqual });
  #nextAuthorId: Signal<number> = computed(() => this.state().authors.map(({ id }) => id).reduce((acc, v) => v > acc ? v : acc, 0) + 1);
  #nextBookId: Signal<number> = computed(() => this.state().books.map(({ id }) => id).reduce((acc, v) => v > acc ? v : acc, 0) + 1);

  constructor() {
    effect(() => {
      const state = this.state();
      this.#localStorageService.set('state', state);
    });
  }

  addAuthor(author: CreateAuthor) {
    this.state.update(state => ({
      ...state,
      authors: [...state.authors, { ...author, id: this.#nextAuthorId() }]
    }))
  }

  addBook(book: CreateBook) {
    this.state.update(state => ({
      ...state,
      books: [...state.books, { ...book, id: this.#nextBookId() }]
    }))
  }
}
