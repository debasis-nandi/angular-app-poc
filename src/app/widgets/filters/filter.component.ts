import { Component, Input, Output, EventEmitter, Renderer, ViewChild, ElementRef } from '@angular/core';
import { IFilters, IFilterRelation } from '../charts/chart';
import { SelectItem } from 'primeng/primeng';
import { GlobalUtil } from '../../global/global.util';
@Component({
    moduleId: module.id,
    selector: 'my-filter',
    templateUrl: 'filter.component.html'

})

export class FilterComponent {
    @Input() filtersList: IFilters[];
    @Input() widgetId: any;
    @Input() monthlyTypeHtml: string = 'default';
    cascadeDependency: string = "default";
    @Input() maxQuarterLimit: number = 8;
    @Input() filtersRelationList: IFilterRelation[] = [];
    @Output() selectedValueEmit: EventEmitter<IFilters> = new EventEmitter<IFilters>();
    @Output() submitVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() submitMessage: EventEmitter<string> = new EventEmitter<string>();
    filterObject: IFilters[] = [];
    multiSelectValues: Object[] = [];
    multiSelectList: any[] = [];
    geographyFullData: Array<any[]> = [];
    geography: Array<any[]> = [];
    geographySelected: Array<any[]> = [];
    childDropdownObject: IFilters[] = null;
    count: Number = 0;
    monthly: number[] = [];
    @ViewChild('sliderYear') sliderYear: ElementRef;
    @ViewChild('sliderQuarter') sliderQuarter: ElementRef;
    @ViewChild('monthlyDropdowns') monthlyDropdowns: ElementRef;
    @ViewChild('childdropdown') childdropdown: ElementRef;
    @ViewChild('radio') radio: ElementRef;
    @ViewChild('dropdown') dropdown: ElementRef;
    tooltipYear: Array<any> = [true, true];
    tooltipQuarter: Array<any> = [true];
    radioValue: string = 'Yearly';
    isShow: boolean = true;
    level1DefaultSelected: number = 0; sourceDefaultSelected: number = 0; level2DefaultSelected: number = 0; level3DefaultSelected: number = 0;
    level1fullData: Object[] = [];
    level1filterData: Object[] = [];
    level2fullData: Object[] = [];
    level2filterData: Object[] = [];
    level3fullData: Object[] = [];
    level3filterData: Object[] = [];
    dropdownlevel2FilterName: string = null;
    dropdownlevel3FilterName: string = null;
    cropId: number = 0;
    regionId: number = 0;
    cropComparison: string;
    multiselectlimit: number = 5;
    geographylimit: number = 5;
    quarterSubmit: boolean = false;
    quarterSubmitMessage: string = '';
    sourceData: Object[] = [];
    sourceOverView: Array<any[]> = [];
    sourceOverViewDefault: Array<number> = [];
    fullData: IFilterRelation[] = [];
    fullTerritoryData: IFilterRelation[] = [];
    sliderMinValue: number; defaultsliderMinValue: number;
    sliderMaxValue: number; defaultsliderMaxValue: number;
    sliderSelected: number[] = []; defaultsliderSelected: number[] = [];
    sourceList: IFilters[] = [];
    parameterId: number = 0;
    multipleSourceData: IFilters[] = [];
    constructor(private renderer: Renderer) { }

    onChange(filterValue: any, filterName: string) {
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["selectedData"] = filterValue;
        this.selectedValueEmit.emit(selectedValue);
    }
    onDropdownChange(filterValue: number, filterObject1: IFilters) {
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["selectedData"] = filterValue;
        selectedValue["filterData"] = filterObject1.filterData.filter(x => x["labelId"] == filterValue);
        //selectedValue["childControlMappingId"] = filterObject1.filterData[filterValue - 1]["childControlMappingId"];

        //cascadeGeographyDropdowns
        if (filterObject1.filterName.toLocaleLowerCase() == "crop") {
            if (this.cascadeDependency == 'crop') {
                this.cropId = filterValue;
                this.level1filterData = [];
                this.level1DefaultSelected = 0;
                this.level2DefaultSelected = 0;
                this.level3DefaultSelected = 0;
                this.fullData = this.filtersRelationList.filter(x => x["cropId"] == filterValue);
                var flags: any = []
                for (let i = 0; i < this.fullData.length; i++) {
                    if (flags[this.fullData[i].regionId]) continue;
                    flags[this.fullData[i].regionId] = true;
                    this.level1filterData.push(this.fullData[i]);
                }
                this.level1filterData.sort((a, b) => {
                    if (a["regionName"] < b["regionName"]) return -1;
                    else if (a["regionName"] > b["regionName"]) return 1;
                    else return 0;
                });

                if (this.level1filterData.filter(x => x["regionId"] == this.regionId).length > 0)
                    this.level1DefaultSelected = this.regionId;
                else if (this.level1filterData.length > 0)
                    //this.level1DefaultSelected = this.level1filterData[0]["regionId"];
                    this.level1DefaultSelected = 0;
            }
            this.onDropdownlevel1Change(this.level1DefaultSelected, null);
        }

        //for parameter cascading
        if (filterObject1.filterName.toLocaleLowerCase() == "parameter" && this.cascadeDependency == "cropComparison") {
            this.parameterId = filterValue;
            this.multiSelectList = [];
            var flags: any = [];
            let reg: IFilterRelation[] = this.filtersRelationList.filter(y => y["kpiId"] == filterValue);
            for (let i = 0; i < reg.length; i++) {
                if (flags[reg[i].cropId]) {
                    continue;
                }
                flags[reg[i].cropId] = true;
                this.multiSelectList.push(reg[i]);
                
            }
            this.multiSelectList.sort((a, b) => {
                if (a["cropName"] < b["cropName"]) return -1;
                else if (a["cropName"] > b["cropName"]) return 1;
                else return 0;
            });
            for (let i = 0; i < this.multiSelectList.length; i++) {
                this.multiSelectList[i].label = this.multiSelectList[i].cropName;
                this.multiSelectList[i].value = this.multiSelectList[i].cropId;
            }
            //this.onChangeMultiSelect(this.multiSelectValues, "Crop", this.multiSelectList);
            this.geographySelected[0] = []; this.geographySelected[1] = []; this.geographySelected[2] = []; this.multiSelectValues = [];
            this.geography[1] = []; this.geography[2] = [];
            //added for cascading
            this.geography[0] = [];
            this.sourceList = [];
            this.submitVisible.emit(true);
        }
        this.selectedValueEmit.emit(selectedValue);
    }

