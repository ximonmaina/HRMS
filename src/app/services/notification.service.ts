import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Notification } from "../infrastructure/types/notification";
import { SocketService } from "./socket.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private readonly socketService = inject(SocketService);

    #notifications = signal<Notification[]>(
        localStorage.getItem('notifications') ?
            JSON.parse(localStorage.getItem('notifications')!) : []
    )

    notifications = this.#notifications.asReadonly();
    readNotifications = computed(() => {
        this.#notifications().filter(n => n.read)
    });

    unreadNotifications = computed(
        () => this.#notifications().filter(n => !n.read)
        );

    // An effect to store the latest notification in storage
    constructor() {
        effect(() => {
            localStorage.setItem('notifications', JSON.stringify(this.#notifications));
        });
    }

    // method will provide connection on a case-by-case scenario
    connect() {
        // manually set the value of the notifications as they arrive from the websocket
        return this.socketService.notifications$.pipe(
            takeUntilDestroyed() // allows us to automatically unsubscribe from the context we are in
        ).subscribe(notifications => { // subscribe to the notifications observable from the web socket
            this.#notifications.set(notifications);
        })
    }
    
    addNotification(notification: Notification)  {
        this.#notifications.update(values => [...values, notification]);
    }

    markAsRead(notification: Notification) {
        this.#notifications.update(
            value => value.map(
                n => n.id === notification.id ? {
                    ...n,
                    read: true
                }: n
            )
        );
    }

    markAllAsRead() {
        this.#notifications.update(
            value => value.map(n => ({...n, read: true}))
        );
    }
}