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
var news_km_template_component_1 = require('./news-km-template.component');
var global_config_1 = require('../../global/global.config');
var km_search_upload_model_1 = require('../../knowledge-management/km-search-upload.model');
var SearchTemplateComponent = (function () {
    function SearchTemplateComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.isKMSearchComponent = false;
        this.showCustomPaging = false;
        this.leftPos = 0;
    }
    SearchTemplateComponent.prototype.ngOnInit = function () {
        if (this.isKMSearchComponent) {
            this.innerTabCssClass = "inner-tabs border0";
        }
        else {
            this.innerTabCssClass = "inner-tabs";
        }
    };
    SearchTemplateComponent.prototype.ngOnChanges = function () {
        if (this.searchItems) {
            if (this.searchItems.elasticResponseData.length > 0) {
                this.leftPos = 0;
                this.showLeft = false;
                this.showRight = false;
                //if (this.searchResultFor != '*') {
                //    this.searchItems.elasticResponseData = this.searchItems.elasticResponseData.slice(0, 4);
                //}
                this.getSearchItems(this.searchItems.elasticResponseData[0].templateType, 0);
            }
        }
    };
    SearchTemplateComponent.prototype.getSearchItems = function (templateType, dataIndex) {
        //*** scroll menu call
        var self = this;
        setTimeout(function () {
            self.setLeft(self.leftPos);
            self.resetLeftRight();
        }, 500);
        //-- scroll menu call
        this.selectedItem = dataIndex;
        // reset all template
        this.reSetTempType();
        if (this.searchItems.elasticResponseData) {
            if (templateType == global_config_1.TemplateType.news) {
                this.isNewsKm = true;
                this.items = this.searchItems.elasticResponseData[dataIndex].data;
                this.totalSize = parseInt(this.searchItems.elasticResponseData[dataIndex].count);
                this.type = this.searchItems.elasticResponseData[dataIndex].type;
                this.typeName = this.searchItems.elasticResponseData[dataIndex].typeName;
            }
            if (templateType == global_config_1.TemplateType.charts) {
                this.isChart = true;
                this.items = this.searchItems.elasticResponseData[dataIndex].data;
                this.totalSize = parseInt(this.searchItems.elasticResponseData[dataIndex].count);
                this.type = this.searchItems.elasticResponseData[dataIndex].type;
            }
        }
    };
    //** scroll menu functions
    SearchTemplateComponent.prototype.getOuterWidth = function () {
        var wrapper = document.querySelector('div#twrapper');
        if (wrapper) {
            return wrapper.offsetWidth;
        }
        else
            return 0;
    };
    SearchTemplateComponent.prototype.animateLeft = function () {
        var self = this;
        var pos = self.prevPos;
        var incremented;
        if (self.prevPos > self.leftPos) {
            incremented = false;
        }
        else {
            incremented = true;
        }
        var id = setInterval(frame, 5);
        function frame() {
            if (pos == self.leftPos) {
                clearInterval(id);
            }
            else {
                if (incremented)
                    pos++;
                else
                    pos--;
                self.setLeft(pos);
            }
        }
    };
    SearchTemplateComponent.prototype.setLeft = function (pos) {
        var elem = document.querySelector('ul#myTab');
        if (elem) {
            elem.style.left = pos + 'px';
        }
    };
    SearchTemplateComponent.prototype.onLeftScrollClick = function () {
        this.prevPos = this.leftPos;
        this.leftPos -= -100;
        this.animateLeft();
        this.resetLeftRight();
    };
    SearchTemplateComponent.prototype.onRightScrollClick = function () {
        this.prevPos = this.leftPos;
        this.leftPos += -100;
        this.animateLeft();
        this.resetLeftRight();
    };
    SearchTemplateComponent.prototype.getWidthOfList = function () {
        var itemsWidth = 0;
        var menuItems = document.querySelector('ul#myTab');
        if (menuItems) {
            var lists = menuItems.getElementsByTagName('li');
            for (var i = 0; i < lists.length; i++) {
                var listItem = lists[i];
                itemsWidth += listItem.offsetWidth;
            }
        }
        return itemsWidth;
    };
    SearchTemplateComponent.prototype.resetLeftRight = function () {
        this.widthDiff = this.getOuterWidth() - this.getWidthOfList();
        if (this.widthDiff < 0 && this.leftPos > this.widthDiff) {
            this.showRight = true;
        }
        else {
            this.showRight = false;
        }
        if (this.leftPos < 0) {
            this.showLeft = true;
        }
        else {
            this.showLeft = false;
        }
    };
    //-- scroll menu functions
    SearchTemplateComponent.prototype.reSetTempType = function () {
        this.isNewsKm = false;
        this.isChart = false;
    };
    SearchTemplateComponent.prototype.createNewsKmTemplate = function (data) {
        this.templateContainer.clear();
        var newsKmComponent = this.componentFactoryResolver.resolveComponentFactory(news_km_template_component_1.NewsKmTemplateComponent);
        var newsKmRef = this.templateContainer.createComponent(newsKmComponent);
        var insNewsKm = newsKmRef.instance;
        // set the props
        insNewsKm.newsKmItems = data;
        insNewsKm.searchResultFor = this.searchResultFor;
        /*const select: ComponentRef<NewsKmTemplateComponent> =
            this.templateContainer.createComponent(
                this.componentFactoryResolver.resolveComponentFactory(NewsKmTemplateComponent)
            );
        select.instance.newsKmItems = data;
        select.instance.searchResultFor = this.searchResultFor;*/
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SearchTemplateComponent.prototype, "searchItems", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SearchTemplateComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SearchTemplateComponent.prototype, "searchResultFor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SearchTemplateComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SearchTemplateComponent.prototype, "isKMSearchComponent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', km_search_upload_model_1.KmSearchUploadModel)
    ], SearchTemplateComponent.prototype, "KMRequest", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SearchTemplateComponent.prototype, "showCustomPaging", void 0);
    __decorate([
        core_1.ViewChild('templateContainer', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], SearchTemplateComponent.prototype, "templateContainer", void 0);
    SearchTemplateComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-search-template',
            templateUrl: 'search-template.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver])
    ], SearchTemplateComponent);
    return SearchTemplateComponent;
}());
exports.SearchTemplateComponent = SearchTemplateComponent;
//# sourceMappingURL=search-template.component.js.map