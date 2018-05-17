import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'my-mapping',
    templateUrl: 'mapping.component.html'
})
export class MappingComponent {
    public pageTitle: string = 'MetaData Mapping';
}