    onSourceDropdownChange(filterValue: number) {
        if (this.cascadeDependency == "crop" || this.cascadeDependency == "region") {
            let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = "Source";
            if (filterValue)
                selectedValue["selectedData"] = filterValue;
            else
                selectedValue["selectedData"] = 0;
            //selectedValue["filterData"] = filterObject1.filterData.filter(x => x["labelId"] == filterValue);
            this.selectedValueEmit.emit(selectedValue);

            var sliderData: IFilterRelation[] = this.filtersRelationList.filter(x => x["cropId"] == this.cropId && x["regionId"] == this.level1DefaultSelected && x.sourceId == filterValue && x.territoryId == this.level2DefaultSelected && x.countryId == this.level3DefaultSelected);
            if (sliderData.length > 0) {
                this.sliderMinValue = +sliderData[0].minYear;
                this.sliderMaxValue = +sliderData[0].maxYear;
                this.sliderSelected = sliderData[0].defaultValue;
                this.onChange(this.sliderSelected, "PeriodYear");
                this.submitVisible.emit(false);
            }
            else {
                this.submitVisible.emit(true);
            }
        }
        if (this.cascadeDependency == "regionminussource") {
            var sliderData: IFilterRelation[] = this.filtersRelationList.filter(x => x["cropId"] == this.cropId && x["regionId"] == this.level1DefaultSelected && x.sourceId == filterValue && x.territoryId == this.level2DefaultSelected && x.countryId == this.level3DefaultSelected);
            if (sliderData.length > 0) {
                this.sliderMinValue = +sliderData[0].minYear;
                this.sliderMaxValue = +sliderData[0].maxYear;
                this.sliderSelected = sliderData[0].defaultValue;
                this.onChange(this.sliderSelected, "PeriodYear");
                this.submitVisible.emit(false);
            }
            else {
                this.submitVisible.emit(true);
            }
        }

    }
    onMonthlyDropdownChange(filterValue: number, filterName: string, index: number, type: string) {
        if (type.toLocaleLowerCase() == "from quarter") {
            if (this.monthly[0] != 0 && this.monthly[1] != 0 && this.monthly[2] != 0 && this.monthly[3] != 0) {
                if (+this.monthly[2] < +this.monthly[0]) {
                    this.submitVisible.emit(true);
                    this.submitMessage.emit("End year cannot be less than start year");
                    this.quarterSubmit = true;
                    this.quarterSubmitMessage = "End year cannot be less than start year";
                }
                
                else if (+this.monthly[2] >= (+this.monthly[0] + (this.maxQuarterLimit / 4) + 1)) {
                    this.submitVisible.emit(true);
                    //this.submitMessage.emit("Maximum limit of 16 quarters is exceeded");
                    let message: string = "Maximum " + this.maxQuarterLimit + " quarters can be selected";
                    this.submitMessage.emit(message);
                    this.quarterSubmit = true;
                    //this.quarterSubmitMessage = "Maximum limit of 16 quarters is exceeded";
                    this.quarterSubmitMessage = message;
                }
                else if (+this.monthly[2] == +this.monthly[0]) {
                    if (+this.monthly[3] < +this.monthly[1]) {
                        this.submitVisible.emit(true);
                        this.submitMessage.emit("End quarter cannot be less than start quarter");
                        this.quarterSubmit = true;
                        this.quarterSubmitMessage = "End quarter cannot be less than start quarter";
                    }
                    else {
                        //this.submitVisible.emit(false);
                        this.submitMessage.emit("");
                        if (this.multiSelectValues.length == 0 && this.maxQuarterLimit == 16) {
                            this.submitVisible.emit(true);
                        }
                        else {
                            this.submitVisible.emit(false);
                        }
                        this.quarterSubmit = false;
                        this.quarterSubmitMessage = "";
                    }
                }
                //else if (+this.monthly[2] == (+this.monthly[0] + 4)) {
                else if (+this.monthly[2] == (+this.monthly[0] + (this.maxQuarterLimit / 4))) {
                    if (+this.monthly[3] >= +this.monthly[1]) {
                        this.submitVisible.emit(true);
                        //this.submitMessage.emit("Maximum limit of 16 quarters is exceeded");
                        let message: string = "Maximum " + this.maxQuarterLimit + " quarters can be selected";
                        this.submitMessage.emit(message);
                        this.quarterSubmit = true;
                        //this.quarterSubmitMessage = "Maximum limit of 16 quarters is exceeded";
                        this.quarterSubmitMessage = message;
                    }
                    else {
                        //this.submitVisible.emit(false);
                        this.submitMessage.emit("");
                        if (this.multiSelectValues.length == 0 && this.maxQuarterLimit == 16) {
                            this.submitVisible.emit(true);
                        }
                        else {
                            this.submitVisible.emit(false);
                        }
                        this.quarterSubmit = false;
                        this.quarterSubmitMessage = "";
                    }
                }
                else {
                    this.submitMessage.emit("");
                    if (this.multiSelectValues.length == 0 && this.maxQuarterLimit == 16) {
                        this.submitVisible.emit(true);
                    }
                    else {
                        this.submitVisible.emit(false);
                    }
                    this.quarterSubmit = false;
                    this.quarterSubmitMessage = "";
                }
            }
            else {
                this.submitVisible.emit(true);
                this.submitMessage.emit("Please select all filters");
                this.quarterSubmit = true;
                this.quarterSubmitMessage = "Please select all filters";
            }
        }
        else {
            if (this.monthly[0] != 0 && this.monthly[1] != 0 && this.monthly[2] != 0 && this.monthly[3] != 0) {
                if (+this.monthly[2] < +this.monthly[0]) {
                    this.submitVisible.emit(true);
                    this.submitMessage.emit("End year cannot be less than start year");
                }
                else if (+this.monthly[2] >= (+this.monthly[0] + 2)) {
                    this.submitVisible.emit(true);
                    this.submitMessage.emit("Maximum 12 months can be selected");
                }
                else if (+this.monthly[2] == +this.monthly[0]) {
                    if (+this.monthly[3] < +this.monthly[1]) {
                        this.submitVisible.emit(true);
                        this.submitMessage.emit("End month cannot be less than start month");
                    }
                    else {
                        //this.submitVisible.emit(false);
                        this.submitMessage.emit("");
                        if (this.multiSelectValues.length == 0 || this.geographySelected[0].length == 0) {
                            this.submitVisible.emit(true);
                        }
                        else if (this.sourceList.length > 0) {
                            let filterSlider: IFilters[] = this.sourceList.map(x => Object.assign({}, x));
                            let filterSliders: IFilters[] = filterSlider.filter((x: any) => x.childControlMappingId != 0 && x.sortOrder != 0);
                            if (filterSliders.length == 0) { this.submitVisible.emit(true); }
                            else { this.submitVisible.emit(false); }
                        }
                        else {
                            this.submitVisible.emit(false);
                        }
                    }
                }
                else if (+this.monthly[2] == (+this.monthly[0] + 1)) {
                    if (+this.monthly[3] >= +this.monthly[1]) {
                        this.submitVisible.emit(true);
                        this.submitMessage.emit("Maximum 12 months can be selected");
                    }
                    else {
                        //this.submitVisible.emit(false);
                        this.submitMessage.emit("");
                        if (this.multiSelectValues.length == 0 || this.geographySelected[0].length == 0) {
                            this.submitVisible.emit(true);
                        }

                        else if (this.sourceList.length > 0) {
                            let filterSlider: IFilters[] = this.sourceList.map(x => Object.assign({}, x));
                            let filterSliders: IFilters[] = filterSlider.filter((x: any) => x.childControlMappingId != 0 && x.sortOrder != 0);
                            if (filterSliders.length == 0) { this.submitVisible.emit(true); }
                            else { this.submitVisible.emit(false); }
                        }
                        else {
                            this.submitVisible.emit(false);
                        }
                    }
                }
            }
            else {
                this.submitVisible.emit(true);
                this.submitMessage.emit("Please select all filters");
            }
        }

        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["selectedData"] = filterValue;
        selectedValue["childControlMappingId"] = null;
        this.selectedValueEmit.emit(selectedValue);
    }
    onDropdownlevel1Change(filterValue: number, filterObject1: IFilters) {
        this.level1DefaultSelected = filterValue;
        this.level2DefaultSelected = 0;
        this.level3DefaultSelected = 0;
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        //selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["filterName"] = "Region";
        selectedValue["selectedData"] = filterValue;
        //selectedValue["filterData"] = filterObject1.filterData.filter(x => x["labelId"] == filterValue);
        this.selectedValueEmit.emit(selectedValue);
        if (this.cascadeDependency == "crop")
            this.fullData = this.filtersRelationList.filter(x => x["cropId"] == this.cropId);
        else if (this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
            this.fullData = this.filtersRelationList;
        }
        
        if (this.level2fullData.length > 0) {
            if (this.cascadeDependency == "default") {
                this.level2filterData = this.level2fullData.filter(
                    x => x["parent1Id"] == filterValue);
                let level2selectedId: number = 0;
                if (this.level2filterData[0])
                    level2selectedId = this.level2filterData[0]["labelId"];

                if (level2selectedId) {
                    this.level3filterData = this.level3fullData.filter(x => x["parent2Id"] == level2selectedId);
                    let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = this.dropdownlevel3FilterName;
                    let level3selectedId: number = 0;
                    if (this.level3filterData[0])
                        level3selectedId = this.level3filterData[0]["labelId"];
                    selectedValue["selectedData"] = 0;
                    this.selectedValueEmit.emit(selectedValue);
                }
                else {
                    this.level3filterData = this.level3fullData.filter(x => x["parent1Id"] == filterValue);
                    let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = this.dropdownlevel3FilterName;
                    let level3selectedId: number = 0;
                    if (this.level3filterData[0])
                        level3selectedId = this.level3filterData[0]["labelId"];
                    selectedValue["selectedData"] = 0;
                    this.selectedValueEmit.emit(selectedValue);
                }

            }
            else if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
                //territory
                this.level2filterData = [];
                var ters: any = [];
                this.fullTerritoryData = this.fullData.filter((x: any) => x.regionId == filterValue);
                for (let i = 0; i < this.fullTerritoryData.length; i++) {
                    if (ters[this.fullTerritoryData[i].territoryId]) continue;
                    ters[this.fullTerritoryData[i].territoryId] = true;
                    this.level2filterData.push(this.fullTerritoryData[i]);
                }
                this.level2filterData = this.level2filterData.filter((x: any) => x.territoryId != 0)
                this.level2filterData.sort((a, b) => {
                    if (a["territoryName"] < b["territoryName"]) return -1;
                    else if (a["territoryName"] > b["territoryName"]) return 1;
                    else return 0;
                });
                let selectedValue1: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue1["filterName"] = this.dropdownlevel2FilterName;
                selectedValue1["selectedData"] = 0;
                this.selectedValueEmit.emit(selectedValue1);

                //country
                this.level3filterData = [];
                let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = this.dropdownlevel3FilterName;
                selectedValue2["selectedData"] = 0;
                this.selectedValueEmit.emit(selectedValue2);
                var conts: any = [];
                var fullCountryData2: any;
                fullCountryData2 = this.fullData.filter((x: any) => x.regionId == filterValue && x.territoryId == 0);

                for (let i = 0; i < fullCountryData2.length; i++) {
                    if (conts[fullCountryData2[i].countryId]) continue;
                    conts[fullCountryData2[i].countryId] = true;
                    this.level3filterData.push(fullCountryData2[i]);
                }
                this.level3filterData = this.level3filterData.filter((x: any) => x.countryId != 0)
                this.level3filterData.sort((a, b) => {
                    if (a["countryName"] < b["countryName"]) return -1;
                    else if (a["countryName"] > b["countryName"]) return 1;
                    else return 0;
                });
                //source
                if (this.cascadeDependency != "crop") {
                    this.sourceData = [];
                    var fullSourceData: any = this.fullData.filter((x: any) => x.regionId == filterValue && x.territoryId == 0 && x.countryId == 0);
                    var src: any = []
                    for (let i = 0; i < fullSourceData.length; i++) {
                        if (src[fullSourceData[i].sourceId]) continue;
                        src[fullSourceData[i].sourceId] = true;
                        this.sourceData.push(fullSourceData[i]);
                    }
                    this.sourceData = this.sourceData.filter((x: any) => x.sourceId != 0);
                    this.sourceData.sort((a, b) => {
                        if (a["sourceName"] < b["sourceName"]) return -1;
                        else if (a["sourceName"] > b["sourceName"]) return 1;
                        else return 0;
                    });
                    if (this.sourceData.length > 0)
                        this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                    else
                        this.sourceDefaultSelected = 0;
                    this.onSourceDropdownChange(this.sourceDefaultSelected);
                }
                else if (this.cascadeDependency == "crop") {
                    for (let i = 0; i < this.multipleSourceData.length; i++) {
                        this.multipleSourceData[i].filterData = [];
                        var fullSourceData: any = this.fullData.filter((x: any) => x.regionId == filterValue && x.territoryId == 0 && x.countryId == 0 && x.widgetName == this.multipleSourceData[i].filterName);
                        var src: any = []
                        for (let k = 0; k < fullSourceData.length; k++) {
                            if (src[fullSourceData[k].sourceId]) continue;
                            src[fullSourceData[k].sourceId] = true;
                            this.multipleSourceData[i].filterData.push(fullSourceData[k]);
                        }
                        this.multipleSourceData[i].filterData = this.multipleSourceData[i].filterData.filter((x: any) => x.sourceId != 0);
                        this.multipleSourceData[i].filterData.sort((a, b) => {
                            if (a["sourceName"] < b["sourceName"]) return -1;
                            else if (a["sourceName"] > b["sourceName"]) return 1;
                            else return 0;
                        });
                        let defaultValue: any = this.multipleSourceData[i].filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                        if (defaultValue.length > 0) {
                            //this.sourceOverViewDefault[i] = defaultValue[0]["defaultSourceId"];
                            this.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                            this.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                            this.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];
                            //added for recommended
                            let index: number = (this.multipleSourceData[i].filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                            if (!this.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                            this.multipleSourceData[i].filterData[index]["sourceName"] = this.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";

                        }
                        else if (this.multipleSourceData[i].filterData.length > 0) {
                            this.multipleSourceData[i].selectedData = this.multipleSourceData[i].filterData[0]["sourceId"];
                            this.multipleSourceData[i].sortOrder = this.multipleSourceData[i].filterData[0]["minYear"];
                            this.multipleSourceData[i].childControlMappingId = this.multipleSourceData[i].filterData[0]["maxYear"];
                        }
                        else {
                            this.multipleSourceData[i].selectedData = 0;
                            this.multipleSourceData[i].sortOrder = 0;
                            this.multipleSourceData[i].childControlMappingId = 0;
                        }
                        
                        this.onOverViewSourceDropdownChange(this.multipleSourceData[i].selectedData, this.multipleSourceData[i].filterName, this.multipleSourceData[i], 'code');
                    }
                    this.setOverViewSlider();
                }
            }
        }
        else {
            if (this.cascadeDependency == "default") {
                this.level3filterData = this.level3fullData.filter(x => x["parent1Id"] == filterValue);
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = this.dropdownlevel3FilterName;
                selectedValue["selectedData"] = 0;
                this.selectedValueEmit.emit(selectedValue);
                let level3selectedId: number = 0;
                if (this.level3filterData[0])
                    level3selectedId = this.level3filterData[0]["labelId"];
            }
            else if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
                //country
                this.level3filterData = [];
                let selectedValue4: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue4["filterName"] = this.dropdownlevel3FilterName;
                selectedValue4["selectedData"] = 0;
                this.selectedValueEmit.emit(selectedValue4);
                var conts: any = [];
                var fullCountryData2: any;
                fullCountryData2 = this.fullData.filter((x: any) => x.regionId == filterValue && x.territoryId == 0);
                
                for (let i = 0; i < fullCountryData2.length; i++) {
                    if (conts[fullCountryData2[i].countryId]) continue;
                    conts[fullCountryData2[i].countryId] = true;
                    this.level3filterData.push(fullCountryData2[i]);
                }
                this.level3filterData = this.level3filterData.filter((x: any) => x.countryId != 0)
                this.level3filterData.sort((a, b) => {
                    if (a["countryName"] < b["countryName"]) return -1;
                    else if (a["countryName"] > b["countryName"]) return 1;
                    else return 0;
                });
                //source
                if (this.cascadeDependency != "crop") {
                    this.sourceData = [];
                    var fullSourceData: any = this.fullData.filter((x: any) => x.regionId == filterValue && x.territoryId == 0 && x.countryId == 0);
                    var src: any = []
                    for (let i = 0; i < fullSourceData.length; i++) {
                        if (src[fullSourceData[i].sourceId]) continue;
                        src[fullSourceData[i].sourceId] = true;
                        this.sourceData.push(fullSourceData[i]);
                    }
                    this.sourceData = this.sourceData.filter((x: any) => x.sourceId != 0)
                    this.sourceData.sort((a, b) => {
                        if (a["sourceName"] < b["sourceName"]) return -1;
                        else if (a["sourceName"] > b["sourceName"]) return 1;
                        else return 0;
                    });
                    if (this.sourceData.length > 0)
                        this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                    else
                        this.sourceDefaultSelected = 0;
                    this.onSourceDropdownChange(this.sourceDefaultSelected);
                }
                else if (this.cascadeDependency == "crop") {
                    for (let i = 0; i < this.multipleSourceData.length; i++) {
                        this.multipleSourceData[i].filterData = [];
                        var fullSourceData: any = this.fullData.filter((x: any) => x.regionId == filterValue && x.territoryId == 0 && x.countryId == 0 && x.widgetName == this.multipleSourceData[i].filterName);
                        var src: any = []
                        for (let k = 0; k < fullSourceData.length; k++) {
                            if (src[fullSourceData[k].sourceId]) continue;
                            src[fullSourceData[k].sourceId] = true;
                            this.multipleSourceData[i].filterData.push(fullSourceData[k]);
                        }
                        this.multipleSourceData[i].filterData = this.multipleSourceData[i].filterData.filter((x: any) => x.sourceId != 0);
                        this.multipleSourceData[i].filterData.sort((a, b) => {
                            if (a["sourceName"] < b["sourceName"]) return -1;
                            else if (a["sourceName"] > b["sourceName"]) return 1;
                            else return 0;
                        });
                        let defaultValue: any = this.multipleSourceData[i].filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                        if (defaultValue.length > 0) {
                            //this.sourceOverViewDefault[i] = defaultValue[0]["defaultSourceId"];
                            this.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                            this.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                            this.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];
                            //added for recommended
                            let index: number = (this.multipleSourceData[i].filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                            if (!this.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                            this.multipleSourceData[i].filterData[index]["sourceName"] = this.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";

                        }
                        else if (this.multipleSourceData[i].filterData.length > 0) {
                            this.multipleSourceData[i].selectedData = this.multipleSourceData[i].filterData[0]["sourceId"];
                            this.multipleSourceData[i].sortOrder = this.multipleSourceData[i].filterData[0]["minYear"];
                            this.multipleSourceData[i].childControlMappingId = this.multipleSourceData[i].filterData[0]["maxYear"];
                        }
                        else {
                            this.multipleSourceData[i].selectedData = 0;
                            this.multipleSourceData[i].sortOrder = 0;
                            this.multipleSourceData[i].childControlMappingId = 0;
                        }
                        this.onOverViewSourceDropdownChange(this.multipleSourceData[i].selectedData, this.multipleSourceData[i].filterName, this.multipleSourceData[i], 'code');
                    }
                    this.setOverViewSlider();
                }
            }
        }
    }

