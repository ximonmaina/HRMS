import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../infrastructure/types/notification';

@Component({
  selector: 'app-header',
  imports: [NgIf, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly notificationService = inject(NotificationService);

  constructor() {
    this.notificationService.connect();
  }

  notifications = this.notificationService.notifications;
  unreadNotifications = this.notificationService.unreadNotifications();
  notificationsOpen = signal(false);

  markAsRead(notification: Notification) {
    this.notificationService.markAsRead(notification);
  }
}
