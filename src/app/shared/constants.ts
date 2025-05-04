import { InjectionToken } from "@angular/core";

const CONSTANTS = {
    dateFormat: 'dd/MM/yyyy'
};

export const Constants = new InjectionToken('Constants', {
    // Injection token factory that returns the value
    factory() {
        return CONSTANTS;
    },
    providedIn: 'root' // provides injection token in the whole application
});