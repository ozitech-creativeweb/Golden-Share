import { AbstractControl, ValidationErrors } from "@angular/forms";


export class UsernameValidators {
    //no space validation
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0)
            return { cannotContainSpace: true };
        return null;
    };

    //unique username validation
    // static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
    //     return new Promise((resolve, _reject) => {
    //         setTimeout (() => {
    //             if (control.value === 'michael')
    //                 resolve({ shouldBeUnique: true });
    //             else
    //                 resolve(null);
    //         }, 2000);
    //     });
    // }
}