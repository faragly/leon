import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'authors', loadComponent: () => import('./components/authors/authors.component').then(m => m.AuthorsComponent) },
    { path: 'books', loadComponent: () => import('./components/books/books.component').then(m => m.BooksComponent) },
    { path: '**', redirectTo: 'authors', pathMatch: 'full' }
];
