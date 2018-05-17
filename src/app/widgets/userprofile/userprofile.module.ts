import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './userprofile.component'
import { UserProfileService } from './userprofile.service'
import { ModalModule } from '../modals/modal.module';
@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        ModalModule
    ],
    exports: [
        UserProfileComponent
    ],
    declarations: [
        UserProfileComponent,
    ],
    providers: [UserProfileService]
})
export class UserProfileModule { }