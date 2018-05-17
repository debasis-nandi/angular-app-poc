
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'underlying-table',
    templateUrl: 'underlying-datatable.component.html',
    styleUrls: ['underlying-datatable.component.css'],
    encapsulation: ViewEncapsulation.None
    
})

export class UnderlyingDatatableComponent {

    @Input() tableHeader: any;
    @Input() tableData: any;
    @Input() paginator: boolean;
    @Input() pageLinks: number;
    @Input() rowsPerPage: number;
    @Input() rowsPerPageOptions: Array<number>;
    @Input() responsive: boolean;
    @Input() scrollable?: boolean = true;
    @Input() styleClass: string = 'ui-datatable table table-hover comp-table';
  
}