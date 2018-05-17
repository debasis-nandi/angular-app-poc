import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ViewGlossaryComponent } from './viewglossary.component';
import { GlossaryModule } from '../../widgets/glossary/glossary.module';
import { ViewGlossaryRouting } from './viewglossary.routing';
import { RouterModule } from '@angular/router';
import { CustomPipesModule } from '../../pipes/custompipes.module';

@NgModule({
    imports:
    [
        CommonModule,
        FormsModule,
        GlossaryModule,
        HttpModule,
        ViewGlossaryRouting,
        CustomPipesModule
    ],
    exports: [
        ViewGlossaryComponent
    ],
    declarations: [
        ViewGlossaryComponent
    ]
})
export class ViewGlossaryModule { }