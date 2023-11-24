import { Injectable, inject } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";
import { isSameDay, parseISO } from "date-fns";
import { DataService } from "app/services/data.service";

@Injectable()
export class AuthorValidator implements Validator {
    #dataService = inject(DataService);

    validate(control: AbstractControl<{
        firstName: string;
        lastName: string;
        fatherName: string | null;
        dob: Date;
    }>): ValidationErrors | null {
        const { authors } = this.#dataService.state();
        if (authors.some(author => 
            author.firstName === control.value.firstName && 
            author.lastName === control.value.lastName && 
            author.fatherName === control.value.fatherName && 
            isSameDay(parseISO(author.dob), control.value.dob)
        )) {
            return { authorExists: true };
        };
    
        return null;
    }
    
}

