import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { UserPermissions } from "../infrastructure/types/user-permissions";



@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    private readonly permissions$ = new BehaviorSubject<Partial<Record<UserPermissions, boolean>>>({
        ViewEmployees: true
    });

    hasPermission(permission: UserPermissions) {
        return this.permissions$.pipe(map(permissions => permissions[permission] ?? false));
    }

    hasPermissions(permissions: UserPermissions[]) {
        return this.permissions$.pipe(map(existingPermissions => permissions.every(permission => existingPermissions[permission] ?? false)));
    }

    setPermission(permissions: Partial<Record<UserPermissions, boolean>>) {
        this.permissions$.next({...this.permissions$.getValue(), ...permissions});
    }

    revokePermission(permission: UserPermissions) {
        this.permissions$.next({...this.permissions$.getValue(), [permission]: false});
    }
}