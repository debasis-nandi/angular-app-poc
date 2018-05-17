import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ChartService } from '../../widgets/charts/chart.service';

@Component({
    moduleId: module.id,
    selector: 'my-favourites',
    templateUrl: 'favourites.component.html'
})

export class FavouritesComponent {
    //@Input() ChartID: number;
    //@Input() ChartName: string;
    //@Input() DataType: string;
    //@Input() PageName: string;
    //UserID: string;
    constructor() {

    }
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    sendNotification() {
        this.notifyParent.emit('Some value to send to the parent');
    }

   
    

}
