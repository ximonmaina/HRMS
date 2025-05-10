import { inject } from "@angular/core";
import { PermissionService } from "../../services/permissions.service";
import { filter, map, MonoTypeOperatorFunction, pipe, withLatestFrom } from "rxjs";
import { UserPermissions } from "../../infrastructure/types/user-permissions";

export function hasPermissions<T>(
    permissions: UserPermissions[],
    permissionService = inject(PermissionService)
): MonoTypeOperatorFunction<T> {
    return pipe(
        withLatestFrom(permissionService.hasPermissions(permissions)),
        filter(([,hasPermissions]) => hasPermissions),
        map(([value]) => value)
    )
}