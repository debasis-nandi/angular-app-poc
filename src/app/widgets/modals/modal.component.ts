import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ModalDetail } from './modal.model';

@Component({
    moduleId: module.id,
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
    @Input() modalclasses?: ModalDetail;
    //@Input() csModalDialog?: string = "";
    //@Input() csModalHeader?: string = "";
    //@Input() csModalBody?: string = "";
    //@Input() csModalFooter?: string = "";
    public visible = false;
    private visibleAnimate = false;

    constructor() {
    }

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide();
        }
    }

}
