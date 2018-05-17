import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddGlossaryComponent } from './addglossary.component';
import { GlossaryModule } from '../../widgets/glossary/glossary.module';
import { AddGlossaryRouting } from './addglossary.routing';
import { RouterModule } from '@angular/router';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        GlossaryModule,
        AddGlossaryRouting
    ],
    exports: [
        CommonModule,
        FormsModule,        
    ],
    declarations: [
        AddGlossaryComponent
    ]
})
export class AddGlossaryModule { }