    onDropdownlevel2Change(filterValue: number, filterObject1: IFilters) {
        this.level2DefaultSelected = filterValue;
        this.level3DefaultSelected = 0;
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = this.dropdownlevel2FilterName;
        selectedValue["selectedData"] = filterValue;
        //selectedValue["filterData"] = filterObject1.filterData.filter(x => x["labelId"] == filterValue);
        this.selectedValueEmit.emit(selectedValue);        
        if (this.cascadeDependency == "crop")
            this.fullData = this.filtersRelationList.filter(x => x["cropId"] == this.cropId);
        else if (this.cascadeDependency == "region") {
            this.fullData = this.filtersRelationList;
        }

        if (this.cascadeDependency == "default") {
            this.level3filterData = this.level3fullData.filter(x => x["parent2Id"] == filterValue);
            let selectedValue3: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue3["filterName"] = this.dropdownlevel3FilterName;
            let level3selectedId: number = 0;
            if (this.level3filterData[0])
                level3selectedId = this.level3filterData[0]["labelId"];
            selectedValue3["selectedData"] = 0;
            this.selectedValueEmit.emit(selectedValue3);
        }
        else if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
            //country
            this.level3filterData = [];
            let selectedValue1: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue1["filterName"] = this.dropdownlevel3FilterName;
            selectedValue1["selectedData"] = 0;
            this.selectedValueEmit.emit(selectedValue1);
            var conts: any = [];
            var fullCountryData2: any;
            fullCountryData2 = this.fullData.filter((x: any) => x.regionId == this.level1DefaultSelected && x.territoryId == this.level2DefaultSelected);
            for (let i = 0; i < fullCountryData2.length; i++) {
                if (conts[fullCountryData2[i].countryId]) continue;
                conts[fullCountryData2[i].countryId] = true;
                this.level3filterData.push(fullCountryData2[i]);
            }
            this.level3filterData = this.level3filterData.filter((x: any) => x.countryId != 0)
            this.level3filterData.sort((a, b) => {
                if (a["countryName"] < b["countryName"]) return -1;
                else if (a["countryName"] > b["countryName"]) return 1;
                else return 0;
            });

            //source 
            if (this.cascadeDependency != "crop") {
                this.sourceData = [];
                var fullSourceData: any = fullCountryData2.filter((x: any) => x.countryId == 0);
                var src: any = []
                for (let i = 0; i < fullSourceData.length; i++) {
                    if (src[fullSourceData[i].sourceId]) continue;
                    src[fullSourceData[i].sourceId] = true;
                    this.sourceData.push(fullSourceData[i]);
                }
                this.sourceData = this.sourceData.filter((x: any) => x.sourceId != 0)
                this.sourceData.sort((a, b) => {
                    if (a["sourceName"] < b["sourceName"]) return -1;
                    else if (a["sourceName"] > b["sourceName"]) return 1;
                    else return 0;
                });
                if (this.sourceData.length > 0)
                    this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                else
                    this.sourceDefaultSelected = 0;
                this.onSourceDropdownChange(this.sourceDefaultSelected);
            }
            else if (this.cascadeDependency == "crop") {
                for (let i = 0; i < this.multipleSourceData.length; i++) {
                    this.multipleSourceData[i].filterData = [];
                    var fullSourceData: any = fullCountryData2.filter((x: any) => x.countryId == 0 && x.widgetName == this.multipleSourceData[i].filterName);
                    var src: any = []
                    for (let k = 0; k < fullSourceData.length; k++) {
                        if (src[fullSourceData[k].sourceId]) continue;
                        src[fullSourceData[k].sourceId] = true;
                        this.multipleSourceData[i].filterData.push(fullSourceData[k]);
                    }
                    this.multipleSourceData[i].filterData = this.multipleSourceData[i].filterData.filter((x: any) => x.sourceId != 0);
                    this.multipleSourceData[i].filterData.sort((a, b) => {
                        if (a["sourceName"] < b["sourceName"]) return -1;
                        else if (a["sourceName"] > b["sourceName"]) return 1;
                        else return 0;
                    });
                    let defaultValue: any = this.multipleSourceData[i].filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                    if (defaultValue.length > 0) {
                        this.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                        this.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                        this.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];
                        //added for recommended
                        let index: number = (this.multipleSourceData[i].filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                        if (!this.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                        this.multipleSourceData[i].filterData[index]["sourceName"] = this.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";

                    }
                    else if (this.multipleSourceData[i].filterData.length > 0) {
                        this.multipleSourceData[i].selectedData = this.multipleSourceData[i].filterData[0]["sourceId"];
                        this.multipleSourceData[i].sortOrder = this.multipleSourceData[i].filterData[0]["minYear"];
                        this.multipleSourceData[i].childControlMappingId = this.multipleSourceData[i].filterData[0]["maxYear"];
                    }
                    else {
                        this.multipleSourceData[i].selectedData = 0;
                        this.multipleSourceData[i].sortOrder = 0;
                        this.multipleSourceData[i].childControlMappingId = 0;
                    }
                    this.onOverViewSourceDropdownChange(this.multipleSourceData[i].selectedData, this.multipleSourceData[i].filterName, this.multipleSourceData[i], 'code');
                }
                this.setOverViewSlider();
            }
        }
    }

    onDropdownlevel3Change(filterValue: number, filterObject1: IFilters) {
        this.level3DefaultSelected = filterValue;
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["selectedData"] = filterValue;
        selectedValue["filterData"] = filterObject1.filterData.filter(x => x["labelId"] == filterValue);
        this.selectedValueEmit.emit(selectedValue);
        if (this.cascadeDependency == "crop")
            this.fullData = this.filtersRelationList.filter(x => x["cropId"] == this.cropId);
        else if (this.cascadeDependency == "region") {
            this.fullData = this.filtersRelationList;
        }

        if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
            //source
            if (this.cascadeDependency != "crop") {
                this.sourceData = [];
                var fullSourceData: any = this.fullData.filter((x: any) => x.regionId == this.level1DefaultSelected && x.territoryId == this.level2DefaultSelected && x.countryId == this.level3DefaultSelected);
                var src: any = []
                for (let i = 0; i < fullSourceData.length; i++) {
                    if (src[fullSourceData[i].sourceId]) continue;
                    src[fullSourceData[i].sourceId] = true;
                    this.sourceData.push(fullSourceData[i]);
                }
                this.sourceData = this.sourceData.filter((x: any) => x.sourceId != 0)
                this.sourceData.sort((a, b) => {
                    if (a["sourceName"] < b["sourceName"]) return -1;
                    else if (a["sourceName"] > b["sourceName"]) return 1;
                    else return 0;
                });
                if (this.sourceData.length > 0)
                    this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                else
                    this.sourceDefaultSelected = 0;
                this.onSourceDropdownChange(this.sourceDefaultSelected);
            }
            else if (this.cascadeDependency == "crop") {
                for (let i = 0; i < this.multipleSourceData.length; i++) {
                    this.multipleSourceData[i].filterData = [];
                    var fullSourceData: any = this.fullData.filter((x: any) => x.regionId == this.level1DefaultSelected && x.territoryId == this.level2DefaultSelected && x.countryId == this.level3DefaultSelected && x.widgetName == this.multipleSourceData[i].filterName);
                    var src: any = []
                    for (let k = 0; k < fullSourceData.length; k++) {
                        if (src[fullSourceData[k].sourceId]) continue;
                        src[fullSourceData[k].sourceId] = true;
                        this.multipleSourceData[i].filterData.push(fullSourceData[k]);
                    }
                    this.multipleSourceData[i].filterData = this.multipleSourceData[i].filterData.filter((x: any) => x.sourceId != 0);
                    this.multipleSourceData[i].filterData.sort((a, b) => {
                        if (a["sourceName"] < b["sourceName"]) return -1;
                        else if (a["sourceName"] > b["sourceName"]) return 1;
                        else return 0;
                    });
                    let defaultValue: any = this.multipleSourceData[i].filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                    if (defaultValue.length > 0) {
                        //this.sourceOverViewDefault[i] = defaultValue[0]["defaultSourceId"];
                        this.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                        this.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                        this.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];
                        //added for recommended
                        let index: number = (this.multipleSourceData[i].filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                        if (!this.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                        this.multipleSourceData[i].filterData[index]["sourceName"] = this.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";

                    }
                    else if (this.multipleSourceData[i].filterData.length > 0) {
                        this.multipleSourceData[i].selectedData = this.multipleSourceData[i].filterData[0]["sourceId"];
                        this.multipleSourceData[i].sortOrder = this.multipleSourceData[i].filterData[0]["minYear"];
                        this.multipleSourceData[i].childControlMappingId = this.multipleSourceData[i].filterData[0]["maxYear"];
                    }
                    else {
                        this.multipleSourceData[i].selectedData = 0;
                        this.multipleSourceData[i].sortOrder = 0;
                        this.multipleSourceData[i].childControlMappingId = 0;
                    }
                    this.onOverViewSourceDropdownChange(this.multipleSourceData[i].selectedData, this.multipleSourceData[i].filterName, this.multipleSourceData[i], 'code');
                }
                this.setOverViewSlider();
            }
        }
    }

