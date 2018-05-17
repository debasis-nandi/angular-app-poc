import { Component, Input, Output, EventEmitter, Renderer, ViewChild, ElementRef} from '@angular/core';
import { IExports } from '../charts/chart';
import {SelectItem} from 'primeng/primeng';
@Component({
    moduleId: module.id,
    selector: 'my-export',
    templateUrl: 'export.component.html'

})

export class ExportComponent {
    @Input() exportsList: IExports[];
    @Output() selectedValueEmit: EventEmitter<IExports> = new EventEmitter<IExports>();
    @Output() exportVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
    radioValue: any = 2;
    multiSelectValues: Object[] = null;
    //@ViewChild('radioExport') radioExport: ElementRef;
    isShow: boolean = false;
    showOnChange: boolean = true;
    constructor(private renderer: Renderer) { }

   

    onChangeRadioButton(filterValue: number, filterName: string) {
        let selectedRadioValue: IExports = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedRadioValue["exportName"] = filterName;
        selectedRadioValue["selectedData"] = filterValue;
        //console.log(selectedRadioValue);
        this.selectedValueEmit.emit(selectedRadioValue);

    }

    onChangeImageRadioButton(filterValue: any, filterName: string) {
        let selectedRadioValue: IExports = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedRadioValue["exportName"] = filterName;
        selectedRadioValue["selectedData"] = filterValue;
        //console.log(selectedRadioValue);
        this.selectedValueEmit.emit(selectedRadioValue);

        if (filterValue == 1) {            
                this.showOnChange = false;
                this.onChangeRadioButton(2, "Insights")
                this.isShow = false;            
        }

        else {
             if (this.isShow == false) {      
                this.showOnChange = true;
                this.radioValue = 2;
                this.isShow = true;
            }
        }
    }

    onChangeMultiSelect(filterValue: any, filterName: string, options:any) {              

        if (filterValue.length == 0) {
            this.exportVisible.emit(true)
        }
        else {
            this.exportVisible.emit(false)
        }
        let selectedValue: IExports = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["exportName"] = filterName;
        selectedValue["selectedData"] = filterValue;
        this.selectedValueEmit.emit(selectedValue);

        //var optionsLength: number = options.length;
        //var selectedLength: number = filterValue.length;
        //if (filterValue.length > 0) {
        //    if (filterValue[filterValue.length - 1] == 0) {
        //        this.multiSelectValues = [];
        //        for (let option of options) {
        //            this.multiSelectValues.push(option.value);
        //        }
        //    }

        //    else if (options.length - filterValue.length == 1) {
        //        var x: number = 1;
        //        for (let filter of filterValue) {
        //            if (filter == 0) {
        //                x = 0;
        //            }
        //        }
        //        if(x==1)
        //            this.multiSelectValues.push(0);
        //        else
        //            this.multiSelectValues = this.multiSelectValues.filter(x => x != 0);
        //    }

        //    else {
        //        this.multiSelectValues = this.multiSelectValues.filter(x => x != 0);
        //    }
        //}

       
    }

    ngOnChanges(): void {
        this.multiSelectValues = [];
        for (let entry of this.exportsList) {
            if (entry.exportType) {
                if (entry.exportType.toLocaleLowerCase() === 'multiselect') {
                    if (entry.selectedData) {
                        this.multiSelectValues = [+entry.selectedData];
                        let selectedValue: IExports = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue["exportName"] = entry.exportName;
                        selectedValue["selectedData"] = [+entry.selectedData];
                        this.selectedValueEmit.emit(selectedValue);
                        this.exportVisible.emit(false)
                    }

                }
            }
        }     
        //this.showOnChange = false;
        //this.onChangeRadioButton(2, "Insights");
        //this.isShow = false;
        this.onChangeImageRadioButton("1", "Export As");
    }

    ngAfterViewInit(): void {
        for (let entry of this.exportsList) {           
            if (entry.exportType) {
                if (entry.exportType.toLocaleLowerCase() === 'radiobutton' || entry.exportType.toLocaleLowerCase() === 'imageradiobutton') {
                    let selectedValue: IExports = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["exportName"] = entry.exportName;

                    if (entry.exportType.toLocaleLowerCase() === 'imageradiobutton' && entry.selectedData == 1) {
                        selectedValue["selectedData"] = entry.selectedData;
                        this.showOnChange = false;
                    }
                    else {
                        selectedValue["selectedData"] = entry.selectedData;
                    }
                    this.selectedValueEmit.emit(selectedValue);
                }
            }
        }

    }
}

