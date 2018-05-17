import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartService } from '../../../../widgets/charts/chart.service';
import { IPageDataMapper, IServiceParams, IFilters, IInisghts } from '../../../../widgets/charts/chart';
import { PopoverContent } from 'ng2-popover';
import { GlobalConfig, Page } from '../../../../global/global.config';
import { GlobalUtil } from '../../../../global/global.util';

declare var tinymce: any;

@Component({
    moduleId: module.id,
    templateUrl: 'commodity-price.component.html',
})
export class CommodityPriceComponent {
    data: IPageDataMapper;
    errorMessage: string;
    filterObject: IFilters[] = [];
    exportObject: IFilters[] = [];
    filterApi: IFilters[] = [];
    exportApi: IFilters[] = [];
    exportVisible: boolean = true;
    @ViewChild('pagePopover') pagePopover: PopoverContent;

    paginator: boolean = false;
    pageLinks: number = 3;
    rowsPerPage: number = 5;
    rowsPerPageOptions: Array<number> = [5, 10, 20];
    responsive: boolean = true;
    loading: boolean = false;

    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;
    currentInsightData: string;
    currentWidgetId: number;
    editor: any;
    snapshotDesc: string;
    insightDetails: IInisghts = {};

    seriveParams: IServiceParams = { pageName: Page.commodityPrice, companyId: 0, cropId:0, selectedFilter: null };

    constructor(private chartService: ChartService, private ref: ElementRef) {
        this.loadScripts();
    }


    ngOnInit(): void {
        this.loading = true;
        this.chartService.getData(this.seriveParams)
            .subscribe(data => { this.data = data.pageDataMapper; this.loading = false }
            , error => this.errorMessage = <any>error
            );
    }

    onFilterEmit(filter: IFilters): boolean {

        this.filterObject = this.filterObject.filter(
            x => x.filterName !== filter.filterName);

        this.filterObject.push(filter);
        return true;

        //this.filterObject = filter;
        //return true;
    }

    onExportEmit(filter: IFilters): boolean {

        this.exportObject = this.exportObject.filter(
            x => x.filterName !== filter.filterName);

        this.exportObject.push(filter);
        return true;

    }

    FilterSubmit(pagePopover: PopoverContent): void {
        //pagePopover.hide();
        this.loading = true;
        for (let entry of this.filterObject) {
            if (entry.filterName === 'View Data As' && entry.selectedData === 'Quarterly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodYear");
            else if (entry.filterName === 'View Data As' && entry.selectedData === 'Yearly')
                this.filterApi = this.filterObject.filter(
                    x => x.filterName !== "PeriodQuarter");
        }
        //console.log(this.filterApi);
        let selectedValue: IServiceParams = { pageName: Page.commodityPrice.toString(), companyId: 0, cropId: 0, selectedFilter: this.filterApi };
        this.chartService.getData(selectedValue)
            .subscribe(data => { this.data.widgets = data.pageDataMapper.widgets; this.loading = false }
            , error => this.errorMessage = <any>error
            );
    }

    ExportSubmit(): void {
        //console.log(this.exportObject);
    }

    onExportVisibleEmit(visible: boolean): void {
        this.exportVisible = visible;
    }

    loadScripts() {
        let node = document.createElement('script');
        node.src = GlobalConfig.tinyMceJs;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    editChartInsight(event: any, widgetId: number, insightData: string, richTextNumber: number): boolean {
        let richTextBoxId: HTMLElement = document.getElementById('richTextInsight' + richTextNumber);
        if (event.target.classList.contains('fa-pencil-square-o')) {//Pen  

            if (tinymce.editors.length == 1)//Only one insight could be editted at a time.
            {
                alert('Only one insight can be modified at a time');
                return false;
            }

            this.snapshotDesc = insightData;
            let options = {
                height: '80',
                selector: '#richTextInsight' + richTextNumber,
                menubar: false,
                statusbar: false,
                inline: true,
                plugins: ['link', 'paste'],
                toolbar: "undo redo | bold italic underline | link | alignleft aligncenter alignright | charmap",
                content_css: [GlobalConfig.bootstrapMin, GlobalConfig.styleCss],
                setup: (editor: any) => {
                    this.editor = editor;
                    this.editor.on('keyup', (ev: any) => {
                        this.snapshotDesc = editor.getContent();
                        if (this.snapshotDesc.length > editor.getParam('max_chars')) {
                            if (ev.keyCode != 8) {
                                alert('Max ' + editor.getParam('max_chars') + ' characters are allowed in richtext area.');
                                ev.preventDefault();// backspace (8) / delete (46)
                                return false;
                            }
                        }
                    });
                    this.editor.on('init', () => {
                        editor.setContent(this.snapshotDesc);
                    });
                }
            };
            tinymce.init(options);


            //Change the edit button image.
            event.target.classList.add('fa-check-circle');
            event.target.classList.remove('fa-pencil-square-o');
            event.target.title = "Save changes";
            richTextBoxId.classList.add('richTextBoxStyle');
            richTextBoxId.classList.remove('insightScrollDisplay');
            //document.getElementById('richTextInsight' + richTextNumber).classList.add('richTextBoxStyle');         
        }
        else if (event.target.classList.contains('fa-check-circle')) {//Right Tick
            if (this.editor.getContent().length > this.editor.getParam('max_chars')) {
                alert('Max ' + this.editor.getParam('max_chars') + ' characters are allowed in richtext area.');
                return false;
            }
            this.insightDetails.insightData = this.editor.getContent();
            this.insightDetails.widgetDetailId = widgetId.toString();
            this.chartService.updateInsightData(this.insightDetails).subscribe(result => {
                this.data.widgets[richTextNumber].insightData = this.insightDetails.insightData;
                this.data.widgets[richTextNumber].insightLastUpdated = GlobalUtil.getFormattedDate();
            });

            tinymce.remove(this.editor);

            //Change the edit button image.
            event.target.classList.add('fa-pencil-square-o');
            event.target.classList.remove('fa-check-circle');
            event.target.title = "Add/Edit insight";
            richTextBoxId.classList.remove('richTextBoxStyle');
            //non-edit mode with overflow hidden
            //document.getElementById('richTextInsight' + richTextNumber).classList.remove('richTextBoxStyle');         
        }
        return true;
    }

    ngOnDestroy(): void {
        tinymce.remove(this.editor);
    }
}
