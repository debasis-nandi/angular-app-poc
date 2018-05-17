
import { Component, OnInit, Input, OnChanges, ViewContainerRef, ViewChild, ComponentFactoryResolver, AfterViewInit, ComponentRef } from '@angular/core';

import { SearchModel } from '../../search/search.model';
import { NewsKmTemplateComponent } from './news-km-template.component';
import { GlobalConfig, TemplateType } from '../../global/global.config';
import { GlobalUtil } from '../../global/global.util';
import { KmSearchUploadModel } from '../../knowledge-management/km-search-upload.model';

@Component({
    moduleId: module.id,
    selector: 'my-search-template',
    templateUrl: 'search-template.component.html'
})
export class SearchTemplateComponent implements OnInit {

    @Input() searchItems: SearchModel;
    @Input() items: any;
    @Input() searchResultFor: string;
    @Input() pageSize: number;
    @Input() isKMSearchComponent: boolean = false;
    @Input() KMRequest: KmSearchUploadModel;
    @Input() showCustomPaging: boolean = false;

    totalSize: number;
    type: string;
    typeName: string;
    selectedItem: number;
    isNewsKm: boolean;
    isChart: boolean;
    innerTabCssClass: string;
    //**** scroll menu variables
    widthDiff: number;
    showLeft: boolean;
    showRight: boolean;
    leftPos: number = 0;
    prevPos: number;
    //--- scroll menu variables

    @ViewChild('templateContainer', { read: ViewContainerRef }) templateContainer: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {

    }

    ngOnInit() {
        if (this.isKMSearchComponent) {
            this.innerTabCssClass = "inner-tabs border0";
        }
        else {
            this.innerTabCssClass = "inner-tabs";
        }
    }

    ngOnChanges() {
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

    }
  
    private getSearchItems(templateType: any, dataIndex: number) {
        //*** scroll menu call
        let self = this;
        setTimeout(() => {
            self.setLeft(self.leftPos);
            self.resetLeftRight()
        }, 500);
        //-- scroll menu call

        this.selectedItem = dataIndex;
        // reset all template
        this.reSetTempType();
        if (this.searchItems.elasticResponseData) {
            if (templateType == TemplateType.news) {
                this.isNewsKm = true;
                this.items = this.searchItems.elasticResponseData[dataIndex].data;
                this.totalSize = parseInt(this.searchItems.elasticResponseData[dataIndex].count);
                this.type = this.searchItems.elasticResponseData[dataIndex].type;
                this.typeName = this.searchItems.elasticResponseData[dataIndex].typeName;
                //this.createNewsKmTemplate(this.searchItems[dataIndex].data);
            }
            if (templateType == TemplateType.charts) {
                this.isChart = true;
                this.items = this.searchItems.elasticResponseData[dataIndex].data;
                this.totalSize = parseInt(this.searchItems.elasticResponseData[dataIndex].count);
                this.type = this.searchItems.elasticResponseData[dataIndex].type;
                //this.createNewsKmTemplate(this.searchItems[dataIndex].data);
            }
        }
    }

    //** scroll menu functions
    getOuterWidth() {
        let wrapper =<HTMLElement>document.querySelector('div#twrapper');
        if (wrapper) {
            return wrapper.offsetWidth;
        }
        else return 0;
    }

    animateLeft() {
        let self = this;
        var pos = self.prevPos;
        let incremented: boolean;
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
            } else {
                if (incremented) pos++
                else pos--;
                self.setLeft(pos);
            }
        }
    }

    setLeft(pos: number) {
        var elem: HTMLElement = <HTMLElement>document.querySelector('ul#myTab');
        if (elem) {
            elem.style.left = pos + 'px';
        }
    }
    
    onLeftScrollClick() {
        this.prevPos = this.leftPos;
        this.leftPos -= -100;
        this.animateLeft();
        this.resetLeftRight();
    }

    onRightScrollClick() {
        this.prevPos = this.leftPos;
        this.leftPos += -100;
        this.animateLeft();
        this.resetLeftRight();
    }

    getWidthOfList() {
        var itemsWidth = 0;
        let menuItems = <HTMLElement>document.querySelector('ul#myTab');
        if (menuItems) {
            let lists = menuItems.getElementsByTagName('li');
            for (var i = 0; i < lists.length; i++) {
                let listItem = lists[i];
                itemsWidth += listItem.offsetWidth;
            }
        }
        return itemsWidth;
    }

    resetLeftRight() {
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
    }
    //-- scroll menu functions

    private reSetTempType() {
        this.isNewsKm = false;
        this.isChart = false;
    }

    createNewsKmTemplate(data: any): void {
        this.templateContainer.clear();

        var newsKmComponent = this.componentFactoryResolver.resolveComponentFactory(NewsKmTemplateComponent);
        var newsKmRef = this.templateContainer.createComponent(newsKmComponent);
        var insNewsKm: NewsKmTemplateComponent = newsKmRef.instance as NewsKmTemplateComponent;
        // set the props
        insNewsKm.newsKmItems = data;
        insNewsKm.searchResultFor = this.searchResultFor;

        /*const select: ComponentRef<NewsKmTemplateComponent> =
            this.templateContainer.createComponent(
                this.componentFactoryResolver.resolveComponentFactory(NewsKmTemplateComponent)
            );
        select.instance.newsKmItems = data;
        select.instance.searchResultFor = this.searchResultFor;*/
    }
   
}