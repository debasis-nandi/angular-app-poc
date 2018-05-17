import { Component, OnInit, Input, Output, AfterViewInit, OnChanges, EventEmitter, ViewChild } from '@angular/core';
import { GlobalConfig } from '../global/global.config';
import { GlobalUtil } from '../global/global.util';
import { IInsights, IInsightsFilters } from './insights.model';
import { InsightsService } from './insights.service';
import { EditorClasses } from '../widgets/tinymce/tinymce.directive';
import { Message } from 'primeng/primeng';
import { ModalComponent } from '../widgets/modals/modal.component';
import { ModalDetail } from '../widgets/modals/modal.model';

@Component({
    moduleId: module.id,
    selector: 'my-add-insights',
    templateUrl: 'addinsights.component.html'
})

export class AddInsightsComponent implements OnInit {

    @Input() EditorId: any;
    @Input() iInsights: IInsights;
    @Input() initEditor = false;
    @Input() insightsClasses: EditorClasses[] = [];
    @Input() pageName: string = '';
    @Input() insightObj: IInsights[];

    @Input() set setInsightsData(content: any) {
        //this.insightsData = content;
        //this.snapshotDesc = this.insightsData;
        //if (content != undefined && content.length > 0) {
        //    this.isAddInsightDisabled = false;
        //}
        //else {
        //    this.isAddInsightDisabled = true;
        //}
    }

