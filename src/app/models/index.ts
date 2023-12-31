export type CreateAuthor = {
    firstName: string;
    lastName: string;
    fatherName?: string;
    dob: string;
}

type ID = { id: number };

export type Author = ID & CreateAuthor;

export type CreateBook = {
    authorId: number;
    name: string;
    publisher?: string;
    year: number;
}

export type Book = ID & CreateBook;

export type BookExt = Book & { author: string };