export type CreateAuthor = {
    firstName: string;
    lastName: string;
    fatherName?: string;
    dob: Date;
}

type ID = { id: number };

export type Author = ID & CreateAuthor;

export type CreateBook = {
    authorId: number;
    name: string;
    publisher: string;
    year: number;
}

export type Boot = ID & CreateAuthor;