    @Output() insightSaveStatus: EventEmitter<boolean>;
    @Output() insightListCountChange = new EventEmitter<any>();
    @Output() InsightEditorFocus = new EventEmitter<any>();
    editorPlaceHolder: string = '<span class="lgrey size12">Please type an insight.</span>';
    insightTitleClass: {
        'data-chart-insights': boolean,
        'data-page-insights': boolean
    }
    isAddInsightDisabled: boolean = true;
    private insightsData: string = '';
    isEditMode: boolean = false;
    statusDesc: string;
    showInsightButton: boolean = true;
    showContent: boolean = true;
    contentDefinition: any;
    bodyClass: string = 'panel-body';
    headerClass: string = 'panel-heading';
    insightList: IInsights[] = [];
    newInsight: IInsights = {
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
    snapshotDesc: string = "";
    maxAllowedLength = 1000;
    buttonName: string = '';
    insightId: number;
    showDataList: boolean = true;
    showBackButton: boolean = false;
    charLeft: number = this.maxAllowedLength;

    IsAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
    userId: string = GlobalUtil.getAppSession("UserInfo").userId;
    statusClass = {
        green1: true,
        mandatory: false
    }
    confirmHeader: string = "Insights";
    subscriptionToDelete: number;
    confirmDescription: string = "Are you sure, you want to delete this insight?"
    @ViewChild(ModalComponent) _modalComponent: ModalComponent;
    modalclasses?: ModalDetail = {
        csModalDialog: null,
        csModalBody: "animated fadeInDown"
    }
   
    isConfirm: boolean = true;
    constructor(private insightsService: InsightsService) {
        this.loadScripts();
        this.insightsClasses = [];
        this.insightTitleClass = {
            'data-chart-insights': true,
            'data-page-insights': false
        }
    }

    ngOnInit() {
        this.insightSaveStatus = new EventEmitter<boolean>();
    }

    NewInsightClick() {

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
    }

    ngOnChanges() {
        this.insightList = this.insightObj;
        if (this.insightList && this.insightList.length > 0) {
            if (this.insightList[0].identificationFlag == "C") {
                this.insightTitleClass = {
                    'data-chart-insights': true,
                    'data-page-insights': false
                }
            }
            else if (this.insightList[0].identificationFlag == "P") {
                this.insightTitleClass = {
                    'data-chart-insights': false,
                    'data-page-insights': true
                }
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
    }

    ngAfterViewInit() {
        if (this.insightsData != undefined && this.insightsData != null && this.insightsData.length > 0) {
            this.isAddInsightDisabled = false;
            this.snapshotDesc = this.insightsData;
        }
        else {
            this.isAddInsightDisabled = true;
        }
    }

    EditorContentChangeHandler(content: any) {
        if (content != undefined && content.length > 0 && content != '<p>' + this.editorPlaceHolder + '</p>') {
            this.isAddInsightDisabled = false;
        }
        else {
            this.isAddInsightDisabled = true;
        }
        this.snapshotDesc = content;
    }

    ChartLeftHandler(value: number) {
        this.charLeft = value;
    }

    EditorFocusHandler(editorid: any) {
        this.InsightEditorFocus.emit(editorid);
    }

    SaveInsights() {
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
            .subscribe((res) => {
                if (this.newInsight.insightId == null) {
                    if (res && res.statusCode == 1) {
                       
                       
                        this.statusDesc = res.statusDescription;
                        this.statusClass.green1 = true;
                        this.statusClass.mandatory = false;
                        this.newInsight.insightData = this.snapshotDesc;
                        this.newInsight.insightId = res.insightId;
                        this.newInsight.updatedDate = res.updatedDate;
                        this.newInsight.insightTitle = res.insightTitle;
                        if (this.insightList == null) {
                            this.insightList = [];
                        }
                        this.insightList.unshift(this.newInsight);
                        this.insightListCountChange.emit({ widgetId: this.newInsight.widgetDetailIds, insightList: this.insightList, Count: this.insightList.length, identificationFlag: this.newInsight.identificationFlag });
                       
                        this.showDataList = true;
                        this.showContent = true;
                        this.isAddInsightDisabled = true;
                        this.showBackButton = false;
                       // this.showAlertMessage(res.statusDescription);
                        setTimeout(() => {
                            this.statusDesc = "";
                        }, 3000);
                    }
                }
                else if (this.newInsight.insightId != null && this.newInsight.isActive == true) {
                    if (res && res.statusCode == 1) {
                      
                        this.statusDesc = res.statusDescription;
                        this.statusClass.green1 = true;
                        this.statusClass.mandatory = false;
                        let s = this.insightList.filter(k => k.insightId == this.insightId)[0];
                        s.insightData = this.snapshotDesc;
                        s.updatedDate = res.updatedDate;
                        s.insightId = res.insightId;
                        s.insightTitle = res.insightTitle;
                       
                        this.showDataList = true;
                        this.showContent = true;
                        this.isAddInsightDisabled = true;
                        this.showBackButton = false;
                       // this.showAlertMessage(res.statusDescription);
                        setTimeout(() => {
                            this.statusDesc = "";
                        }, 3000);
                      
                       // this.showAlertMessage(res.statusDescription);
                    }
                }
                this.insightSaveStatus.emit(true);
            }, error => {
            });
    }



    loadScripts() {
        let node = document.createElement('script');
        node.src = GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    showMoreContent(insight: IInsights): void {
        this.contentDefinition = insight;
        this.showContent = false;
    }

    onClose(): void {
        this.showContent = !this.showContent;
        this.showDataList = true;
        this.contentDefinition = '';
    }

    showAlertMessage(message: string) {
        setTimeout(() => {
            this.confirmDescription = message;
            this.isConfirm = false;
            this.onOpen();
        },500);
        
       // alert(message);
    }

    onEditClick(insight: IInsights): void {
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
    }
    onOpen() {
        this._modalComponent.show();
    }
    onCloseModal(isConfirm: boolean) {
        this._modalComponent.hide();
        if (isConfirm && this.isConfirm) {
            this.insightsService.saveInsights(this.iInsights)
                .subscribe((res) => {
                    if (res && res.statusCode == 1) {
                        this.statusDesc = res.statusDescription;
                        this.statusClass.green1 = true;
                        this.statusClass.mandatory = false;
                        this.showContent = true;
                        this.insightList.splice(this.insightList.findIndex(k => k.insightId == this.iInsights.insightId), 1);
                        this.insightListCountChange.emit({ widgetId: this.iInsights.widgetDetailIds, insightList: this.insightList, Count: this.insightList.length, identificationFlag: this.iInsights.identificationFlag });
                        if (this.insightList.length == 0) {
                            this.showDataList = false;
                            this.showBackButton = false;
                        }
                        else {
                            this.showDataList = true;
                            this.showBackButton = true;
                        }
                        setTimeout(() => {
                            this.statusDesc = "";
                        }, 3000);
                       
                       
                       // this.showAlertMessage(res.statusDescription);
                    }
                    this.insightSaveStatus.emit(true);
                });
        }
    }
    onDeleteClick(insight: IInsights): void {
            this.iInsights.insightId = insight.insightId;
            this.iInsights.insightData = insight.insightData;
            this.iInsights.appliedFilterId = insight.appliedFilterId;
            this.iInsights.isActive = false;
            this.confirmHeader = "Insights";
            this.confirmDescription = "Are you sure, you want to delete this insight?";
            this.isConfirm = true;
            this.onOpen();
    }

    ngOnDestroy(): void {
        this.initEditor = false;
    }

    back(): void {
        this.showContent = true;
        this.showDataList = true;
        this.showBackButton = false;
        this.isAddInsightDisabled = true;
    }

}