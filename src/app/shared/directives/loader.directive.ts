import { ComponentRef, Directive, EmbeddedViewRef, inject, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { LoaderComponent } from "../components/loader/loader.component";

@Directive({
    selector: '[loading]',
    standalone: true
})
export class LoaderDirective implements OnInit, OnChanges {
    private readonly templateRef = inject(TemplateRef); //reference to the template the structural directive is applied to
    /**
     * A container where one or more views can be attached to a component
     * USE: Will create and render the dynamic component
     */
    private readonly vcRef = inject(ViewContainerRef); 
    @Input() loading = false;
    templateView: EmbeddedViewRef<any> | undefined; // represents an angular view in a container
    loaderRef: ComponentRef<LoaderComponent> | undefined; // reference to the dynamically created LoaderComponent

    ngOnInit(): void {
        this.templateView = this.templateRef.createEmbeddedView({});
        this.loaderRef = this.vcRef.createComponent(
            LoaderComponent, // creates the component
            {
                injector: this.vcRef.injector, // DI for this component
                projectableNodes: [this.templateView.rootNodes] // passes the template as content to the dynamically created LoaderComponent
            }
        );
        this.loaderRef.setInput('loading', this.loading); // passing the input property to the loader component
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loaderRef?.setInput('loading', this.loading);
    }
}

/**
 * USAGE: 
<div *loading="isSomeContentLoading">
    Some content
    <span *loading="isOtherLoading">
        Some other content
    </span>
    <p *loading="isEvenMoreLoading">
        Even more content
    </p>
</div>
 */
