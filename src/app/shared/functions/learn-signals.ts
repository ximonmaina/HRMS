import { signal } from "@angular/core";

export function learnSignals() {
    const count = signal(0);
    console.log(count());
    count.set(1)
    console.log(count());
    // using other signals as values for some other signal
    count.set(count() + 1);
    // updating a signal's value
    /**
     * 
     * argument is the previous value of the signal
     * @returns new value from the callback fn
     */
    const increment = () => count.update(value => value + 1);
    increment();
    console.log(count());

    const names = signal<string[]>([]);
    const addName = (name: string) => names.update(value => [...value, name]);
    addName('John');
    console.log(names());
}