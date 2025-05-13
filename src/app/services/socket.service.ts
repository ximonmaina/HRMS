import { Injectable } from "@angular/core";
import { interval, map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    notifications$ = interval(2500).pipe(map(() => []), tap(() => console.log('Emitted')));
}