import { AfterViewInit, Directive, ElementRef, inject, InjectionToken, Input } from "@angular/core";

export const TruncateLimit = new InjectionToken<number>('TruncateLimit'); // defines the token

@Directive({
    selector: '[appTruncate]',
    standalone: true,
})
export class TruncateDirective implements AfterViewInit {
    @Input() limit = inject(TruncateLimit, {optional: true}) ?? 80; // flexibility is provided only via an input
    private readonly elRef = inject(ElementRef);

    ngAfterViewInit(): void {
        // after view is initialized, the directive will change the text content of the target element
        this.elRef.nativeElement.textContent = this.elRef.nativeElement.textContent.slice(0, this.limit); 
    }
}
/**
 * Component usage:
 * <td appTruncate [limit]="10" >{{employee.position}}</td>
 */