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
var modal_component_1 = require('../modals/modal.component');
var UserProfileComponent = (function () {
    function UserProfileComponent() {
    }
    UserProfileComponent.prototype.onOpen = function () {
        this._modalComponent.show();
    };
    UserProfileComponent.prototype.onClose = function () {
        this._modalComponent.hide();
    };
    __decorate([
        core_1.ViewChild(modal_component_1.ModalComponent), 
        __metadata('design:type', modal_component_1.ModalComponent)
    ], UserProfileComponent.prototype, "_modalComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UserProfileComponent.prototype, "userProfile", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UserProfileComponent.prototype, "modalclasses", void 0);
    UserProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-user-profile',
            templateUrl: 'userprofile.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=userprofile.component.js.map