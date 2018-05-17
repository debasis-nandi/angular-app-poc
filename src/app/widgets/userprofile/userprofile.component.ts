import { Component, Input, ViewChild } from '@angular/core';
import { IUserProfile } from './userprofile.model';
import { ModalComponent } from '../modals/modal.component';
import { ModalDetail } from '../modals/modal.model';
@Component({
    moduleId: module.id,
    selector: 'app-user-profile',
    templateUrl: 'userprofile.component.html'
})
export class UserProfileComponent {
    @ViewChild(ModalComponent) _modalComponent: ModalComponent;
    @Input() userProfile: IUserProfile;
    @Input() modalclasses?: ModalDetail;
   
    onOpen() {
        this._modalComponent.show();
    }
    onClose() {
        this._modalComponent.hide();
    }
}