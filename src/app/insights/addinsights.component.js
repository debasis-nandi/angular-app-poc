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
var global_config_1 = require('../global/global.config');
var global_util_1 = require('../global/global.util');
var insights_service_1 = require('./insights.service');
var modal_component_1 = require('../widgets/modals/modal.component');
var AddInsightsComponent = (function () {
    function AddInsightsComponent(insightsService) {
        this.insightsService = insightsService;
        this.initEditor = false;
        this.insightsClasses = [];
        this.pageName = '';
        this.insightListCountChange = new core_1.EventEmitter();
        this.InsightEditorFocus = new core_1.EventEmitter();
        this.editorPlaceHolder = '<span class="lgrey size12">Please type an insight.</span>';
        this.isAddInsightDisabled = true;
        this.insightsData = '';
        this.isEditMode = false;
        this.showInsightButton = true;
        this.showContent = true;
        this.bodyClass = 'panel-body';
        this.headerClass = 'panel-heading';
        this.insightList = [];
        this.newInsight = {
            insightId: null,
            insightData: "",
            pageName: "",
            appliedFilterId: null,
            widgetDetailIds: "",
            appliedFilters: null,
            identificationFlag: "",
            author: "",
            updatedBy: "",
            updatedDate: null,
            isActive: false
        };
        this.snapshotDesc = "";
        this.maxAllowedLength = 1000;
        this.buttonName = '';
        this.showDataList = true;
        this.showBackButton = false;
        this.charLeft = this.maxAllowedLength;
        this.IsAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.userId = global_util_1.GlobalUtil.getAppSession("UserInfo").userId;
        this.statusClass = {
            green1: true,
            mandatory: false
        };
        this.confirmHeader = "Insights";
        this.confirmDescription = "Are you sure, you want to delete this insight?";
        this.modalclasses = {
            csModalDialog: null,
            csModalBody: "animated fadeInDown"
        };
        this.isConfirm = true;
        this.loadScripts();
        this.insightsClasses = [];
        this.insightTitleClass = {
            'data-chart-insights': true,
            'data-page-insights': false
        };
    }
    Object.defineProperty(AddInsightsComponent.prototype, "setInsightsData", {
        set: function (content) {
            //this.insightsData = content;
            //this.snapshotDesc = this.insightsData;
            //if (content != undefined && content.length > 0) {
            //    this.isAddInsightDisabled = false;
            //}
            //else {
            //    this.isAddInsightDisabled = true;
            //}
        },
        enumerable: true,
        configurable: true
    });
    AddInsightsComponent.prototype.ngOnInit = function () {
        this.insightSaveStatus = new core_1.EventEmitter();
    };
    AddInsightsComponent.prototype.NewInsightClick = function () {
        this.newInsight = {
            insightId: this.isEditMode ? this.iInsights.insightId : null,
            insightData: "",
            pageName: this.iInsights.pageName,
            appliedFilterId: null,
            widgetDetailIds: this.iInsights.widgetDetailIds,
            appliedFilters: this.iInsights.appliedFilters,
            identificationFlag: this.iInsights.identificationFlag,
            author: this.iInsights.author,
            updatedBy: this.iInsights.updatedBy,
            updatedDate: null,
            appliedFiltersDisplay: this.iInsights.appliedFiltersDisplay,
            insightTitle: this.iInsights.insightTitle,
            isActive: true
        };
        if (this.insightList && this.insightList.length > 0) {
            this.showBackButton = true;
        }
        this.showDataList = false;
        this.insightsData = "";
        this.isEditMode = false;
    };
    AddInsightsComponent.prototype.ngOnChanges = function () {
        this.insightList = this.insightObj;
        if (this.insightList && this.insightList.length > 0) {
            if (this.insightList[0].identificationFlag == "C") {
                this.insightTitleClass = {
                    'data-chart-insights': true,
                    'data-page-insights': false
                };
            }
            else if (this.insightList[0].identificationFlag == "P") {
                this.insightTitleClass = {
                    'data-chart-insights': false,
                    'data-page-insights': true
                };
            }
            this.showDataList = true;
            this.showBackButton = false;
        }
        else {
            this.showDataList = false;
            if (this.insightList && this.insightList.length > 0) {
                this.showBackButton = true;
            }
            else {
                this.showBackButton = false;
            }
        }
        this.buttonName = 'Add Insight';
    };
    AddInsightsComponent.prototype.ngAfterViewInit = function () {
        if (this.insightsData != undefined && this.insightsData != null && this.insightsData.length > 0) {
            this.isAddInsightDisabled = false;
            this.snapshotDesc = this.insightsData;
        }
        else {
            this.isAddInsightDisabled = true;
        }
    };
    AddInsightsComponent.prototype.EditorContentChangeHandler = function (content) {
        if (content != undefined && content.length > 0 && content != '<p>' + this.editorPlaceHolder + '</p>') {
            this.isAddInsightDisabled = false;
        }
        else {
            this.isAddInsightDisabled = true;
        }
        this.snapshotDesc = content;
    };
    AddInsightsComponent.prototype.ChartLeftHandler = function (value) {
        this.charLeft = value;
    };
    AddInsightsComponent.prototype.EditorFocusHandler = function (editorid) {
        this.InsightEditorFocus.emit(editorid);
    };
    AddInsightsComponent.prototype.SaveInsights = function () {
        var _this = this;
        this.NewInsightClick();
        if (this.snapshotDesc == null || this.snapshotDesc == "") {
            alert('Please type an insight.');
            return false;
        }
        else if (this.charLeft < 0) {
            this.newInsight.insightData = this.snapshotDesc;
            alert('Maximum ' + this.maxAllowedLength + ' characters are allowed.');
            return false;
        }
        this.newInsight.insightData = this.snapshotDesc;
        this.insightsData = this.snapshotDesc;
        //  if (1 == 1) return false;
        this.insightsService.saveInsights(this.newInsight)
            .subscribe(function (res) {
            if (_this.newInsight.insightId == null) {
                if (res && res.statusCode == 1) {
                    _this.statusDesc = res.statusDescription;
                    _this.statusClass.green1 = true;
                    _this.statusClass.mandatory = false;
                    _this.newInsight.insightData = _this.snapshotDesc;
                    _this.newInsight.insightId = res.insightId;
                    _this.newInsight.updatedDate = res.updatedDate;
                    _this.newInsight.insightTitle = res.insightTitle;
                    if (_this.insightList == null) {
                        _this.insightList = [];
                    }
                    _this.insightList.unshift(_this.newInsight);
                    _this.insightListCountChange.emit({ widgetId: _this.newInsight.widgetDetailIds, insightList: _this.insightList, Count: _this.insightList.length, identificationFlag: _this.newInsight.identificationFlag });
                    _this.showDataList = true;
                    _this.showContent = true;
                    _this.isAddInsightDisabled = true;
                    _this.showBackButton = false;
                    // this.showAlertMessage(res.statusDescription);
                    setTimeout(function () {
                        _this.statusDesc = "";
                    }, 3000);
                }
            }
            else if (_this.newInsight.insightId != null && _this.newInsight.isActive == true) {
                if (res && res.statusCode == 1) {
                    _this.statusDesc = res.statusDescription;
                    _this.statusClass.green1 = true;
                    _this.statusClass.mandatory = false;
                    var s = _this.insightList.filter(function (k) { return k.insightId == _this.insightId; })[0];
                    s.insightData = _this.snapshotDesc;
                    s.updatedDate = res.updatedDate;
                    s.insightId = res.insightId;
                    s.insightTitle = res.insightTitle;
                    _this.showDataList = true;
                    _this.showContent = true;
                    _this.isAddInsightDisabled = true;
                    _this.showBackButton = false;
                    // this.showAlertMessage(res.statusDescription);
                    setTimeout(function () {
                        _this.statusDesc = "";
                    }, 3000);
                }
            }
            _this.insightSaveStatus.emit(true);
        }, function (error) {
        });
    };
    AddInsightsComponent.prototype.loadScripts = function () {
        var node = document.createElement('script');
        node.src = global_config_1.GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    AddInsightsComponent.prototype.showMoreContent = function (insight) {
        this.contentDefinition = insight;
        this.showContent = false;
    };
    AddInsightsComponent.prototype.onClose = function () {
        this.showContent = !this.showContent;
        this.showDataList = true;
        this.contentDefinition = '';
    };
    AddInsightsComponent.prototype.showAlertMessage = function (message) {
        var _this = this;
        setTimeout(function () {
            _this.confirmDescription = message;
            _this.isConfirm = false;
            _this.onOpen();
        }, 500);
        // alert(message);
    };
    AddInsightsComponent.prototype.onEditClick = function (insight) {
        this.isEditMode = true;
        this.iInsights.insightId = insight.insightId;
        this.iInsights.insightData = insight.insightData;
        this.iInsights.appliedFilterId = insight.appliedFilterId;
        this.iInsights.author = insight.author;
        this.insightsData = insight.insightData;
        this.insightId = insight.insightId;
        this.buttonName = 'Save Insight';
        this.showDataList = false;
        this.showBackButton = true;
    };
    AddInsightsComponent.prototype.onOpen = function () {
        this._modalComponent.show();
    };
    AddInsightsComponent.prototype.onCloseModal = function (isConfirm) {
        var _this = this;
        this._modalComponent.hide();
        if (isConfirm && this.isConfirm) {
            this.insightsService.saveInsights(this.iInsights)
                .subscribe(function (res) {
                if (res && res.statusCode == 1) {
                    _this.statusDesc = res.statusDescription;
                    _this.statusClass.green1 = true;
                    _this.statusClass.mandatory = false;
                    _this.showContent = true;
                    _this.insightList.splice(_this.insightList.findIndex(function (k) { return k.insightId == _this.iInsights.insightId; }), 1);
                    _this.insightListCountChange.emit({ widgetId: _this.iInsights.widgetDetailIds, insightList: _this.insightList, Count: _this.insightList.length, identificationFlag: _this.iInsights.identificationFlag });
                    if (_this.insightList.length == 0) {
                        _this.showDataList = false;
                        _this.showBackButton = false;
                    }
                    else {
                        _this.showDataList = true;
                        _this.showBackButton = true;
                    }
                    setTimeout(function () {
                        _this.statusDesc = "";
                    }, 3000);
                }
                _this.insightSaveStatus.emit(true);
            });
        }
    };
    AddInsightsComponent.prototype.onDeleteClick = function (insight) {
        this.iInsights.insightId = insight.insightId;
        this.iInsights.insightData = insight.insightData;
        this.iInsights.appliedFilterId = insight.appliedFilterId;
        this.iInsights.isActive = false;
        this.confirmHeader = "Insights";
        this.confirmDescription = "Are you sure, you want to delete this insight?";
        this.isConfirm = true;
        this.onOpen();
    };
    AddInsightsComponent.prototype.ngOnDestroy = function () {
        this.initEditor = false;
    };
    AddInsightsComponent.prototype.back = function () {
        this.showContent = true;
        this.showDataList = true;
        this.showBackButton = false;
        this.isAddInsightDisabled = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddInsightsComponent.prototype, "EditorId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddInsightsComponent.prototype, "iInsights", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddInsightsComponent.prototype, "initEditor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AddInsightsComponent.prototype, "insightsClasses", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddInsightsComponent.prototype, "pageName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AddInsightsComponent.prototype, "insightObj", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], AddInsightsComponent.prototype, "setInsightsData", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AddInsightsComponent.prototype, "insightSaveStatus", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddInsightsComponent.prototype, "insightListCountChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddInsightsComponent.prototype, "InsightEditorFocus", void 0);
    __decorate([
        core_1.ViewChild(modal_component_1.ModalComponent), 
        __metadata('design:type', modal_component_1.ModalComponent)
    ], AddInsightsComponent.prototype, "_modalComponent", void 0);
    AddInsightsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-add-insights',
            templateUrl: 'addinsights.component.html'
        }), 
        __metadata('design:paramtypes', [insights_service_1.InsightsService])
    ], AddInsightsComponent);
    return AddInsightsComponent;
}());
exports.AddInsightsComponent = AddInsightsComponent;
//# sourceMappingURL=addinsights.component.js.map