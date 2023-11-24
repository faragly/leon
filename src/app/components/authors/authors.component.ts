import { Component } from '@angular/core';
import { AddAuthorComponent } from '../add-author/add-author.component';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [AddAuthorComponent],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  
}