    onParentDropdownChange(filterValue: number, filterObject1: IFilters) {
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["selectedData"] = filterValue;
        let fx = filterObject1.filterData.filter(
            x => x["labelId"] == filterValue)
        let childId = fx[0]["childControlMappingId"];
        selectedValue["childControlMappingId"] = childId;
        this.selectedValueEmit.emit(selectedValue);
        if (childId) {
            if (this.childdropdown) {
                this.childDropdownObject = this.filtersList.filter(
                    x => x.id == childId);
                this.renderer.setElementStyle(this.childdropdown.nativeElement, 'display', 'block');
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["id"] = this.childDropdownObject[0]["id"];
                selectedValue["filterName"] = this.childDropdownObject[0]["filterName"];
                selectedValue["filterType"] = this.childDropdownObject[0]["filterType"];
                if (this.childDropdownObject[0]["selectedData"])
                    selectedValue["selectedData"] = this.childDropdownObject[0]["selectedData"];
                else
                    selectedValue["selectedData"] = this.childDropdownObject[0]["filterData"][0]["labelId"];
                this.selectedValueEmit.emit(selectedValue);
            }
        }
        else {
            if (this.childdropdown) {
                this.renderer.setElementStyle(this.childdropdown.nativeElement, 'display', 'none');
            }
        }

        if (filterObject1.filterName.toLocaleLowerCase() == "parameter" && (filterValue == 22 || filterValue == 23 || filterValue == 24 || filterValue == 19)) {
            if (this.radio) {
                this.renderer.setElementStyle(this.radio.nativeElement, 'display', 'none');
                //this.onChangeRadioButton("Quarterly", "View Data As")//Yearly
                this.onChangeNewRadioButton("Quarterly", "View Data As");
                this.isShow = false;
                //if (filterValue != 19) {
                //    this.renderer.setElementStyle(this.dropdown.nativeElement, 'display', 'none');
                //}
                //else if (filterValue == 19) {
                //    this.renderer.setElementStyle(this.dropdown.nativeElement, 'display', 'block');
                //}
                //For indexed Parameters change
                this.renderer.setElementStyle(this.dropdown.nativeElement, 'display', 'block');
            }
        }
        else {
            if (this.radio && this.isShow == false) {
                this.renderer.setElementStyle(this.radio.nativeElement, 'display', 'block');
                this.radioValue = 'Quarterly';
                this.isShow = true;
                this.renderer.setElementStyle(this.dropdown.nativeElement, 'display', 'block');
            }

            if (filterObject1.filterName.toLocaleLowerCase() == "parameter" && (filterValue == 2 || filterValue == 7 || filterValue == 9 || filterValue == 11 || filterValue == 13 || filterValue == 18 || filterValue == 21)) {
                if (this.dropdown) {
                    this.renderer.setElementStyle(this.dropdown.nativeElement, 'display', 'none');
                }
            }
            else {
                if (this.dropdown) {
                    this.renderer.setElementStyle(this.dropdown.nativeElement, 'display', 'block');
                }
            }
        }
    }
    onChildChange(filterValue: string, filterObject1: IFilters) {
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["id"] = filterObject1.id;
        selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["filterType"] = filterObject1.filterType;
        selectedValue["selectedData"] = filterValue;
        this.selectedValueEmit.emit(selectedValue);
    }
    onSliderQChange(filterValue: any, filterName: string) {
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["selectedData"] = [filterValue, filterValue + 1];
        this.selectedValueEmit.emit(selectedValue);
    }
    onChangeRadioButton(filterValue: any, filterName: string) {
        let selectedRadioValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedRadioValue["filterName"] = filterName;
        selectedRadioValue["selectedData"] = filterValue;
        if (filterValue.toLocaleLowerCase() === "quarterly" || filterValue.toLocaleLowerCase() === "monthly") {
            if (this.sliderYear) {
                this.renderer.setElementStyle(this.sliderYear.nativeElement, 'display', 'none');
            }
            if (this.sliderQuarter) {
                this.renderer.setElementStyle(this.sliderQuarter.nativeElement, 'display', 'block');
            }
            if (this.monthlyDropdowns) {
                this.renderer.setElementStyle(this.monthlyDropdowns.nativeElement, 'display', 'block');
                if (this.quarterSubmit == true) {
                    this.submitVisible.emit(true);
                    this.submitMessage.emit(this.quarterSubmitMessage);
                }
                else {
                    this.submitVisible.emit(false);
                }
            }
        }
        else if (filterValue.toLocaleLowerCase() === "yearly") {
            if (this.sliderYear) {
                this.renderer.setElementStyle(this.sliderYear.nativeElement, 'display', 'block');
                //added for emit 
                this.submitVisible.emit(false);
                this.submitMessage.emit("");
            }
            if (this.sliderQuarter) {
                this.renderer.setElementStyle(this.sliderQuarter.nativeElement, 'display', 'none');
            }
            if (this.monthlyDropdowns) {
                this.renderer.setElementStyle(this.monthlyDropdowns.nativeElement, 'display', 'none');
            }
        }
        this.selectedValueEmit.emit(selectedRadioValue);

        if (filterName == "Choose Via") {
            if (filterValue == "Crop") {
                this.multiselectlimit = 5;
                this.geographylimit = 1;
                this.geographySelected[0] = []; this.geographySelected[1] = []; this.geographySelected[2] = []; this.multiSelectValues = [];
                this.geography[1] = []; this.geography[2] = [];
                //added for cascading
                this.geography[0] = [];
                this.sourceList = [];
                this.submitVisible.emit(true);
                
            }
            else if (filterValue == "Geography") {
                this.multiselectlimit = 1;
                this.geographylimit = 5;
                this.multiSelectValues = []; this.geographySelected[0] = []; this.geographySelected[1] = []; this.geographySelected[2] = [];
                this.geography[1] = []; this.geography[2] = [];
                //added for cascading
                this.geography[0] = [];
                this.sourceList = [];
                this.submitVisible.emit(true);
                
            }
        }
    }
    onChangeNewRadioButton(filterValue: any, filterName: string) {
        let selectedRadioValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedRadioValue["filterName"] = filterName;
        selectedRadioValue["selectedData"] = filterValue;
        if (filterValue.toLocaleLowerCase() === "quarterly" || filterValue.toLocaleLowerCase() === "monthly") {
            if (this.sliderYear) {
                this.renderer.setElementStyle(this.sliderYear.nativeElement, 'display', 'none');
            }
            if (this.sliderQuarter) {
                this.renderer.setElementStyle(this.sliderQuarter.nativeElement, 'display', 'block');
            }
            if (this.monthlyDropdowns) {
                this.renderer.setElementStyle(this.monthlyDropdowns.nativeElement, 'display', 'block');
                if (this.quarterSubmit == true) {
                    this.submitVisible.emit(true);
                    this.submitMessage.emit(this.quarterSubmitMessage);
                }
                else if (this.multiSelectValues.length == 0) {
                    this.submitVisible.emit(true);
                }
                else {
                    this.submitVisible.emit(false);
                }
            }
        }
        else if (filterValue.toLocaleLowerCase() === "yearly") {
            if (this.sliderYear) {
                this.renderer.setElementStyle(this.sliderYear.nativeElement, 'display', 'block');
            }
            if (this.sliderQuarter) {
                this.renderer.setElementStyle(this.sliderQuarter.nativeElement, 'display', 'none');
            }
            if (this.monthlyDropdowns) {
                this.renderer.setElementStyle(this.monthlyDropdowns.nativeElement, 'display', 'none');
                if (this.multiSelectValues.length == 0) {
                    this.submitVisible.emit(true);
                }
                else {
                    this.submitVisible.emit(false);
                }
                this.submitMessage.emit("");
            }
        }
        this.selectedValueEmit.emit(selectedRadioValue);
    }
    onChangeMultiSelect(filterValue: any, filterName: string, filterObjects: any) {
        if (filterName != 'Crop') {
            if (filterValue.length <= 5) {
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                this.multiSelectValues = filterValue;
                selectedValue["filterName"] = filterName;
                selectedValue["selectedData"] = filterValue;
                this.selectedValueEmit.emit(selectedValue);
            }
            else {
                this.multiSelectValues = this.multiSelectValues.slice(0, 5);
                filterValue = filterValue.slice(0, 5);
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = filterName;
                selectedValue["selectedData"] = filterValue;
                this.selectedValueEmit.emit(selectedValue);
            }
            if (filterValue.length == 0) {
                this.submitVisible.emit(true)
            }
            else {
                this.submitVisible.emit(false)
            }
        }
        else {
            if (filterValue.length <= this.multiselectlimit) {
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                this.multiSelectValues = filterValue;
                selectedValue["filterName"] = filterName;
                selectedValue["selectedData"] = filterValue;
                this.selectedValueEmit.emit(selectedValue);
                //cropcascade                
                if (filterValue.length != 0) {
                    this.geography[0] = [];
                    var Obj0: Object[] = this.geographySelected[0];
                    this.geographySelected[0] = [];
                    var flags: any = [];
                    for (let cropId of filterValue.length > 0 ? filterValue : []) {
                        //cloning problem
                        let cloned: IFilterRelation[] = this.filtersRelationList.map(x => Object.assign({}, x));
                        let reg: IFilterRelation[] = cloned.filter(y => y["cropId"] == cropId && y["kpiId"] == this.parameterId);
                        for (let i = 0; i < reg.length; i++) {
                            if (flags[reg[i].regionId]) {
                                if (reg[i].regionShade == '0') {
                                    let index: number = (this.geography[0] as any).findIndex((x: any) => x['regionId'] == reg[i].regionId);
                                    if (index >= 0) {
                                        this.geography[0][index]['regionShade'] == '0';
                                    }
                                }
                                continue;
                            }
                            flags[reg[i].regionId] = true;
                            this.geography[0].push(reg[i]);
                            if (Obj0.indexOf(reg[i].regionId) > -1) {
                                this.geographySelected[0].push(reg[i].regionId);
                            }
                        }
                    }
                    this.geography[0].sort((a, b) => {
                        if (a["regionName"] < b["regionName"]) return -1;
                        else if (a["regionName"] > b["regionName"]) return 1;
                        else return 0;
                    });
                    for (let i = 0; i < this.geography[0].length; i++) {
                        this.geography[0][i].label = this.geography[0][i].regionName;
                        this.geography[0][i].value = this.geography[0][i].regionId;                        
                    }
                    this.onChangeGeographyMultiSelect(this.geographySelected[0], "Region", this.geography[0]);

                    //source
                    if (this.multiselectlimit == 5) {
                        var flagSource: any = [];
                        //removing extra source dropdown
                        if (this.sourceList.length > filterValue.length) {
                            this.sourceList = this.sourceList.filter(x => filterValue.indexOf(x.id) > -1);
                            this.setSlider();

                            let SourceNames: any[] = [];
                            for (let name of this.sourceList) {
                                SourceNames.push(name.filterName);
                            }
                            let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            selectedValue2["filterName"] = 'List';
                            selectedValue2["selectedData"] = SourceNames;
                            selectedValue2["filterType"] = this.sourceList[0].filterType;
                            this.selectedValueEmit.emit(selectedValue2);
                        }
                        //adding first source dropdown
                        else if (filterValue.length == 1) {

                            let source: IFilters = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            source.filterName = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].label;
                            source.id = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].value;
                            source.filterData = [];
                            source.selectedData = 0;
                            this.sourceList.push(source);
                            this.onSourceChange(source.selectedData, source.filterName, source, 'code');

                        }
                        //adding another source dropdown
                        else {
                            let source: IFilters = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            source.filterName = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].label;
                            source.id = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].value;
                            if (this.geographySelected[0].length > 0) {
                                if (this.geographySelected[1].length > 0) {
                                    if (this.geographySelected[2].length > 0) {
                                        let sor: IFilterRelation[] = this.filtersRelationList.filter(x => filterValue.indexOf(x.cropId) == (filterValue.length - 1) && this.geographySelected[0].indexOf(x.regionId) > -1 && (this.geographySelected[1].indexOf(x.territoryId) > -1 || x.territoryId == 0) && this.geographySelected[2].indexOf(x.countryId) > -1 && x.kpiId == this.parameterId);
                                        for (let i = 0; i < sor.length; i++) {
                                            if (flagSource[sor[i].sourceId]) {
                                                continue;
                                            }
                                            flagSource[sor[i].sourceId] = true;
                                            source.filterData.push(sor[i]);
                                        }
                                    }
                                    else {
                                        let sor: IFilterRelation[] = this.filtersRelationList.filter(x => filterValue.indexOf(x.cropId) == (filterValue.length - 1) && this.geographySelected[0].indexOf(x.regionId) > -1 && this.geographySelected[1].indexOf(x.territoryId) > -1 && x.countryId == 0 && x.kpiId == this.parameterId);
                                        for (let i = 0; i < sor.length; i++) {
                                            if (flagSource[sor[i].sourceId]) {
                                                continue;
                                            }
                                            flagSource[sor[i].sourceId] = true;
                                            source.filterData.push(sor[i]);
                                        }
                                    }
                                }
                                else if (this.geographySelected[2].length > 0) {
                                    let sor: IFilterRelation[] = this.filtersRelationList.filter(x => filterValue.indexOf(x.cropId) == (filterValue.length - 1) && this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && this.geographySelected[2].indexOf(x.countryId) > -1 && x.kpiId == this.parameterId);
                                    for (let i = 0; i < sor.length; i++) {
                                        if (flagSource[sor[i].sourceId]) {
                                            continue;
                                        }
                                        flagSource[sor[i].sourceId] = true;
                                        source.filterData.push(sor[i]);
                                    }
                                }
                                else {
                                    let sor: IFilterRelation[] = this.filtersRelationList.filter(x => filterValue.indexOf(x.cropId) == (filterValue.length - 1) && this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && x.countryId == 0 && x.kpiId == this.parameterId);
                                    for (let i = 0; i < sor.length; i++) {
                                        if (flagSource[sor[i].sourceId]) {
                                            continue;
                                        }
                                        flagSource[sor[i].sourceId] = true;
                                        source.filterData.push(sor[i]);
                                    }
                                }
                            }
                            else {
                                source.filterData = [];
                            }
                            // source sorting
                            source.filterData = source.filterData.filter((x: any) => x.sourceId != 0);
                            source.filterData.sort((a, b) => {
                                if (a["sourceName"] < b["sourceName"]) return -1;
                                else if (a["sourceName"] > b["sourceName"]) return 1;
                                else return 0;
                            });

                            //for default value start //sortOrder=min  //childControlMappingId= max
                            let defaultValue: any = source.filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                            if (defaultValue.length > 0) {
                                source.selectedData = defaultValue[0]["defaultSourceId"];
                                source.sortOrder = defaultValue[0]["minYear"];
                                source.childControlMappingId = defaultValue[0]["maxYear"];
                                
                                //added for recommended
                                let index: number = (source.filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                                if (!source.filterData[index]["sourceName"].includes("recommended"))
                                source.filterData[index]["sourceName"] = source.filterData[index]["sourceName"] + " (recommended)";

                            }
                            else if (source.filterData.length > 0) {
                                source.selectedData = source.filterData[0]["sourceId"];
                                source.sortOrder = source.filterData[0]["minYear"];
                                source.childControlMappingId = source.filterData[0]["maxYear"];                                
                            }
                            else {
                                source.selectedData = 0;
                                source.sortOrder = 0;
                                source.childControlMappingId = 0;                                
                            }
                            //for default value end                   
                            this.sourceList.push(source);
                            this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                            this.setSlider();
                        }
                    }
                }

            }
            else if (filterValue.length > this.multiselectlimit) {
                this.multiSelectValues = this.multiSelectValues.slice(0, this.multiselectlimit);
                filterValue = filterValue.slice(0, this.multiselectlimit);
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = filterName;
                selectedValue["selectedData"] = filterValue;
                this.selectedValueEmit.emit(selectedValue);
            }
            if (filterValue.length == 0) {
                this.submitVisible.emit(true);
                //cropcascade 
                this.geography[0] = []; this.geographySelected[0] = [];
                this.geography[1] = []; this.geographySelected[1] = [];
                this.geography[2] = []; this.geographySelected[2] = [];
                this.sourceList = [];

                let selectedValue0: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue0["filterName"] = "Region";
                selectedValue0["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue0);

                let selectedValue1: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue1["filterName"] = "Territory";
                selectedValue1["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue1);

                let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue2);
            }
            else if (this.geographySelected[0].length == 0 && this.geographySelected[1].length == 0 && this.geographySelected[2].length == 0) {
                this.submitVisible.emit(true)
            }
            else {               
                if (this.sourceList.length > 0) {
                    this.setSlider();
                }
                else {
                    this.submitVisible.emit(false);
                }
            }
        }
    }
    onChangeGeographyMultiSelect(filterValue: any, filterName: string, filterObjects: any) {
        var sourceCheck: number = 1;
        var fullData: IFilterRelation[] = [];
        let cloned: IFilterRelation[] = this.filtersRelationList.map(x => Object.assign({}, x));
        for (let cropId of this.multiSelectValues.length > 0 ? this.multiSelectValues : []) {
            let x: IFilterRelation[] = cloned.filter(x => x["cropId"] == cropId && x["kpiId"] == this.parameterId);
            for (let i = 0; i < x.length; i++) {
                fullData.push(x[i]);
            }
        }
        if (filterValue.length == 0) {
            if (filterName.toLocaleLowerCase() == "region") {
                this.geography[1] = []; this.geographySelected[1] = [];
                this.geography[2] = []; this.geographySelected[2] = [];
                let selectedValue1: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue1["filterName"] = "Territory";
                selectedValue1["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue1);

                let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue2);
            }
            else if (filterName.toLocaleLowerCase() == "territory") {
                this.geography[2] = [];
                var Obj2: Object[] = this.geographySelected[2];
                this.geographySelected[2] = [];
                var conts: any = [];
                for (let en of this.geographySelected[0]) {
                    let con: IFilterRelation[] = fullData.filter(y => y.regionId == en && y.territoryId == 0 && y.countryId != 0);
                    for (let i = 0; i < con.length; i++) {
                        if (conts[con[i].countryId]) continue;
                        conts[con[i].countryId] = true;
                        this.geography[2].push(con[i]);
                        if (Obj2.indexOf(con[i].countryId) > -1) {
                            this.geographySelected[2].push(con[i].countryId);
                        }
                    }
                }
                this.geography[2].sort((a, b) => {
                    if (a["countryName"] < b["countryName"]) return -1;
                    else if (a["countryName"] > b["countryName"]) return 1;
                    else return 0;
                });
                for (let i = 0; i < this.geography[2].length; i++) {
                    this.geography[2][i].label = this.geography[2][i].countryName;
                    this.geography[2][i].value = this.geography[2][i].countryId;
                    //delete this.geography[0][i].regionName;
                }

                let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = this.geographySelected[2];
                this.selectedValueEmit.emit(selectedValue2);
            }
            let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = filterName;
            selectedValue["selectedData"] = filterValue;
            this.selectedValueEmit.emit(selectedValue);
        }
        else if (filterValue.length <= this.geographylimit) {
            let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = filterName;
            selectedValue["selectedData"] = filterValue;
            this.selectedValueEmit.emit(selectedValue);
            if (filterName.toLocaleLowerCase() == "region") {
                this.geography[1] = [];
                this.geography[2] = [];
                var Obj1: Object[] = this.geographySelected[1];
                var Obj2: Object[] = this.geographySelected[2];
                this.geographySelected[1] = [];
                this.geographySelected[2] = [];
                var flags: any = [];
                var flags2: any = [];
                for (let en of filterValue) {
                    let ter: IFilterRelation[] = fullData.filter(y => y.regionId == en && y.territoryId != 0 && y["kpiId"] == this.parameterId);
                    for (let i = 0; i < ter.length; i++) {
                        if (flags[ter[i].territoryId]) {
                            if (ter[i].territoryShade == '0') {
                                let index: number = (this.geography[1] as any).findIndex((x: any) => x['territoryId'] == ter[i].territoryId);
                                if (index >= 0) {
                                    this.geography[1][index]['territoryShade'] == '0';
                                }
                            }
                            continue;
                        }
                        flags[ter[i].territoryId] = true;
                        this.geography[1].push(ter[i]);
                        if (Obj1.indexOf(ter[i].territoryId) > -1) {
                            this.geographySelected[1].push(ter[i].territoryId);
                        }
                    }

                   let fullDataCloned: IFilterRelation[] = fullData.map(x => Object.assign({}, x));
                    let con: IFilterRelation[] = fullDataCloned.filter(y => y.regionId == en && y.territoryId == 0 && y.countryId != 0 && y["kpiId"] == this.parameterId);
                    for (let i = 0; i < con.length; i++) {
                        if (flags2[con[i].countryId]) continue;
                        flags2[con[i].countryId] = true;
                        this.geography[2].push(con[i]);
                        if (Obj2.indexOf(con[i].countryId) > -1) {
                            this.geographySelected[2].push(con[i].countryId);
                        }
                    }

                    for (let can of Obj1) {
                        let con: IFilterRelation[] = fullDataCloned.filter(y => y.regionId == en && y.territoryId == can && y.countryId != 0 && y["kpiId"] == this.parameterId);
                        for (let i = 0; i < con.length; i++) {
                            if (flags2[con[i].countryId]) continue;
                            flags2[con[i].countryId] = true;
                            this.geography[2].push(con[i]);
                            if (Obj2.indexOf(con[i].countryId) > -1) {
                                this.geographySelected[2].push(con[i].countryId);
                            }
                        }
                    }
                }
                let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = this.geographySelected[2];
                this.selectedValueEmit.emit(selectedValue2);

                let selectedValue1: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue1["filterName"] = "Territory";
                selectedValue1["selectedData"] = this.geographySelected[1];
                this.selectedValueEmit.emit(selectedValue1);
            }
            if (filterName.toLocaleLowerCase() == "territory") {
                this.geography[2] = [];
                var Obj2: Object[] = this.geographySelected[2];
                this.geographySelected[2] = [];
                var flags2: any = [];
                for (let en of filterValue) {
                    let con: IFilterRelation[] = fullData.filter(y => y.territoryId == en && y.countryId != 0 && y["kpiId"] == this.parameterId);
                    for (let i = 0; i < con.length; i++) {
                        if (flags2[con[i].countryId]) continue;
                        flags2[con[i].countryId] = true;
                        this.geography[2].push(con[i]);
                        if (Obj2.indexOf(con[i].countryId) > -1) {
                            this.geographySelected[2].push(con[i].countryId);
                        }
                    }
                }
                for (let en of this.geographySelected[0]) {
                    let con: IFilterRelation[] = fullData.filter(y => y.regionId == en && y.territoryId == 0 && y.countryId != 0 && y["kpiId"] == this.parameterId);
                    for (let i = 0; i < con.length; i++) {
                        if (flags2[con[i].countryId]) continue;
                        flags2[con[i].countryId] = true;
                        this.geography[2].push(con[i]);
                        if (Obj2.indexOf(con[i].countryId) > -1) {
                            this.geographySelected[2].push(con[i].countryId);
                        }
                    }
                }
                let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = this.geographySelected[2];
                this.selectedValueEmit.emit(selectedValue2);
            }
            
            this.geography[1].sort((a, b) => {
                if (a["territoryName"] < b["territoryName"]) return -1;
                else if (a["territoryName"] > b["territoryName"]) return 1;
                else return 0;
            });
            for (let i = 0; i < this.geography[1].length; i++) {
                this.geography[1][i].label = this.geography[1][i].territoryName;
                this.geography[1][i].value = this.geography[1][i].territoryId;
                //delete this.geography[0][i].regionName;
            }
            this.geography[2].sort((a, b) => {
                if (a["countryName"] < b["countryName"]) return -1;
                else if (a["countryName"] > b["countryName"]) return 1;
                else return 0;
            });
            for (let i = 0; i < this.geography[2].length; i++) {
                this.geography[2][i].label = this.geography[2][i].countryName;
                this.geography[2][i].value = this.geography[2][i].countryId;
                //delete this.geography[0][i].regionName;
            }

        }
        else if (filterValue.length > this.geographylimit) {
            sourceCheck = 0;
            if (filterName.toLocaleLowerCase() == "region") {
                this.geographySelected[0] = this.geographySelected[0].slice(0, this.geographylimit);
            }
            else if (filterName.toLocaleLowerCase() == "territory") {
                this.geographySelected[1] = this.geographySelected[1].slice(0, this.geographylimit);
            }
            else if (filterName.toLocaleLowerCase() == "country") {
                this.geographySelected[2] = this.geographySelected[2].slice(0, this.geographylimit);
            }
            filterValue = filterValue.slice(0, this.geographylimit);
            let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = filterName;
            selectedValue["selectedData"] = filterValue;
            this.selectedValueEmit.emit(selectedValue);
        }

        if (this.geographySelected[0].length == 0 && this.geographySelected[1].length == 0 && this.geographySelected[2].length == 0) {
            this.submitVisible.emit(true)
        }
        else if (this.multiSelectValues.length == 0) {
            this.submitVisible.emit(true)
        }
        else {
           
            if (this.sourceList.length > 0) {
                this.setSlider();
            }
            else { this.submitVisible.emit(false); }
        }

        //sources
        if (sourceCheck == 1) {
            if (this.multiselectlimit == 5) {

                for (let j = 0; j < this.sourceList.length; j++) {
                    let flagSource: any = [];
                    this.sourceList[j].filterData = [];
                    if (this.geographySelected[0].length > 0) {
                        if (this.geographySelected[1].length > 0) {
                            if (this.geographySelected[2].length > 0) {
                                let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.sourceList[j].id == x.cropId && this.geographySelected[0].indexOf(x.regionId) > -1 && (this.geographySelected[1].indexOf(x.territoryId) > -1 || x.territoryId == 0) && this.geographySelected[2].indexOf(x.countryId) > -1 && x["kpiId"] == this.parameterId);
                                for (let i = 0; i < sor.length; i++) {
                                    if (flagSource[sor[i].sourceId]) {
                                        continue;
                                    }
                                    flagSource[sor[i].sourceId] = true;
                                    this.sourceList[j].filterData.push(sor[i]);
                                }
                            }
                            else {
                                let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.sourceList[j].id == x.cropId && this.geographySelected[0].indexOf(x.regionId) > -1 && this.geographySelected[1].indexOf(x.territoryId) > -1 && x.countryId == 0 && x["kpiId"] == this.parameterId);
                                for (let i = 0; i < sor.length; i++) {
                                    if (flagSource[sor[i].sourceId]) {
                                        continue;
                                    }
                                    flagSource[sor[i].sourceId] = true;
                                    this.sourceList[j].filterData.push(sor[i]);
                                }
                            }
                        }
                        else if (this.geographySelected[2].length > 0) {
                            let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.sourceList[j].id == x.cropId && this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && this.geographySelected[2].indexOf(x.countryId) > -1 && x["kpiId"] == this.parameterId);
                            for (let i = 0; i < sor.length; i++) {
                                if (flagSource[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource[sor[i].sourceId] = true;
                                this.sourceList[j].filterData.push(sor[i]);
                            }
                        }
                        else {
                            let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.sourceList[j].id == x.cropId && this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && x.countryId == 0 && x["kpiId"] == this.parameterId);
                            for (let i = 0; i < sor.length; i++) {
                                if (flagSource[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource[sor[i].sourceId] = true;
                                this.sourceList[j].filterData.push(sor[i]);
                            }
                        }
                    }
                    else {
                        this.sourceList[j].filterData = [];
                    }
                    // source sorting
                    this.sourceList[j].filterData = this.sourceList[j].filterData.filter((x: any) => x.sourceId != 0)
                    this.sourceList[j].filterData.sort((a, b) => {
                        if (a["sourceName"] < b["sourceName"]) return -1;
                        else if (a["sourceName"] > b["sourceName"]) return 1;
                        else return 0;
                    });

                    //for default value start //sortOrder=min  //childControlMappingId= max
                    let defaultValue: any = this.sourceList[j].filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                    if (defaultValue.length > 0) {
                        this.sourceList[j].selectedData = defaultValue[0]["defaultSourceId"];
                        this.sourceList[j].sortOrder = defaultValue[0]["minYear"];
                        this.sourceList[j].childControlMappingId = defaultValue[0]["maxYear"];
                        //added for recommended
                        let index: number = (this.sourceList[j].filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                        if (!this.sourceList[j].filterData[index]["sourceName"].includes("recommended"))
                        this.sourceList[j].filterData[index]["sourceName"] = this.sourceList[j].filterData[index]["sourceName"] + " (recommended)";
                    }
                    else if (this.sourceList[j].filterData.length > 0) {
                        this.sourceList[j].selectedData = this.sourceList[j].filterData[0]["sourceId"];
                        this.sourceList[j].sortOrder = this.sourceList[j].filterData[0]["minYear"];
                        this.sourceList[j].childControlMappingId = this.sourceList[j].filterData[0]["maxYear"];                        
                    }
                    else {
                        this.sourceList[j].selectedData = 0;
                        this.sourceList[j].sortOrder = 0;
                        this.sourceList[j].childControlMappingId = 0;                        
                    }
                    this.setSlider();
                    this.onSourceChange(this.sourceList[j].selectedData, this.sourceList[j].filterName, this.sourceList[j], 'code');
                    //for default value end      
                }

            }
            else {
                if (this.geographySelected[2].length > 0 && filterName == "Country") {
                    var flagSource: any = [];
                    //removing extra source dropdown
                    this.sourceList = this.sourceList.filter(x => x.filterType == "country");
                    if (this.sourceList.length > this.geographySelected[2].length) {
                        this.sourceList = this.sourceList.filter(x => this.geographySelected[2].indexOf(x.id) > -1 && x.filterType == "country");
                        this.setSlider();
                        let SourceNames: any[] = [];
                        for (let name of this.sourceList) {
                            SourceNames.push(name.filterName);
                        }
                        let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue2["filterName"] = 'List';
                        selectedValue2["selectedData"] = SourceNames;
                        selectedValue2["filterType"] = this.sourceList[0].filterType;
                        this.selectedValueEmit.emit(selectedValue2);
                    }
                    else {
                        let source: IFilters = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        source.filterName = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].label;
                        source.id = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].value;
                        if (this.geographySelected[2].length > 0) {
                            source.filterType = "country";
                        }
                        source.filterData = [];
                        if (this.geographySelected[1].length == 0) {
                            let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.multiSelectValues[0] == x.cropId && this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && filterValue[filterValue.length - 1] == x.countryId && x["kpiId"] == this.parameterId);
                            for (let i = 0; i < sor.length; i++) {
                                if (flagSource[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource[sor[i].sourceId] = true;
                                source.filterData.push(sor[i]);
                            }
                            source.filterData = source.filterData.filter((x: any) => x.sourceId != 0)
                            source.filterData.sort((a, b) => {
                                if (a["sourceName"] < b["sourceName"]) return -1;
                                else if (a["sourceName"] > b["sourceName"]) return 1;
                                else return 0;
                            });

                            //for default value start //sortOrder=min  //childControlMappingId= max
                            let defaultValue: any = source.filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                            if (defaultValue.length > 0) {
                                source.selectedData = defaultValue[0]["defaultSourceId"];
                                source.sortOrder = defaultValue[0]["minYear"];
                                source.childControlMappingId = defaultValue[0]["maxYear"];
                                //added for recommended
                                let index: number = (source.filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                                if (!source.filterData[index]["sourceName"].includes("recommended"))
                                source.filterData[index]["sourceName"] = source.filterData[index]["sourceName"] + " (recommended)";

                            }
                            else if (source.filterData.length > 0) {
                                source.selectedData = source.filterData[0]["sourceId"];
                                source.sortOrder = source.filterData[0]["minYear"];
                                source.childControlMappingId = source.filterData[0]["maxYear"];                                
                            }
                            else {
                                source.selectedData = 0;
                                source.sortOrder = 0;
                                source.childControlMappingId = 0;                                
                            }                            
                            //for default value end          
                            this.sourceList.push(source);
                            this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                            this.setSlider();
                        }
                        else {
                            let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.multiSelectValues[0] == x.cropId && this.geographySelected[0].indexOf(x.regionId) > -1 && (this.geographySelected[1].indexOf(x.territoryId) > -1 || x.territoryId == 0) && filterValue[filterValue.length - 1] == x.countryId && x["kpiId"] == this.parameterId);
                            for (let i = 0; i < sor.length; i++) {
                                if (flagSource[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource[sor[i].sourceId] = true;
                                source.filterData.push(sor[i]);
                            }
                            source.filterData = source.filterData.filter((x: any) => x.sourceId != 0)
                            source.filterData.sort((a, b) => {
                                if (a["sourceName"] < b["sourceName"]) return -1;
                                else if (a["sourceName"] > b["sourceName"]) return 1;
                                else return 0;
                            });

                            //for default value start //sortOrder=min  //childControlMappingId= max
                            let defaultValue: any = source.filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                            if (defaultValue.length > 0) {
                                source.selectedData = defaultValue[0]["defaultSourceId"];
                                source.sortOrder = defaultValue[0]["minYear"];
                                source.childControlMappingId = defaultValue[0]["maxYear"];
                                //added for recommended
                                let index: number = (source.filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                                if (!source.filterData[index]["sourceName"].includes("recommended"))
                                source.filterData[index]["sourceName"] = source.filterData[index]["sourceName"] + " (recommended)";

                            }
                            else if (source.filterData.length > 0) {
                                source.selectedData = source.filterData[0]["sourceId"];
                                source.sortOrder = source.filterData[0]["minYear"];
                                source.childControlMappingId = source.filterData[0]["maxYear"];                                
                            }
                            else {
                                source.selectedData = 0;
                                source.sortOrder = 0;
                                source.childControlMappingId = 0;                                
                            }
                            //for default value end          
                            this.sourceList.push(source);
                            this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                            this.setSlider();
                        }
                    }

                }
                else if (this.geographySelected[2].length > 0) {
                    this.sourceList = this.sourceList.filter(x => this.geographySelected[2].indexOf(x.id) > -1 && x.filterType == "country");
                    this.setSlider();
                    //newly added
                    let SourceNames: any[] = [];
                    for (let name of this.sourceList) {
                        SourceNames.push(name.filterName);
                    }
                    let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue2["filterName"] = 'List';
                    selectedValue2["selectedData"] = SourceNames;
                    selectedValue2["filterType"] = this.sourceList[0].filterType;
                    this.selectedValueEmit.emit(selectedValue2);
                }
                else if (this.geographySelected[1].length > 0 && (filterName == "Territory" || filterName == "Country")) {
                    var flagSource: any = [];
                    //removing extra source dropdown
                    this.sourceList = this.sourceList.filter(x => x.filterType == "territory");
                    if (this.sourceList.length > this.geographySelected[1].length) {
                        this.sourceList = this.sourceList.filter(x => this.geographySelected[1].indexOf(x.id) > -1 && x.filterType == "territory");
                        this.setSlider();
                        //newly added
                        let SourceNames: any[] = [];
                        for (let name of this.sourceList) {
                            SourceNames.push(name.filterName);
                        }
                        let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue2["filterName"] = 'List';
                        selectedValue2["selectedData"] = SourceNames;
                        selectedValue2["filterType"] = this.sourceList[0].filterType;
                        this.selectedValueEmit.emit(selectedValue2);
                    }
                    else if (filterName == "Country") {
                        for (let ter of this.geographySelected[1]) {
                            let flagSource2: any = [];
                            let source: IFilters = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            source.filterName = this.geography[1].filter(x => x.territoryId == ter)[0].territoryName;
                            source.id = ter;
                            if (this.geographySelected[1].length > 0) {
                                source.filterType = "territory";
                            }
                            source.filterData = [];
                            let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.multiSelectValues[0] == x.cropId && this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == ter && x.countryId == 0 && x["kpiId"] == this.parameterId);
                            for (let i = 0; i < sor.length; i++) {
                                if (flagSource2[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource2[sor[i].sourceId] = true;
                                source.filterData.push(sor[i]);
                            }
                            source.filterData = source.filterData.filter((x: any) => x.sourceId != 0)
                            source.filterData.sort((a, b) => {
                                if (a["sourceName"] < b["sourceName"]) return -1;
                                else if (a["sourceName"] > b["sourceName"]) return 1;
                                else return 0;
                            });

                            //for default value start //sortOrder=min  //childControlMappingId= max
                            let defaultValue: any = source.filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                            if (defaultValue.length > 0) {
                                source.selectedData = defaultValue[0]["defaultSourceId"];
                                source.sortOrder = defaultValue[0]["minYear"];
                                source.childControlMappingId = defaultValue[0]["maxYear"];
                                //added for recommended
                                let index: number = (source.filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                                if (!source.filterData[index]["sourceName"].includes("recommended"))
                                source.filterData[index]["sourceName"] = source.filterData[index]["sourceName"] + " (recommended)";

                            }
                            else if (source.filterData.length > 0) {
                                source.selectedData = source.filterData[0]["sourceId"];
                                source.sortOrder = source.filterData[0]["minYear"];
                                source.childControlMappingId = source.filterData[0]["maxYear"];                                
                            }
                            else {
                                source.selectedData = 0;
                                source.sortOrder = 0;
                                source.childControlMappingId = 0;                                
                            }
                            //for default value end          
                            this.sourceList.push(source);
                            this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                            this.setSlider();
                        }
                    }
                    else {
                        let source: IFilters = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        source.filterName = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].label;
                        source.id = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].value;
                        if (this.geographySelected[1].length > 0) {
                            source.filterType = "territory";
                        }
                        source.filterData = [];
                        let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.multiSelectValues[0] == x.cropId && this.geographySelected[0].indexOf(x.regionId) > -1 && filterValue[filterValue.length - 1] == x.territoryId && x.countryId == 0 && x["kpiId"] == this.parameterId);
                        for (let i = 0; i < sor.length; i++) {
                            if (flagSource[sor[i].sourceId]) {
                                continue;
                            }
                            flagSource[sor[i].sourceId] = true;
                            source.filterData.push(sor[i]);
                        }
                        source.filterData = source.filterData.filter((x: any) => x.sourceId != 0)
                        source.filterData.sort((a, b) => {
                            if (a["sourceName"] < b["sourceName"]) return -1;
                            else if (a["sourceName"] > b["sourceName"]) return 1;
                            else return 0;
                        });
                        //for default value start //sortOrder=min  //childControlMappingId= max
                        let defaultValue: any = source.filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                        if (defaultValue.length > 0) {
                            source.selectedData = defaultValue[0]["defaultSourceId"];
                            source.sortOrder = defaultValue[0]["minYear"];
                            source.childControlMappingId = defaultValue[0]["maxYear"];
                            //added for recommended
                            let index: number = (source.filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                            if (!source.filterData[index]["sourceName"].includes("recommended"))
                            source.filterData[index]["sourceName"] = source.filterData[index]["sourceName"] + " (recommended)";

                        }
                        else if (source.filterData.length > 0) {
                            source.selectedData = source.filterData[0]["sourceId"];
                            source.sortOrder = source.filterData[0]["minYear"];
                            source.childControlMappingId = source.filterData[0]["maxYear"];                            
                        }
                        else {
                            source.selectedData = 0;
                            source.sortOrder = 0;
                            source.childControlMappingId = 0;                            
                        }
                        //for default value end          
                        this.sourceList.push(source);
                        this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                        this.setSlider();
                    }
                }
                else if (this.geographySelected[1].length > 0) {
                    this.sourceList = this.sourceList.filter(x => this.geographySelected[1].indexOf(x.id) > -1 && x.filterType == "territory");
                    this.setSlider();
                    let SourceNames: any[] = [];
                    for (let name of this.sourceList) {
                        SourceNames.push(name.filterName);
                    }
                    let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue2["filterName"] = 'List';
                    selectedValue2["selectedData"] = SourceNames;
                    selectedValue2["filterType"] = this.sourceList[0].filterType;
                    this.selectedValueEmit.emit(selectedValue2);
                }
                else if (this.geographySelected[0].length > 0) {
                    var flagSource: any = [];
                    //removing extra source dropdown
                    this.sourceList = this.sourceList.filter(x => x.filterType == "region");
                    if (this.sourceList.length > this.geographySelected[0].length) {
                        this.sourceList = this.sourceList.filter(x => this.geographySelected[0].indexOf(x.id) > -1 && x.filterType == "region");
                        this.setSlider();
                        let SourceNames: any[] = [];
                        for (let name of this.sourceList) {
                            SourceNames.push(name.filterName);
                        }
                        let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue2["filterName"] = 'List';
                        selectedValue2["selectedData"] = SourceNames;
                        selectedValue2["filterType"] = this.sourceList[0].filterType;
                        this.selectedValueEmit.emit(selectedValue2);
                    }
                    else if (filterName == "Territory" || filterName == "Country") {
                        for (let reg of this.geographySelected[0]) {
                            let flagSource2: any = [];
                            let source: IFilters = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            source.filterName = this.geography[0].filter(x => x.regionId == reg)[0].regionName;
                            source.id = reg;
                            if (this.geographySelected[0].length > 0) {
                                source.filterType = "region";
                            }
                            source.filterData = [];
                            let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.multiSelectValues[0] == x.cropId && reg == x.regionId && x.territoryId == 0 && x.countryId == 0 && x["kpiId"] == this.parameterId);
                            for (let i = 0; i < sor.length; i++) {
                                if (flagSource2[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource2[sor[i].sourceId] = true;
                                source.filterData.push(sor[i]);
                            }
                            source.filterData = source.filterData.filter((x: any) => x.sourceId != 0)
                            source.filterData.sort((a, b) => {
                                if (a["sourceName"] < b["sourceName"]) return -1;
                                else if (a["sourceName"] > b["sourceName"]) return 1;
                                else return 0;
                            });
                            //for default value start //sortOrder=min  //childControlMappingId= max
                            let defaultValue: any = source.filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                            if (defaultValue.length > 0) {
                                source.selectedData = defaultValue[0]["defaultSourceId"];
                                source.sortOrder = defaultValue[0]["minYear"];
                                source.childControlMappingId = defaultValue[0]["maxYear"];
                                //added for recommended
                                let index: number = (source.filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                                if (!source.filterData[index]["sourceName"].includes("recommended"))
                                source.filterData[index]["sourceName"] = source.filterData[index]["sourceName"] + " (recommended)";

                            }
                            else if (source.filterData.length > 0) {
                                source.selectedData = source.filterData[0]["sourceId"];
                                source.sortOrder = source.filterData[0]["minYear"];
                                source.childControlMappingId = source.filterData[0]["maxYear"];                                
                            }
                            else {
                                source.selectedData = 0;
                                source.sortOrder = 0;
                                source.childControlMappingId = 0;                                
                            }                            
                            //for default value end          
                            this.sourceList.push(source);
                            this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                            this.setSlider();
                        }
                    }
                    else {
                        let source: IFilters = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        source.filterName = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].label;
                        source.id = filterObjects.filter((x: any) => x.value == filterValue[filterValue.length - 1])[0].value;
                        if (this.geographySelected[0].length > 0) {
                            source.filterType = "region";
                        }
                        source.filterData = [];
                        let sor: IFilterRelation[] = this.filtersRelationList.filter(x => this.multiSelectValues[0] == x.cropId && filterValue[filterValue.length - 1] == x.regionId && x.territoryId == 0 && x.countryId == 0 && x["kpiId"] == this.parameterId);
                        for (let i = 0; i < sor.length; i++) {
                            if (flagSource[sor[i].sourceId]) {
                                continue;
                            }
                            flagSource[sor[i].sourceId] = true;
                            source.filterData.push(sor[i]);
                        }
                        source.filterData = source.filterData.filter((x: any) => x.sourceId != 0)
                        source.filterData.sort((a, b) => {
                            if (a["sourceName"] < b["sourceName"]) return -1;
                            else if (a["sourceName"] > b["sourceName"]) return 1;
                            else return 0;
                        });
                        //for default value start //sortOrder=min  //childControlMappingId= max
                        let defaultValue: any = source.filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                        if (defaultValue.length > 0) {
                            source.selectedData = defaultValue[0]["defaultSourceId"];
                            source.sortOrder = defaultValue[0]["minYear"];
                            source.childControlMappingId = defaultValue[0]["maxYear"];
                            //added for recommended
                            let index: number = (source.filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                            if (!source.filterData[index]["sourceName"].includes("recommended"))
                            source.filterData[index]["sourceName"] = source.filterData[index]["sourceName"] + " (recommended)";

                        }
                        else if (source.filterData.length > 0) {
                            source.selectedData = source.filterData[0]["sourceId"];
                            source.sortOrder = source.filterData[0]["minYear"];
                            source.childControlMappingId = source.filterData[0]["maxYear"];                            
                        }
                        else {
                            source.selectedData = 0;
                            source.sortOrder = 0;
                            source.childControlMappingId = 0;                            
                        }
                        //for default value end          
                        this.sourceList.push(source);
                        this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                        this.setSlider();
                    }
                }
                else {
                    this.sourceList = [];
                }
            }
        }
    }

    onSourceChange(filterValue: any, filterName: string, filterObjects: any, type: string): void {
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["filterType"] = 'Source';
        selectedValue["filterData"] = filterObjects.filterData;
        selectedValue["selectedData"] = filterValue;
        this.selectedValueEmit.emit(selectedValue);

        if (filterValue > 0 && type == 'html') {
            let sourceObject: IFilterRelation[] = filterObjects.filterData.filter((x: any) => x.sourceId == filterValue);
            //let sourceMap: IFilters[] = this.sourceList.filter(x => x.filterName == filterName);        
            let index: number = (this.sourceList as any).findIndex((x: any) => x['filterName'] == filterName);
            this.sourceList[index].childControlMappingId = +sourceObject[0].maxYear;
            this.sourceList[index].sortOrder = +sourceObject[0].minYear;
            this.setSlider();
        }

        let SourceNames: any[] = [];
        for (let name of this.sourceList) {
            SourceNames.push(name.filterName);
        }
        let selectedValue2: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue2["filterName"] = 'List';
        selectedValue2["selectedData"] = SourceNames;
        selectedValue2["filterType"] = this.sourceList[0].filterType;
        this.selectedValueEmit.emit(selectedValue2);
    }
    setSlider(): void {
        let filterSlider: IFilters[] = this.sourceList.map(x => Object.assign({}, x));
        let filterSliders: IFilters[] = filterSlider.filter((x: any) => x.childControlMappingId != 0 && x.sortOrder != 0);
        if (filterSliders.length > 0) {
            this.sliderMaxValue = Math.max.apply(Math, filterSliders.map(function (o) { return o.childControlMappingId; }));
            this.sliderMinValue = Math.min.apply(Math, filterSliders.map(function (o) { return o.sortOrder; }));
            this.submitVisible.emit(false);
        }
        else {
            this.submitVisible.emit(true);
        }
    }
    onOverViewSourceDropdownChange(filterValue: any, filterName: string, filterObjects: any, type: string): void {
        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["selectedData"] = filterValue;
        selectedValue["filterType"] = 'Source';
        this.selectedValueEmit.emit(selectedValue);

        if (filterValue > 0 && type == 'html') {
            let sourceObject: IFilterRelation[] = filterObjects.filterData.filter((x: any) => x.sourceId == filterValue);
            let index: number = (this.multipleSourceData as any).findIndex((x: any) => x['filterName'] == filterName);
            this.multipleSourceData[index].childControlMappingId = +sourceObject[0].maxYear;
            this.multipleSourceData[index].sortOrder = +sourceObject[0].minYear;
            this.setOverViewSlider();
        }

    }
    setOverViewSlider(): void {
        let filterSlider: IFilters[] = this.multipleSourceData.map(x => Object.assign({}, x));
        let filterSliders: IFilters[] = filterSlider.filter((x: any) => x.childControlMappingId != 0 && x.sortOrder != 0);
        if (filterSliders.length > 0) {
            this.sliderMaxValue = Math.max.apply(Math, filterSliders.map(function (o) { return o.childControlMappingId; }));
            this.sliderMinValue = Math.min.apply(Math, filterSliders.map(function (o) { return o.sortOrder; }));
            this.submitVisible.emit(false);
        }
        else {
            this.submitVisible.emit(true);
        }        
    }

    ngAfterViewInit(): void {
        for (let entry of this.filtersList) {
            if (entry.filterType.toLocaleLowerCase() === 'slidery') {
                if (this.sliderYear && entry.isVisible === true) {
                    this.renderer.setElementStyle(this.sliderYear.nativeElement, 'display', 'block');
                }
                else {
                    this.renderer.setElementStyle(this.sliderYear.nativeElement, 'display', 'none');
                }


                if (this.cascadeDependency == "default") {
                    let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = "PeriodYear";
                    selectedValue["selectedData"] = entry.filterData[0]["defaultValue"];
                    this.selectedValueEmit.emit(selectedValue);
                }
                else if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
                    if (this.cascadeDependency != "crop") {
                        var sliderData: IFilterRelation[] = this.filtersRelationList.filter(x => x["cropId"] == this.cropId && x["regionId"] == this.level1DefaultSelected && x.sourceId == this.sourceDefaultSelected && x.territoryId == 0 && x.countryId == 0);
                        if (sliderData.length > 0) {
                            this.sliderMinValue = +sliderData[0].minYear;
                            this.sliderMaxValue = +sliderData[0].maxYear;
                            this.sliderSelected = sliderData[0].defaultValue;

                        }
                        else {
                            this.sliderMinValue = entry.filterData[0]['minValue'];
                            this.sliderMaxValue = entry.filterData[0]['maxValue'];
                            this.sliderSelected = entry.filterData[0]['defaultValue'];
                        }
                    }
                    else if (this.cascadeDependency == "crop") {
                        let filterSlider: IFilters[] = this.multipleSourceData.map(x => Object.assign({}, x));
                        let filterSliders: IFilters[] = filterSlider.filter((x: any) => x.childControlMappingId != 0 && x.sortOrder != 0);
                        if (filterSliders.length > 0) {
                            this.sliderMaxValue = Math.max.apply(Math, filterSliders.map(function (o) { return o.childControlMappingId; }));
                            this.sliderMinValue = Math.min.apply(Math, filterSliders.map(function (o) { return o.sortOrder; }));
                            this.sliderSelected = entry.filterData[0]['defaultValue'];
                        }
                        else {
                            this.sliderMinValue = entry.filterData[0]['minValue'];
                            this.sliderMaxValue = entry.filterData[0]['maxValue'];
                            this.sliderSelected = entry.filterData[0]['defaultValue'];
                        }

                    }
                    let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = "PeriodYear";
                    selectedValue["selectedData"] = this.sliderSelected;
                    this.selectedValueEmit.emit(selectedValue);
                }
                else if (this.cascadeDependency == "cropComparison") {

                    this.sliderMinValue = entry.filterData[0]['minValue'];
                    this.sliderMaxValue = entry.filterData[0]['maxValue'];
                    this.sliderSelected = entry.filterData[0]['defaultValue'];
                    this.defaultsliderMinValue = this.sliderMinValue;
                    this.defaultsliderMaxValue = this.sliderMaxValue;
                    this.defaultsliderSelected = this.sliderSelected;

                    let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = "PeriodYear";
                    selectedValue["selectedData"] = this.sliderSelected;
                    this.selectedValueEmit.emit(selectedValue);
                }


            }
            else if (entry.filterType.toLocaleLowerCase() === 'sliderq') {
                if (this.sliderQuarter && entry.isVisible === true) {
                    this.renderer.setElementStyle(this.sliderQuarter.nativeElement, 'display', 'block');
                }
                else {
                    this.renderer.setElementStyle(this.sliderQuarter.nativeElement, 'display', 'none');
                }
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = "PeriodQuarter";
                selectedValue["selectedData"] = entry.filterData[0]["defaultValue"];
                this.selectedValueEmit.emit(selectedValue);
            }
            else if (entry.filterType.toLocaleLowerCase() === 'monthlydropdowns') {
                if (this.monthlyDropdowns && entry.isVisible === true) {
                    this.renderer.setElementStyle(this.monthlyDropdowns.nativeElement, 'display', 'block');
                }
                else {
                    this.renderer.setElementStyle(this.monthlyDropdowns.nativeElement, 'display', 'none');
                }
                for (let en of entry.filterData) {
                    let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = en["filterName"];
                    if (en["selectedData"])
                        selectedValue["selectedData"] = en["selectedData"];
                    else
                        selectedValue["selectedData"] = en["filterData"][0]["labelId"];
                    if (en["filterName"].toLocaleLowerCase() == "from year")
                        this.monthly[0] = + selectedValue["selectedData"];
                    else if (en["filterName"].toLocaleLowerCase() == "from month" || en["filterName"].toLocaleLowerCase() == "from quarter")
                        this.monthly[1] = + selectedValue["selectedData"];
                    else if (en["filterName"].toLocaleLowerCase() == "to year")
                        this.monthly[2] = + selectedValue["selectedData"];
                    else if (en["filterName"].toLocaleLowerCase() == "to month" || en["filterName"].toLocaleLowerCase() == "to quarter")
                        this.monthly[3] = + selectedValue["selectedData"];

                    this.selectedValueEmit.emit(selectedValue);
                    this.selectedValueEmit.emit(selectedValue);
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdown' || entry.filterType.toLocaleLowerCase() === 'dropdownparent') {
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = entry.filterName;
                if (entry.filterName.toLocaleLowerCase() == 'crop') {
                    if (entry.selectedData) {
                        selectedValue["selectedData"] = entry.selectedData;
                        selectedValue["filterData"] = entry.filterData.filter(x => x["labelId"] == +entry.selectedData);
                    }
                    else {

                        selectedValue["selectedData"] = GlobalUtil.getSession("CropId");
                        this.cropId = GlobalUtil.getSession("CropId");
                        selectedValue["filterData"] = entry.filterData.filter(x => x["labelId"] == +this.cropId);
                    }
                }
                else if (entry.filterName.toLocaleLowerCase() == 'source' && this.cascadeDependency != "default") {
                    if (this.sourceDefaultSelected) {
                        selectedValue["selectedData"] = +this.sourceDefaultSelected;
                        selectedValue["filterData"] = entry.filterData.filter(x => x["sourceId"] == +this.sourceDefaultSelected);
                    }
                    else {
                        selectedValue["selectedData"] = +this.sourceDefaultSelected;
                    }
                }
                //added for parameter cascading
                else if (entry.filterName.toLocaleLowerCase() == 'parameter' && this.filtersRelationList.length > 0) {
                    this.multiSelectList = [];
                    var flags: any = [];
                    if (entry.selectedData) {
                        this.parameterId = +entry.selectedData;
                        selectedValue["selectedData"] = entry.selectedData;
                        selectedValue["filterData"] = entry.filterData.filter(x => x["labelId"] == +entry.selectedData);
                    }
                    else {
                        this.parameterId = +entry.filterData[0]["labelId"];
                        selectedValue["selectedData"] = entry.filterData[0]["labelId"];
                        selectedValue["filterData"] = entry.filterData.filter(x => x["labelId"] == +entry.filterData[0]["labelId"]);
                    }
                    let reg: IFilterRelation[] = this.filtersRelationList.filter(y => y["kpiId"] == this.parameterId);
                    for (let i = 0; i < reg.length; i++) {
                        if (flags[reg[i].cropId]) {
                            continue;
                        }
                        flags[reg[i].cropId] = true;
                        this.multiSelectList.push(reg[i]);
                    }
                    this.multiSelectList.sort((a, b) => {
                        if (a["cropName"] < b["cropName"]) return -1;
                        else if (a["cropName"] > b["cropName"]) return 1;
                        else return 0;
                    });
                    for (let i = 0; i < this.multiSelectList.length; i++) {
                        this.multiSelectList[i].label = this.multiSelectList[i].cropName;
                        this.multiSelectList[i].value = this.multiSelectList[i].cropId;
                        //delete this.geography[0][i].regionName;
                    }

                }
                else {
                    if (entry.selectedData) {
                        selectedValue["selectedData"] = entry.selectedData;
                        selectedValue["filterData"] = entry.filterData.filter(x => x["labelId"] == +entry.selectedData);
                    }
                    else {
                        selectedValue["selectedData"] = entry.filterData[0]["labelId"];
                        selectedValue["filterData"] = entry.filterData.filter(x => x["labelId"] == +entry.filterData[0]["labelId"]);
                    }
                }
                this.selectedValueEmit.emit(selectedValue);
                if (this.childdropdown) {
                    this.renderer.setElementStyle(this.childdropdown.nativeElement, 'display', 'none');
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'radiobutton' || entry.filterType.toLocaleLowerCase() === 'radiobuttonstatic') {
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = entry.filterName;
                selectedValue["selectedData"] = entry.selectedData;

                if (entry.filterName.toLocaleLowerCase() === 'choose via') {
                    this.cropComparison = entry.selectedData;
                    if (this.cropComparison == "Crop") {
                        this.multiselectlimit = 5;
                        this.geographylimit = 1;
                    }
                    else if (this.cropComparison == "Geography") {
                        this.multiselectlimit = 1;
                        this.geographylimit = 5;
                    }
                }
                this.selectedValueEmit.emit(selectedValue);
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdownmultiplesource') {
                for (let i = 0; i < this.multipleSourceData.length; i++) {
                    let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = this.multipleSourceData[i].filterName;
                    //selectedValue["selectedData"] = this.sourceOverViewDefault[i];
                    selectedValue["selectedData"] = this.multipleSourceData[i].selectedData;
                    selectedValue["filterType"] = 'Source';
                    this.selectedValueEmit.emit(selectedValue);
                }
            }
        }
    }
    ngOnChanges(): void {
        //console.log(this.filtersList);
        if (this.filtersRelationList != null) {
            if (this.filtersRelationList.length > 0) {
                if (this.filtersRelationList[0].cropId > 0)
                    this.cascadeDependency = "crop";
                else if (this.filtersRelationList[0].cropId == 0) {
                    if (this.filtersRelationList[0].sourceId == 0)
                        this.cascadeDependency = "regionminussource";
                    else
                        this.cascadeDependency = "region";
                }
            }
            else {
                this.cascadeDependency = "default";
            }
        }
        for (let ent of this.filtersList) {
            if (ent.filterType.toLocaleLowerCase() === 'dropdown') {
                if (ent.filterName.toLocaleLowerCase() == 'crop') {
                    if (ent.selectedData) {
                        this.cropId = +ent.selectedData;
                    }
                    else {
                        this.cropId = GlobalUtil.getSession("CropId");
                    }
                }
            }

            //for dropdownMultipleSource
            if (ent.filterType.toLocaleLowerCase() === 'dropdownmultiplesource') {
                this.multipleSourceData = ent.filterData as any;
            }
        }
        for (let entry of this.filtersList) {
            if (entry.filterType.toLocaleLowerCase() === 'multiselect') {
                //newly added
                this.multiSelectList = entry.filterData;
                if (entry.filterName.toLocaleLowerCase() == 'crop') {
                    if (entry.selectedData) {
                        if (entry.selectedData.toLocaleLowerCase() == "session") {
                            let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            selectedValue["filterName"] = entry.filterName;
                            selectedValue["selectedData"] = [+GlobalUtil.getSession("CropId")];
                            this.selectedValueEmit.emit(selectedValue);
                            this.multiSelectValues = [+GlobalUtil.getSession("CropId")];                            
                        }
                    }

                }
                else if (entry.selectedData) {
                    this.multiSelectValues = [+entry.selectedData];
                    let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = entry.filterName;
                    selectedValue["selectedData"] = [+entry.selectedData];
                    this.selectedValueEmit.emit(selectedValue);
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'geographycascademultiselects') {
                this.sliderMinValue = 2000;
                this.sliderMaxValue = 2030;
                this.sliderSelected = [2012, 2016];
                this.cascadeDependency = "priceComparison";
                let checkArray: IFilterRelation[] = this.filtersRelationList.filter(x => x.kpiId == 48);
                if (this.filtersRelationList.length !== checkArray.length) {
                    this.cascadeDependency = "cropComparison";
                }
                for (var i = this.filtersRelationList.length; i--;) {
                    if (this.filtersRelationList[i] !== checkArray[i]) {
                        this.cascadeDependency = "cropComparison";
                        break;
                    }
                }

                for (let en of entry.filterData ? entry.filterData : []) {
                    if (en["filterName"].toLocaleLowerCase() == "region") {
                        this.geographyFullData[0] = en["filterData"];
                        //commented for crop cascading
                        if (en["selectedData"]) {
                            this.geographySelected[0] = [+en["selectedData"]];
                        }
                        else {
                            this.geographySelected[0] = [];
                        }
                        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue["filterName"] = en["filterName"];
                        selectedValue["selectedData"] = this.geographySelected[0];
                        this.selectedValueEmit.emit(selectedValue);                        
                    }
                    if (en["filterName"].toLocaleLowerCase() == "territory") {
                        this.geographyFullData[1] = en["filterData"];
                        if (en["selectedData"]) {
                            this.geographySelected[1] = [+en["selectedData"]];
                        }
                        else {
                            this.geographySelected[1] = [];
                        }

                        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue["filterName"] = en["filterName"];
                        selectedValue["selectedData"] = this.geographySelected[1];
                        this.selectedValueEmit.emit(selectedValue);                       
                    }
                    if (en["filterName"].toLocaleLowerCase() == "country") {
                        this.geographyFullData[2] = en["filterData"];
                        if (en["selectedData"]) {
                            this.geographySelected[2] = [+en["selectedData"]];
                        }
                        else {
                            this.geographySelected[2] = [];
                        }
                        let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue["filterName"] = en["filterName"];
                        selectedValue["selectedData"] = this.geographySelected[2];
                        this.selectedValueEmit.emit(selectedValue);                        
                    }
                }
                if (this.cascadeDependency == "priceComparison") {
                    this.parameterId = 48;
                    this.regionId = GlobalUtil.getAppSession("UserInfo").regionId;
                    this.geography[0] = [];
                    this.geographySelected[0] = [];

                    //adding source on the basis crop Id seession
                    let source: IFilters = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    source.filterName = GlobalUtil.getSession("CropName");
                    source.id = +GlobalUtil.getSession("CropId");
                    source.filterData = [];
                    source.selectedData = 0;
                    this.sourceList.push(source);
                    this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                    //adding source on the basis crop Id seession

                    var flags: any = [];
                    //cloning problem
                    let cloned: IFilterRelation[] = this.filtersRelationList.map(x => Object.assign({}, x));
                    let reg: IFilterRelation[] = cloned.filter(y => y["cropId"] == GlobalUtil.getSession("CropId") && y["kpiId"] == 48);
                    for (let i = 0; i < reg.length; i++) {
                        if (flags[reg[i].regionId]) {
                            if (reg[i].regionShade == '0') {
                                let index: number = (this.geography[0] as any).findIndex((x: any) => x['regionId'] == reg[i].regionId);
                                if (index >= 0) {
                                    this.geography[0][index]['regionShade'] == '0';
                                }
                            }
                            continue;
                        }
                        flags[reg[i].regionId] = true;
                        this.geography[0].push(reg[i]);                        
                    }
                    this.geography[0].sort((a, b) => {
                        if (a["regionName"] < b["regionName"]) return -1;
                        else if (a["regionName"] > b["regionName"]) return 1;
                        else return 0;
                    });

                    //check user session region exist in region multiselect 
                    let present: boolean = false;
                    for (let i = 0; i < this.geography[0].length; i++) {
                        this.geography[0][i].label = this.geography[0][i].regionName;
                        this.geography[0][i].value = this.geography[0][i].regionId;
                        //delete this.geography[0][i].regionName;
                        if (this.geography[0][i].value == this.regionId) {
                            present = true;
                            this.geographySelected[0].push(this.regionId);
                        }
                    }
                    this.onChangeGeographyMultiSelect(this.geographySelected[0], "Region", this.geography[0]);
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdownlevel1') {
                var level1selectedId: any = 0;
                this.regionId = GlobalUtil.getAppSession("UserInfo").regionId;
                if (this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
                    this.cropId = 0;
                }

                if (this.cascadeDependency == 'default') {
                    if (entry.selectedData)
                        level1selectedId = +entry.selectedData;
                    else
                        level1selectedId = entry.filterData[0]["labelId"];

                    this.level1fullData = entry.filterData;
                    this.level1filterData = entry.filterData;
                    //var level1selectedId = [+entry.selectedData];
                }
                else if (this.cascadeDependency == 'crop' || this.cascadeDependency == 'region' || this.cascadeDependency == "regionminussource") {
                    this.level1fullData = entry.filterData;
                    this.level1filterData = [];
                    var fullData: any = this.filtersRelationList.filter(x => x["cropId"] == this.cropId);
                    var flags: any = []
                    for (let i = 0; i < fullData.length; i++) {
                        if (flags[fullData[i].regionId]) continue;
                        flags[fullData[i].regionId] = true;
                        this.level1filterData.push(fullData[i]);
                    }
                    this.level1filterData.sort((a, b) => {
                        if (a["regionName"] < b["regionName"]) return -1;
                        else if (a["regionName"] > b["regionName"]) return 1;
                        else return 0;
                    });

                    if (this.level1filterData.filter(x => x["regionId"] == this.regionId).length > 0)
                        level1selectedId = this.regionId;
                    else if (this.level1filterData.length > 0)
                        //level1selectedId = this.level1filterData[0]["regionId"];
                        level1selectedId = 0;
                    this.level1DefaultSelected = +level1selectedId;

                    //fullTerritoryData
                    var fullTerritoryData: any;
                    fullTerritoryData = fullData.filter((x: any) => x.regionId == level1selectedId);
                }
                let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = entry.filterName;
                selectedValue["selectedData"] = +level1selectedId;
                selectedValue["filterData"] = entry.filterData.filter(x => x["labelId"] == +level1selectedId);
                this.selectedValueEmit.emit(selectedValue);
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdownlevel2') {
                this.level2fullData = entry.filterData;
                this.dropdownlevel2FilterName = entry.filterName;
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdownlevel3') {
                this.level3fullData = entry.filterData;
                this.dropdownlevel3FilterName = entry.filterName;
            }
        }
        var level2selectedId: number = 0;
        if (this.level2fullData.length > 0) {
            if (this.cascadeDependency == 'default') {
                this.level2filterData = this.level2fullData.filter(x => x["parent1Id"] == level1selectedId);
                if (this.level2filterData.length > 0)
                    level2selectedId = this.level2filterData[0]["labelId"];
            }
            else if (this.cascadeDependency == 'crop' || this.cascadeDependency == 'region' || this.cascadeDependency == "regionminussource") {
                this.level2filterData = [];
                var ters: any = [];
                //var fullTerritoryData: any;
                //fullTerritoryData = fullData.filter((x: any) => x.regionId == level1selectedId); 
                for (let i = 0; i < fullTerritoryData.length; i++) {
                    if (ters[fullTerritoryData[i].territoryId]) continue;
                    ters[fullTerritoryData[i].territoryId] = true;
                    this.level2filterData.push(fullTerritoryData[i]);
                }
                this.level2filterData = this.level2filterData.filter((x: any) => x.territoryId != 0)
                this.level2filterData.sort((a, b) => {
                    if (a["territoryName"] < b["territoryName"]) return -1;
                    else if (a["territoryName"] > b["territoryName"]) return 1;
                    else return 0;
                });
                if (this.level2filterData.length > 0)
                    level2selectedId = this.level2filterData[0]["territoryId"];
            }
            let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = this.dropdownlevel2FilterName;
            //selectedValue["selectedData"] = +level2selectedId;
            selectedValue["selectedData"] = 0;
            this.selectedValueEmit.emit(selectedValue);
        }
        if (this.level3fullData.length > 0) {
            if (this.cascadeDependency == 'default') {
                this.level3filterData = this.level3fullData.filter(x => x["parent1Id"] == level1selectedId);
            }
            else if (this.cascadeDependency == 'crop' || this.cascadeDependency == 'region' || this.cascadeDependency == "regionminussource") {
                var conts: any = [];
                var fullCountryData2: any;
                fullCountryData2 = fullTerritoryData;
                fullCountryData2 = fullCountryData2.filter((x: any) => x.territoryId == 0)
                for (let i = 0; i < fullCountryData2.length; i++) {
                    if (conts[fullCountryData2[i].countryId]) continue;
                    conts[fullCountryData2[i].countryId] = true;
                    this.level3filterData.push(fullCountryData2[i]);
                }
                this.level3filterData = this.level3filterData.filter((x: any) => x.countryId != 0)
                this.level3filterData.sort((a, b) => {
                    if (a["countryName"] < b["countryName"]) return -1;
                    else if (a["countryName"] > b["countryName"]) return 1;
                    else return 0;
                });

                //added for source
                if (this.cascadeDependency != "crop") {
                    var fullSourceData: any = fullTerritoryData;
                    fullSourceData = fullSourceData.filter((x: any) => x.territoryId == 0 && x.countryId == 0)
                    var src: any = []
                    for (let i = 0; i < fullSourceData.length; i++) {
                        if (src[fullSourceData[i].sourceId]) continue;
                        src[fullSourceData[i].sourceId] = true;
                        this.sourceData.push(fullSourceData[i]);
                    }
                    this.sourceData = this.sourceData.filter((x: any) => x.sourceId != 0)
                    this.sourceData.sort((a, b) => {
                        if (a["sourceName"] < b["sourceName"]) return -1;
                        else if (a["sourceName"] > b["sourceName"]) return 1;
                        else return 0;
                    });
                    if (this.sourceData.length > 0)
                        this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                    else
                        this.sourceDefaultSelected = 0;

                    //forSliderHtmlload
                    var sliderData: IFilterRelation[] = this.filtersRelationList.filter(x => x["cropId"] == this.cropId && x["regionId"] == this.level1DefaultSelected && x.sourceId == this.sourceDefaultSelected && x.territoryId == 0 && x.countryId == 0);
                    if (sliderData.length > 0) {
                        this.sliderMinValue = +sliderData[0].minYear;
                        this.sliderMaxValue = +sliderData[0].maxYear;
                        this.sliderSelected = sliderData[0].defaultValue;
                    }
                    else {
                        this.sliderMinValue = 2000;
                        this.sliderMaxValue = 2020;
                        this.sliderSelected = [2012, 2016];
                    }
                }
                else if (this.cascadeDependency == "crop") {
                    for (let i = 0; i < this.multipleSourceData.length; i++) {
                        var fullSourceData: any = fullTerritoryData;
                        fullSourceData = fullSourceData.filter((x: any) => x.territoryId == 0 && x.countryId == 0 && x.widgetName == this.multipleSourceData[i].filterName);
                        var src: any = []
                        for (let k = 0; k < fullSourceData.length; k++) {
                            if (src[fullSourceData[k].sourceId]) continue;
                            src[fullSourceData[k].sourceId] = true;
                            //this.sourceOverView[i].push(fullSourceData[i]);
                            this.multipleSourceData[i].filterData.push(fullSourceData[k]);
                        }
                        this.multipleSourceData[i].filterData = this.multipleSourceData[i].filterData.filter((x: any) => x.sourceId != 0)
                        this.multipleSourceData[i].filterData.sort((a, b) => {
                            if (a["sourceName"] < b["sourceName"]) return -1;
                            else if (a["sourceName"] > b["sourceName"]) return 1;
                            else return 0;
                        });
                        let defaultValue: any = this.multipleSourceData[i].filterData.filter((x: any) => x.defaultSourceId == x.sourceId);
                        if (defaultValue.length > 0) {
                            //this.sourceOverViewDefault[i] = defaultValue[0]["defaultSourceId"];
                            this.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                            this.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                            this.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];

                            //added for recommended
                            let index: number = (this.multipleSourceData[i].filterData as any).findIndex((x: any) => x["sourceId"] == defaultValue[0]["defaultSourceId"]);
                            if (!this.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                            this.multipleSourceData[i].filterData[index]["sourceName"] = this.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";

                        }
                        else if (this.multipleSourceData[i].filterData.length > 0) {
                            this.multipleSourceData[i].selectedData = this.multipleSourceData[i].filterData[0]["sourceId"];
                            this.multipleSourceData[i].sortOrder = this.multipleSourceData[i].filterData[0]["minYear"];
                            this.multipleSourceData[i].childControlMappingId = this.multipleSourceData[i].filterData[0]["maxYear"];
                        }
                        else {
                            this.multipleSourceData[i].selectedData = 0;
                            this.multipleSourceData[i].sortOrder = 0;
                            this.multipleSourceData[i].childControlMappingId = 0;
                        }                        
                    }
                    this.sliderMinValue = 2000;
                    this.sliderMaxValue = 2020;
                    this.sliderSelected = [2012, 2016];
                    this.setOverViewSlider();
                }
            }
            let selectedValue: IFilters = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = this.dropdownlevel3FilterName;
            //selectedValue["selectedData"] = +level3selectedId;
            selectedValue["selectedData"] = 0;
            this.selectedValueEmit.emit(selectedValue);
        }
        if (this.childdropdown) {
            this.renderer.setElementStyle(this.childdropdown.nativeElement, 'display', 'none');
        }
    }
}

