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
var UnderlyingDatatableComponent = (function () {
    function UnderlyingDatatableComponent() {
        this.scrollable = true;
        this.styleClass = 'ui-datatable table table-hover comp-table';
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UnderlyingDatatableComponent.prototype, "tableHeader", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UnderlyingDatatableComponent.prototype, "tableData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UnderlyingDatatableComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], UnderlyingDatatableComponent.prototype, "pageLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], UnderlyingDatatableComponent.prototype, "rowsPerPage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UnderlyingDatatableComponent.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UnderlyingDatatableComponent.prototype, "responsive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], UnderlyingDatatableComponent.prototype, "scrollable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UnderlyingDatatableComponent.prototype, "styleClass", void 0);
    UnderlyingDatatableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'underlying-table',
            templateUrl: 'underlying-datatable.component.html',
            styleUrls: ['underlying-datatable.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], UnderlyingDatatableComponent);
    return UnderlyingDatatableComponent;
}());
exports.UnderlyingDatatableComponent = UnderlyingDatatableComponent;
//# sourceMappingURL=underlying-datatable.component.js.map