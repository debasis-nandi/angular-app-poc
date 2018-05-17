"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ExportComponent = (function () {
    function ExportComponent(renderer) {
        this.renderer = renderer;
        this.selectedValueEmit = new core_1.EventEmitter();
        this.exportVisible = new core_1.EventEmitter();
        this.radioValue = 2;
        this.multiSelectValues = null;
        //@ViewChild('radioExport') radioExport: ElementRef;
        this.isShow = false;
        this.showOnChange = true;
    }
    ExportComponent.prototype.onChangeRadioButton = function (filterValue, filterName) {
        var selectedRadioValue = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedRadioValue["exportName"] = filterName;
        selectedRadioValue["selectedData"] = filterValue;
        //console.log(selectedRadioValue);
        this.selectedValueEmit.emit(selectedRadioValue);
    };
    ExportComponent.prototype.onChangeImageRadioButton = function (filterValue, filterName) {
        var selectedRadioValue = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedRadioValue["exportName"] = filterName;
        selectedRadioValue["selectedData"] = filterValue;
        //console.log(selectedRadioValue);
        this.selectedValueEmit.emit(selectedRadioValue);
        if (filterValue == 1) {
            this.showOnChange = false;
            this.onChangeRadioButton(2, "Insights");
            this.isShow = false;
        }
        else {
            if (this.isShow == false) {
                this.showOnChange = true;
                this.radioValue = 2;
                this.isShow = true;
            }
        }
    };
    ExportComponent.prototype.onChangeMultiSelect = function (filterValue, filterName, options) {
        if (filterValue.length == 0) {
            this.exportVisible.emit(true);
        }
        else {
            this.exportVisible.emit(false);
        }
        var selectedValue = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
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
    };
    ExportComponent.prototype.ngOnChanges = function () {
        this.multiSelectValues = [];
        for (var _i = 0, _a = this.exportsList; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.exportType) {
                if (entry.exportType.toLocaleLowerCase() === 'multiselect') {
                    if (entry.selectedData) {
                        this.multiSelectValues = [+entry.selectedData];
                        var selectedValue = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue["exportName"] = entry.exportName;
                        selectedValue["selectedData"] = [+entry.selectedData];
                        this.selectedValueEmit.emit(selectedValue);
                        this.exportVisible.emit(false);
                    }
                }
            }
        }
        //this.showOnChange = false;
        //this.onChangeRadioButton(2, "Insights");
        //this.isShow = false;
        this.onChangeImageRadioButton("1", "Export As");
    };
    ExportComponent.prototype.ngAfterViewInit = function () {
        for (var _i = 0, _a = this.exportsList; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.exportType) {
                if (entry.exportType.toLocaleLowerCase() === 'radiobutton' || entry.exportType.toLocaleLowerCase() === 'imageradiobutton') {
                    var selectedValue = { id: 0, exportType: '', exportName: '', exportData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ExportComponent.prototype, "exportsList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ExportComponent.prototype, "selectedValueEmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ExportComponent.prototype, "exportVisible", void 0);
    ExportComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-export',
            templateUrl: 'export.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], ExportComponent);
    return ExportComponent;
}());
exports.ExportComponent = ExportComponent;
//# sourceMappingURL=export.component.js.map