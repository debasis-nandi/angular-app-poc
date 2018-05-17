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
var global_util_1 = require('../../global/global.util');
var FilterComponent = (function () {
    function FilterComponent(renderer) {
        this.renderer = renderer;
        this.monthlyTypeHtml = 'default';
        this.cascadeDependency = "default";
        this.maxQuarterLimit = 8;
        this.filtersRelationList = [];
        this.selectedValueEmit = new core_1.EventEmitter();
        this.submitVisible = new core_1.EventEmitter();
        this.submitMessage = new core_1.EventEmitter();
        this.filterObject = [];
        this.multiSelectValues = [];
        this.multiSelectList = [];
        this.geographyFullData = [];
        this.geography = [];
        this.geographySelected = [];
        this.childDropdownObject = null;
        this.count = 0;
        this.monthly = [];
        this.tooltipYear = [true, true];
        this.tooltipQuarter = [true];
        this.radioValue = 'Yearly';
        this.isShow = true;
        this.level1DefaultSelected = 0;
        this.sourceDefaultSelected = 0;
        this.level2DefaultSelected = 0;
        this.level3DefaultSelected = 0;
        this.level1fullData = [];
        this.level1filterData = [];
        this.level2fullData = [];
        this.level2filterData = [];
        this.level3fullData = [];
        this.level3filterData = [];
        this.dropdownlevel2FilterName = null;
        this.dropdownlevel3FilterName = null;
        this.cropId = 0;
        this.regionId = 0;
        this.multiselectlimit = 5;
        this.geographylimit = 5;
        this.quarterSubmit = false;
        this.quarterSubmitMessage = '';
        this.sourceData = [];
        this.sourceOverView = [];
        this.sourceOverViewDefault = [];
        this.fullData = [];
        this.fullTerritoryData = [];
        this.sliderSelected = [];
        this.defaultsliderSelected = [];
        this.sourceList = [];
        this.parameterId = 0;
        this.multipleSourceData = [];
    }
    FilterComponent.prototype.onChange = function (filterValue, filterName) {
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["selectedData"] = filterValue;
        this.selectedValueEmit.emit(selectedValue);
    };
    FilterComponent.prototype.onDropdownChange = function (filterValue, filterObject1) {
        var _this = this;
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["selectedData"] = filterValue;
        selectedValue["filterData"] = filterObject1.filterData.filter(function (x) { return x["labelId"] == filterValue; });
        //selectedValue["childControlMappingId"] = filterObject1.filterData[filterValue - 1]["childControlMappingId"];
        //cascadeGeographyDropdowns
        if (filterObject1.filterName.toLocaleLowerCase() == "crop") {
            if (this.cascadeDependency == 'crop') {
                this.cropId = filterValue;
                this.level1filterData = [];
                this.level1DefaultSelected = 0;
                this.level2DefaultSelected = 0;
                this.level3DefaultSelected = 0;
                this.fullData = this.filtersRelationList.filter(function (x) { return x["cropId"] == filterValue; });
                var flags = [];
                for (var i = 0; i < this.fullData.length; i++) {
                    if (flags[this.fullData[i].regionId])
                        continue;
                    flags[this.fullData[i].regionId] = true;
                    this.level1filterData.push(this.fullData[i]);
                }
                this.level1filterData.sort(function (a, b) {
                    if (a["regionName"] < b["regionName"])
                        return -1;
                    else if (a["regionName"] > b["regionName"])
                        return 1;
                    else
                        return 0;
                });
                if (this.level1filterData.filter(function (x) { return x["regionId"] == _this.regionId; }).length > 0)
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
            var flags = [];
            var reg = this.filtersRelationList.filter(function (y) { return y["kpiId"] == filterValue; });
            for (var i = 0; i < reg.length; i++) {
                if (flags[reg[i].cropId]) {
                    continue;
                }
                flags[reg[i].cropId] = true;
                this.multiSelectList.push(reg[i]);
            }
            this.multiSelectList.sort(function (a, b) {
                if (a["cropName"] < b["cropName"])
                    return -1;
                else if (a["cropName"] > b["cropName"])
                    return 1;
                else
                    return 0;
            });
            for (var i = 0; i < this.multiSelectList.length; i++) {
                this.multiSelectList[i].label = this.multiSelectList[i].cropName;
                this.multiSelectList[i].value = this.multiSelectList[i].cropId;
            }
            //this.onChangeMultiSelect(this.multiSelectValues, "Crop", this.multiSelectList);
            this.geographySelected[0] = [];
            this.geographySelected[1] = [];
            this.geographySelected[2] = [];
            this.multiSelectValues = [];
            this.geography[1] = [];
            this.geography[2] = [];
            //added for cascading
            this.geography[0] = [];
            this.sourceList = [];
            this.submitVisible.emit(true);
        }
        this.selectedValueEmit.emit(selectedValue);
    };
    FilterComponent.prototype.onSourceDropdownChange = function (filterValue) {
        var _this = this;
        if (this.cascadeDependency == "crop" || this.cascadeDependency == "region") {
            var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = "Source";
            if (filterValue)
                selectedValue["selectedData"] = filterValue;
            else
                selectedValue["selectedData"] = 0;
            //selectedValue["filterData"] = filterObject1.filterData.filter(x => x["labelId"] == filterValue);
            this.selectedValueEmit.emit(selectedValue);
            var sliderData = this.filtersRelationList.filter(function (x) { return x["cropId"] == _this.cropId && x["regionId"] == _this.level1DefaultSelected && x.sourceId == filterValue && x.territoryId == _this.level2DefaultSelected && x.countryId == _this.level3DefaultSelected; });
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
            var sliderData = this.filtersRelationList.filter(function (x) { return x["cropId"] == _this.cropId && x["regionId"] == _this.level1DefaultSelected && x.sourceId == filterValue && x.territoryId == _this.level2DefaultSelected && x.countryId == _this.level3DefaultSelected; });
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
    };
    FilterComponent.prototype.onMonthlyDropdownChange = function (filterValue, filterName, index, type) {
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
                    var message = "Maximum " + this.maxQuarterLimit + " quarters can be selected";
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
                else if (+this.monthly[2] == (+this.monthly[0] + (this.maxQuarterLimit / 4))) {
                    if (+this.monthly[3] >= +this.monthly[1]) {
                        this.submitVisible.emit(true);
                        //this.submitMessage.emit("Maximum limit of 16 quarters is exceeded");
                        var message = "Maximum " + this.maxQuarterLimit + " quarters can be selected";
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
                            var filterSlider = this.sourceList.map(function (x) { return Object.assign({}, x); });
                            var filterSliders = filterSlider.filter(function (x) { return x.childControlMappingId != 0 && x.sortOrder != 0; });
                            if (filterSliders.length == 0) {
                                this.submitVisible.emit(true);
                            }
                            else {
                                this.submitVisible.emit(false);
                            }
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
                            var filterSlider = this.sourceList.map(function (x) { return Object.assign({}, x); });
                            var filterSliders = filterSlider.filter(function (x) { return x.childControlMappingId != 0 && x.sortOrder != 0; });
                            if (filterSliders.length == 0) {
                                this.submitVisible.emit(true);
                            }
                            else {
                                this.submitVisible.emit(false);
                            }
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
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["selectedData"] = filterValue;
        selectedValue["childControlMappingId"] = null;
        this.selectedValueEmit.emit(selectedValue);
    };
    FilterComponent.prototype.onDropdownlevel1Change = function (filterValue, filterObject1) {
        var _this = this;
        this.level1DefaultSelected = filterValue;
        this.level2DefaultSelected = 0;
        this.level3DefaultSelected = 0;
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        //selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["filterName"] = "Region";
        selectedValue["selectedData"] = filterValue;
        //selectedValue["filterData"] = filterObject1.filterData.filter(x => x["labelId"] == filterValue);
        this.selectedValueEmit.emit(selectedValue);
        if (this.cascadeDependency == "crop")
            this.fullData = this.filtersRelationList.filter(function (x) { return x["cropId"] == _this.cropId; });
        else if (this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
            this.fullData = this.filtersRelationList;
        }
        if (this.level2fullData.length > 0) {
            if (this.cascadeDependency == "default") {
                this.level2filterData = this.level2fullData.filter(function (x) { return x["parent1Id"] == filterValue; });
                var level2selectedId_1 = 0;
                if (this.level2filterData[0])
                    level2selectedId_1 = this.level2filterData[0]["labelId"];
                if (level2selectedId_1) {
                    this.level3filterData = this.level3fullData.filter(function (x) { return x["parent2Id"] == level2selectedId_1; });
                    var selectedValue_1 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue_1["filterName"] = this.dropdownlevel3FilterName;
                    var level3selectedId = 0;
                    if (this.level3filterData[0])
                        level3selectedId = this.level3filterData[0]["labelId"];
                    selectedValue_1["selectedData"] = 0;
                    this.selectedValueEmit.emit(selectedValue_1);
                }
                else {
                    this.level3filterData = this.level3fullData.filter(function (x) { return x["parent1Id"] == filterValue; });
                    var selectedValue_2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue_2["filterName"] = this.dropdownlevel3FilterName;
                    var level3selectedId = 0;
                    if (this.level3filterData[0])
                        level3selectedId = this.level3filterData[0]["labelId"];
                    selectedValue_2["selectedData"] = 0;
                    this.selectedValueEmit.emit(selectedValue_2);
                }
            }
            else if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
                //territory
                this.level2filterData = [];
                var ters = [];
                this.fullTerritoryData = this.fullData.filter(function (x) { return x.regionId == filterValue; });
                for (var i = 0; i < this.fullTerritoryData.length; i++) {
                    if (ters[this.fullTerritoryData[i].territoryId])
                        continue;
                    ters[this.fullTerritoryData[i].territoryId] = true;
                    this.level2filterData.push(this.fullTerritoryData[i]);
                }
                this.level2filterData = this.level2filterData.filter(function (x) { return x.territoryId != 0; });
                this.level2filterData.sort(function (a, b) {
                    if (a["territoryName"] < b["territoryName"])
                        return -1;
                    else if (a["territoryName"] > b["territoryName"])
                        return 1;
                    else
                        return 0;
                });
                var selectedValue1 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue1["filterName"] = this.dropdownlevel2FilterName;
                selectedValue1["selectedData"] = 0;
                this.selectedValueEmit.emit(selectedValue1);
                //country
                this.level3filterData = [];
                var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = this.dropdownlevel3FilterName;
                selectedValue2["selectedData"] = 0;
                this.selectedValueEmit.emit(selectedValue2);
                var conts = [];
                var fullCountryData2;
                fullCountryData2 = this.fullData.filter(function (x) { return x.regionId == filterValue && x.territoryId == 0; });
                for (var i = 0; i < fullCountryData2.length; i++) {
                    if (conts[fullCountryData2[i].countryId])
                        continue;
                    conts[fullCountryData2[i].countryId] = true;
                    this.level3filterData.push(fullCountryData2[i]);
                }
                this.level3filterData = this.level3filterData.filter(function (x) { return x.countryId != 0; });
                this.level3filterData.sort(function (a, b) {
                    if (a["countryName"] < b["countryName"])
                        return -1;
                    else if (a["countryName"] > b["countryName"])
                        return 1;
                    else
                        return 0;
                });
                //source
                if (this.cascadeDependency != "crop") {
                    this.sourceData = [];
                    var fullSourceData = this.fullData.filter(function (x) { return x.regionId == filterValue && x.territoryId == 0 && x.countryId == 0; });
                    var src = [];
                    for (var i = 0; i < fullSourceData.length; i++) {
                        if (src[fullSourceData[i].sourceId])
                            continue;
                        src[fullSourceData[i].sourceId] = true;
                        this.sourceData.push(fullSourceData[i]);
                    }
                    this.sourceData = this.sourceData.filter(function (x) { return x.sourceId != 0; });
                    this.sourceData.sort(function (a, b) {
                        if (a["sourceName"] < b["sourceName"])
                            return -1;
                        else if (a["sourceName"] > b["sourceName"])
                            return 1;
                        else
                            return 0;
                    });
                    if (this.sourceData.length > 0)
                        this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                    else
                        this.sourceDefaultSelected = 0;
                    this.onSourceDropdownChange(this.sourceDefaultSelected);
                }
                else if (this.cascadeDependency == "crop") {
                    var _loop_1 = function(i) {
                        this_1.multipleSourceData[i].filterData = [];
                        fullSourceData = this_1.fullData.filter(function (x) { return x.regionId == filterValue && x.territoryId == 0 && x.countryId == 0 && x.widgetName == _this.multipleSourceData[i].filterName; });
                        src = [];
                        for (var k = 0; k < fullSourceData.length; k++) {
                            if (src[fullSourceData[k].sourceId])
                                continue;
                            src[fullSourceData[k].sourceId] = true;
                            this_1.multipleSourceData[i].filterData.push(fullSourceData[k]);
                        }
                        this_1.multipleSourceData[i].filterData = this_1.multipleSourceData[i].filterData.filter(function (x) { return x.sourceId != 0; });
                        this_1.multipleSourceData[i].filterData.sort(function (a, b) {
                            if (a["sourceName"] < b["sourceName"])
                                return -1;
                            else if (a["sourceName"] > b["sourceName"])
                                return 1;
                            else
                                return 0;
                        });
                        var defaultValue = this_1.multipleSourceData[i].filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                        if (defaultValue.length > 0) {
                            //this.sourceOverViewDefault[i] = defaultValue[0]["defaultSourceId"];
                            this_1.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                            this_1.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                            this_1.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];
                            //added for recommended
                            var index = this_1.multipleSourceData[i].filterData.findIndex(function (x) { return x["sourceId"] == defaultValue[0]["defaultSourceId"]; });
                            if (!this_1.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                                this_1.multipleSourceData[i].filterData[index]["sourceName"] = this_1.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";
                        }
                        else if (this_1.multipleSourceData[i].filterData.length > 0) {
                            this_1.multipleSourceData[i].selectedData = this_1.multipleSourceData[i].filterData[0]["sourceId"];
                            this_1.multipleSourceData[i].sortOrder = this_1.multipleSourceData[i].filterData[0]["minYear"];
                            this_1.multipleSourceData[i].childControlMappingId = this_1.multipleSourceData[i].filterData[0]["maxYear"];
                        }
                        else {
                            this_1.multipleSourceData[i].selectedData = 0;
                            this_1.multipleSourceData[i].sortOrder = 0;
                            this_1.multipleSourceData[i].childControlMappingId = 0;
                        }
                        this_1.onOverViewSourceDropdownChange(this_1.multipleSourceData[i].selectedData, this_1.multipleSourceData[i].filterName, this_1.multipleSourceData[i], 'code');
                    };
                    var this_1 = this;
                    var fullSourceData, src;
                    for (var i = 0; i < this.multipleSourceData.length; i++) {
                        _loop_1(i);
                    }
                    this.setOverViewSlider();
                }
            }
        }
        else {
            if (this.cascadeDependency == "default") {
                this.level3filterData = this.level3fullData.filter(function (x) { return x["parent1Id"] == filterValue; });
                var selectedValue_3 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue_3["filterName"] = this.dropdownlevel3FilterName;
                selectedValue_3["selectedData"] = 0;
                this.selectedValueEmit.emit(selectedValue_3);
                var level3selectedId = 0;
                if (this.level3filterData[0])
                    level3selectedId = this.level3filterData[0]["labelId"];
            }
            else if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
                //country
                this.level3filterData = [];
                var selectedValue4 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue4["filterName"] = this.dropdownlevel3FilterName;
                selectedValue4["selectedData"] = 0;
                this.selectedValueEmit.emit(selectedValue4);
                var conts = [];
                var fullCountryData2;
                fullCountryData2 = this.fullData.filter(function (x) { return x.regionId == filterValue && x.territoryId == 0; });
                for (var i = 0; i < fullCountryData2.length; i++) {
                    if (conts[fullCountryData2[i].countryId])
                        continue;
                    conts[fullCountryData2[i].countryId] = true;
                    this.level3filterData.push(fullCountryData2[i]);
                }
                this.level3filterData = this.level3filterData.filter(function (x) { return x.countryId != 0; });
                this.level3filterData.sort(function (a, b) {
                    if (a["countryName"] < b["countryName"])
                        return -1;
                    else if (a["countryName"] > b["countryName"])
                        return 1;
                    else
                        return 0;
                });
                //source
                if (this.cascadeDependency != "crop") {
                    this.sourceData = [];
                    var fullSourceData = this.fullData.filter(function (x) { return x.regionId == filterValue && x.territoryId == 0 && x.countryId == 0; });
                    var src = [];
                    for (var i = 0; i < fullSourceData.length; i++) {
                        if (src[fullSourceData[i].sourceId])
                            continue;
                        src[fullSourceData[i].sourceId] = true;
                        this.sourceData.push(fullSourceData[i]);
                    }
                    this.sourceData = this.sourceData.filter(function (x) { return x.sourceId != 0; });
                    this.sourceData.sort(function (a, b) {
                        if (a["sourceName"] < b["sourceName"])
                            return -1;
                        else if (a["sourceName"] > b["sourceName"])
                            return 1;
                        else
                            return 0;
                    });
                    if (this.sourceData.length > 0)
                        this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                    else
                        this.sourceDefaultSelected = 0;
                    this.onSourceDropdownChange(this.sourceDefaultSelected);
                }
                else if (this.cascadeDependency == "crop") {
                    var _loop_2 = function(i) {
                        this_2.multipleSourceData[i].filterData = [];
                        fullSourceData = this_2.fullData.filter(function (x) { return x.regionId == filterValue && x.territoryId == 0 && x.countryId == 0 && x.widgetName == _this.multipleSourceData[i].filterName; });
                        src = [];
                        for (var k = 0; k < fullSourceData.length; k++) {
                            if (src[fullSourceData[k].sourceId])
                                continue;
                            src[fullSourceData[k].sourceId] = true;
                            this_2.multipleSourceData[i].filterData.push(fullSourceData[k]);
                        }
                        this_2.multipleSourceData[i].filterData = this_2.multipleSourceData[i].filterData.filter(function (x) { return x.sourceId != 0; });
                        this_2.multipleSourceData[i].filterData.sort(function (a, b) {
                            if (a["sourceName"] < b["sourceName"])
                                return -1;
                            else if (a["sourceName"] > b["sourceName"])
                                return 1;
                            else
                                return 0;
                        });
                        var defaultValue = this_2.multipleSourceData[i].filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                        if (defaultValue.length > 0) {
                            //this.sourceOverViewDefault[i] = defaultValue[0]["defaultSourceId"];
                            this_2.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                            this_2.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                            this_2.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];
                            //added for recommended
                            var index = this_2.multipleSourceData[i].filterData.findIndex(function (x) { return x["sourceId"] == defaultValue[0]["defaultSourceId"]; });
                            if (!this_2.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                                this_2.multipleSourceData[i].filterData[index]["sourceName"] = this_2.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";
                        }
                        else if (this_2.multipleSourceData[i].filterData.length > 0) {
                            this_2.multipleSourceData[i].selectedData = this_2.multipleSourceData[i].filterData[0]["sourceId"];
                            this_2.multipleSourceData[i].sortOrder = this_2.multipleSourceData[i].filterData[0]["minYear"];
                            this_2.multipleSourceData[i].childControlMappingId = this_2.multipleSourceData[i].filterData[0]["maxYear"];
                        }
                        else {
                            this_2.multipleSourceData[i].selectedData = 0;
                            this_2.multipleSourceData[i].sortOrder = 0;
                            this_2.multipleSourceData[i].childControlMappingId = 0;
                        }
                        this_2.onOverViewSourceDropdownChange(this_2.multipleSourceData[i].selectedData, this_2.multipleSourceData[i].filterName, this_2.multipleSourceData[i], 'code');
                    };
                    var this_2 = this;
                    var fullSourceData, src;
                    for (var i = 0; i < this.multipleSourceData.length; i++) {
                        _loop_2(i);
                    }
                    this.setOverViewSlider();
                }
            }
        }
    };
    FilterComponent.prototype.onDropdownlevel2Change = function (filterValue, filterObject1) {
        var _this = this;
        this.level2DefaultSelected = filterValue;
        this.level3DefaultSelected = 0;
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = this.dropdownlevel2FilterName;
        selectedValue["selectedData"] = filterValue;
        //selectedValue["filterData"] = filterObject1.filterData.filter(x => x["labelId"] == filterValue);
        this.selectedValueEmit.emit(selectedValue);
        if (this.cascadeDependency == "crop")
            this.fullData = this.filtersRelationList.filter(function (x) { return x["cropId"] == _this.cropId; });
        else if (this.cascadeDependency == "region") {
            this.fullData = this.filtersRelationList;
        }
        if (this.cascadeDependency == "default") {
            this.level3filterData = this.level3fullData.filter(function (x) { return x["parent2Id"] == filterValue; });
            var selectedValue3 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue3["filterName"] = this.dropdownlevel3FilterName;
            var level3selectedId = 0;
            if (this.level3filterData[0])
                level3selectedId = this.level3filterData[0]["labelId"];
            selectedValue3["selectedData"] = 0;
            this.selectedValueEmit.emit(selectedValue3);
        }
        else if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
            //country
            this.level3filterData = [];
            var selectedValue1 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue1["filterName"] = this.dropdownlevel3FilterName;
            selectedValue1["selectedData"] = 0;
            this.selectedValueEmit.emit(selectedValue1);
            var conts = [];
            var fullCountryData2;
            fullCountryData2 = this.fullData.filter(function (x) { return x.regionId == _this.level1DefaultSelected && x.territoryId == _this.level2DefaultSelected; });
            for (var i = 0; i < fullCountryData2.length; i++) {
                if (conts[fullCountryData2[i].countryId])
                    continue;
                conts[fullCountryData2[i].countryId] = true;
                this.level3filterData.push(fullCountryData2[i]);
            }
            this.level3filterData = this.level3filterData.filter(function (x) { return x.countryId != 0; });
            this.level3filterData.sort(function (a, b) {
                if (a["countryName"] < b["countryName"])
                    return -1;
                else if (a["countryName"] > b["countryName"])
                    return 1;
                else
                    return 0;
            });
            //source 
            if (this.cascadeDependency != "crop") {
                this.sourceData = [];
                var fullSourceData = fullCountryData2.filter(function (x) { return x.countryId == 0; });
                var src = [];
                for (var i = 0; i < fullSourceData.length; i++) {
                    if (src[fullSourceData[i].sourceId])
                        continue;
                    src[fullSourceData[i].sourceId] = true;
                    this.sourceData.push(fullSourceData[i]);
                }
                this.sourceData = this.sourceData.filter(function (x) { return x.sourceId != 0; });
                this.sourceData.sort(function (a, b) {
                    if (a["sourceName"] < b["sourceName"])
                        return -1;
                    else if (a["sourceName"] > b["sourceName"])
                        return 1;
                    else
                        return 0;
                });
                if (this.sourceData.length > 0)
                    this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                else
                    this.sourceDefaultSelected = 0;
                this.onSourceDropdownChange(this.sourceDefaultSelected);
            }
            else if (this.cascadeDependency == "crop") {
                var _loop_3 = function(i) {
                    this_3.multipleSourceData[i].filterData = [];
                    fullSourceData = fullCountryData2.filter(function (x) { return x.countryId == 0 && x.widgetName == _this.multipleSourceData[i].filterName; });
                    src = [];
                    for (var k = 0; k < fullSourceData.length; k++) {
                        if (src[fullSourceData[k].sourceId])
                            continue;
                        src[fullSourceData[k].sourceId] = true;
                        this_3.multipleSourceData[i].filterData.push(fullSourceData[k]);
                    }
                    this_3.multipleSourceData[i].filterData = this_3.multipleSourceData[i].filterData.filter(function (x) { return x.sourceId != 0; });
                    this_3.multipleSourceData[i].filterData.sort(function (a, b) {
                        if (a["sourceName"] < b["sourceName"])
                            return -1;
                        else if (a["sourceName"] > b["sourceName"])
                            return 1;
                        else
                            return 0;
                    });
                    var defaultValue = this_3.multipleSourceData[i].filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                    if (defaultValue.length > 0) {
                        this_3.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                        this_3.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                        this_3.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];
                        //added for recommended
                        var index = this_3.multipleSourceData[i].filterData.findIndex(function (x) { return x["sourceId"] == defaultValue[0]["defaultSourceId"]; });
                        if (!this_3.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                            this_3.multipleSourceData[i].filterData[index]["sourceName"] = this_3.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";
                    }
                    else if (this_3.multipleSourceData[i].filterData.length > 0) {
                        this_3.multipleSourceData[i].selectedData = this_3.multipleSourceData[i].filterData[0]["sourceId"];
                        this_3.multipleSourceData[i].sortOrder = this_3.multipleSourceData[i].filterData[0]["minYear"];
                        this_3.multipleSourceData[i].childControlMappingId = this_3.multipleSourceData[i].filterData[0]["maxYear"];
                    }
                    else {
                        this_3.multipleSourceData[i].selectedData = 0;
                        this_3.multipleSourceData[i].sortOrder = 0;
                        this_3.multipleSourceData[i].childControlMappingId = 0;
                    }
                    this_3.onOverViewSourceDropdownChange(this_3.multipleSourceData[i].selectedData, this_3.multipleSourceData[i].filterName, this_3.multipleSourceData[i], 'code');
                };
                var this_3 = this;
                var fullSourceData, src;
                for (var i = 0; i < this.multipleSourceData.length; i++) {
                    _loop_3(i);
                }
                this.setOverViewSlider();
            }
        }
    };
    FilterComponent.prototype.onDropdownlevel3Change = function (filterValue, filterObject1) {
        var _this = this;
        this.level3DefaultSelected = filterValue;
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["selectedData"] = filterValue;
        selectedValue["filterData"] = filterObject1.filterData.filter(function (x) { return x["labelId"] == filterValue; });
        this.selectedValueEmit.emit(selectedValue);
        if (this.cascadeDependency == "crop")
            this.fullData = this.filtersRelationList.filter(function (x) { return x["cropId"] == _this.cropId; });
        else if (this.cascadeDependency == "region") {
            this.fullData = this.filtersRelationList;
        }
        if (this.cascadeDependency == "crop" || this.cascadeDependency == "region" || this.cascadeDependency == "regionminussource") {
            //source
            if (this.cascadeDependency != "crop") {
                this.sourceData = [];
                var fullSourceData = this.fullData.filter(function (x) { return x.regionId == _this.level1DefaultSelected && x.territoryId == _this.level2DefaultSelected && x.countryId == _this.level3DefaultSelected; });
                var src = [];
                for (var i = 0; i < fullSourceData.length; i++) {
                    if (src[fullSourceData[i].sourceId])
                        continue;
                    src[fullSourceData[i].sourceId] = true;
                    this.sourceData.push(fullSourceData[i]);
                }
                this.sourceData = this.sourceData.filter(function (x) { return x.sourceId != 0; });
                this.sourceData.sort(function (a, b) {
                    if (a["sourceName"] < b["sourceName"])
                        return -1;
                    else if (a["sourceName"] > b["sourceName"])
                        return 1;
                    else
                        return 0;
                });
                if (this.sourceData.length > 0)
                    this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                else
                    this.sourceDefaultSelected = 0;
                this.onSourceDropdownChange(this.sourceDefaultSelected);
            }
            else if (this.cascadeDependency == "crop") {
                var _loop_4 = function(i) {
                    this_4.multipleSourceData[i].filterData = [];
                    fullSourceData = this_4.fullData.filter(function (x) { return x.regionId == _this.level1DefaultSelected && x.territoryId == _this.level2DefaultSelected && x.countryId == _this.level3DefaultSelected && x.widgetName == _this.multipleSourceData[i].filterName; });
                    src = [];
                    for (var k = 0; k < fullSourceData.length; k++) {
                        if (src[fullSourceData[k].sourceId])
                            continue;
                        src[fullSourceData[k].sourceId] = true;
                        this_4.multipleSourceData[i].filterData.push(fullSourceData[k]);
                    }
                    this_4.multipleSourceData[i].filterData = this_4.multipleSourceData[i].filterData.filter(function (x) { return x.sourceId != 0; });
                    this_4.multipleSourceData[i].filterData.sort(function (a, b) {
                        if (a["sourceName"] < b["sourceName"])
                            return -1;
                        else if (a["sourceName"] > b["sourceName"])
                            return 1;
                        else
                            return 0;
                    });
                    var defaultValue = this_4.multipleSourceData[i].filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                    if (defaultValue.length > 0) {
                        //this.sourceOverViewDefault[i] = defaultValue[0]["defaultSourceId"];
                        this_4.multipleSourceData[i].selectedData = defaultValue[0]["defaultSourceId"];
                        this_4.multipleSourceData[i].sortOrder = defaultValue[0]["minYear"];
                        this_4.multipleSourceData[i].childControlMappingId = defaultValue[0]["maxYear"];
                        //added for recommended
                        var index = this_4.multipleSourceData[i].filterData.findIndex(function (x) { return x["sourceId"] == defaultValue[0]["defaultSourceId"]; });
                        if (!this_4.multipleSourceData[i].filterData[index]["sourceName"].includes("recommended"))
                            this_4.multipleSourceData[i].filterData[index]["sourceName"] = this_4.multipleSourceData[i].filterData[index]["sourceName"] + " (recommended)";
                    }
                    else if (this_4.multipleSourceData[i].filterData.length > 0) {
                        this_4.multipleSourceData[i].selectedData = this_4.multipleSourceData[i].filterData[0]["sourceId"];
                        this_4.multipleSourceData[i].sortOrder = this_4.multipleSourceData[i].filterData[0]["minYear"];
                        this_4.multipleSourceData[i].childControlMappingId = this_4.multipleSourceData[i].filterData[0]["maxYear"];
                    }
                    else {
                        this_4.multipleSourceData[i].selectedData = 0;
                        this_4.multipleSourceData[i].sortOrder = 0;
                        this_4.multipleSourceData[i].childControlMappingId = 0;
                    }
                    this_4.onOverViewSourceDropdownChange(this_4.multipleSourceData[i].selectedData, this_4.multipleSourceData[i].filterName, this_4.multipleSourceData[i], 'code');
                };
                var this_4 = this;
                var fullSourceData, src;
                for (var i = 0; i < this.multipleSourceData.length; i++) {
                    _loop_4(i);
                }
                this.setOverViewSlider();
            }
        }
    };
    FilterComponent.prototype.onParentDropdownChange = function (filterValue, filterObject1) {
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["selectedData"] = filterValue;
        var fx = filterObject1.filterData.filter(function (x) { return x["labelId"] == filterValue; });
        var childId = fx[0]["childControlMappingId"];
        selectedValue["childControlMappingId"] = childId;
        this.selectedValueEmit.emit(selectedValue);
        if (childId) {
            if (this.childdropdown) {
                this.childDropdownObject = this.filtersList.filter(function (x) { return x.id == childId; });
                this.renderer.setElementStyle(this.childdropdown.nativeElement, 'display', 'block');
                var selectedValue_4 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue_4["id"] = this.childDropdownObject[0]["id"];
                selectedValue_4["filterName"] = this.childDropdownObject[0]["filterName"];
                selectedValue_4["filterType"] = this.childDropdownObject[0]["filterType"];
                if (this.childDropdownObject[0]["selectedData"])
                    selectedValue_4["selectedData"] = this.childDropdownObject[0]["selectedData"];
                else
                    selectedValue_4["selectedData"] = this.childDropdownObject[0]["filterData"][0]["labelId"];
                this.selectedValueEmit.emit(selectedValue_4);
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
    };
    FilterComponent.prototype.onChildChange = function (filterValue, filterObject1) {
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["id"] = filterObject1.id;
        selectedValue["filterName"] = filterObject1.filterName;
        selectedValue["filterType"] = filterObject1.filterType;
        selectedValue["selectedData"] = filterValue;
        this.selectedValueEmit.emit(selectedValue);
    };
    FilterComponent.prototype.onSliderQChange = function (filterValue, filterName) {
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["selectedData"] = [filterValue, filterValue + 1];
        this.selectedValueEmit.emit(selectedValue);
    };
    FilterComponent.prototype.onChangeRadioButton = function (filterValue, filterName) {
        var selectedRadioValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
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
                this.geographySelected[0] = [];
                this.geographySelected[1] = [];
                this.geographySelected[2] = [];
                this.multiSelectValues = [];
                this.geography[1] = [];
                this.geography[2] = [];
                //added for cascading
                this.geography[0] = [];
                this.sourceList = [];
                this.submitVisible.emit(true);
            }
            else if (filterValue == "Geography") {
                this.multiselectlimit = 1;
                this.geographylimit = 5;
                this.multiSelectValues = [];
                this.geographySelected[0] = [];
                this.geographySelected[1] = [];
                this.geographySelected[2] = [];
                this.geography[1] = [];
                this.geography[2] = [];
                //added for cascading
                this.geography[0] = [];
                this.sourceList = [];
                this.submitVisible.emit(true);
            }
        }
    };
    FilterComponent.prototype.onChangeNewRadioButton = function (filterValue, filterName) {
        var selectedRadioValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
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
    };
    FilterComponent.prototype.onChangeMultiSelect = function (filterValue, filterName, filterObjects) {
        var _this = this;
        if (filterName != 'Crop') {
            if (filterValue.length <= 5) {
                var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                this.multiSelectValues = filterValue;
                selectedValue["filterName"] = filterName;
                selectedValue["selectedData"] = filterValue;
                this.selectedValueEmit.emit(selectedValue);
            }
            else {
                this.multiSelectValues = this.multiSelectValues.slice(0, 5);
                filterValue = filterValue.slice(0, 5);
                var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = filterName;
                selectedValue["selectedData"] = filterValue;
                this.selectedValueEmit.emit(selectedValue);
            }
            if (filterValue.length == 0) {
                this.submitVisible.emit(true);
            }
            else {
                this.submitVisible.emit(false);
            }
        }
        else {
            if (filterValue.length <= this.multiselectlimit) {
                var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                this.multiSelectValues = filterValue;
                selectedValue["filterName"] = filterName;
                selectedValue["selectedData"] = filterValue;
                this.selectedValueEmit.emit(selectedValue);
                //cropcascade                
                if (filterValue.length != 0) {
                    this.geography[0] = [];
                    var Obj0 = this.geographySelected[0];
                    this.geographySelected[0] = [];
                    var flags = [];
                    var _loop_5 = function(cropId) {
                        //cloning problem
                        var cloned = this_5.filtersRelationList.map(function (x) { return Object.assign({}, x); });
                        var reg = cloned.filter(function (y) { return y["cropId"] == cropId && y["kpiId"] == _this.parameterId; });
                        var _loop_6 = function(i) {
                            if (flags[reg[i].regionId]) {
                                if (reg[i].regionShade == '0') {
                                    var index = this_5.geography[0].findIndex(function (x) { return x['regionId'] == reg[i].regionId; });
                                    if (index >= 0) {
                                        this_5.geography[0][index]['regionShade'] == '0';
                                    }
                                }
                                return "continue";
                            }
                            flags[reg[i].regionId] = true;
                            this_5.geography[0].push(reg[i]);
                            if (Obj0.indexOf(reg[i].regionId) > -1) {
                                this_5.geographySelected[0].push(reg[i].regionId);
                            }
                        };
                        for (var i = 0; i < reg.length; i++) {
                            _loop_6(i);
                        }
                    };
                    var this_5 = this;
                    for (var _i = 0, _a = filterValue.length > 0 ? filterValue : []; _i < _a.length; _i++) {
                        var cropId = _a[_i];
                        _loop_5(cropId);
                    }
                    this.geography[0].sort(function (a, b) {
                        if (a["regionName"] < b["regionName"])
                            return -1;
                        else if (a["regionName"] > b["regionName"])
                            return 1;
                        else
                            return 0;
                    });
                    for (var i = 0; i < this.geography[0].length; i++) {
                        this.geography[0][i].label = this.geography[0][i].regionName;
                        this.geography[0][i].value = this.geography[0][i].regionId;
                    }
                    this.onChangeGeographyMultiSelect(this.geographySelected[0], "Region", this.geography[0]);
                    //source
                    if (this.multiselectlimit == 5) {
                        var flagSource = [];
                        //removing extra source dropdown
                        if (this.sourceList.length > filterValue.length) {
                            this.sourceList = this.sourceList.filter(function (x) { return filterValue.indexOf(x.id) > -1; });
                            this.setSlider();
                            var SourceNames = [];
                            for (var _b = 0, _c = this.sourceList; _b < _c.length; _b++) {
                                var name_1 = _c[_b];
                                SourceNames.push(name_1.filterName);
                            }
                            var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            selectedValue2["filterName"] = 'List';
                            selectedValue2["selectedData"] = SourceNames;
                            selectedValue2["filterType"] = this.sourceList[0].filterType;
                            this.selectedValueEmit.emit(selectedValue2);
                        }
                        else if (filterValue.length == 1) {
                            var source = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            source.filterName = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].label;
                            source.id = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].value;
                            source.filterData = [];
                            source.selectedData = 0;
                            this.sourceList.push(source);
                            this.onSourceChange(source.selectedData, source.filterName, source, 'code');
                        }
                        else {
                            var source = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            source.filterName = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].label;
                            source.id = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].value;
                            if (this.geographySelected[0].length > 0) {
                                if (this.geographySelected[1].length > 0) {
                                    if (this.geographySelected[2].length > 0) {
                                        var sor = this.filtersRelationList.filter(function (x) { return filterValue.indexOf(x.cropId) == (filterValue.length - 1) && _this.geographySelected[0].indexOf(x.regionId) > -1 && (_this.geographySelected[1].indexOf(x.territoryId) > -1 || x.territoryId == 0) && _this.geographySelected[2].indexOf(x.countryId) > -1 && x.kpiId == _this.parameterId; });
                                        for (var i = 0; i < sor.length; i++) {
                                            if (flagSource[sor[i].sourceId]) {
                                                continue;
                                            }
                                            flagSource[sor[i].sourceId] = true;
                                            source.filterData.push(sor[i]);
                                        }
                                    }
                                    else {
                                        var sor = this.filtersRelationList.filter(function (x) { return filterValue.indexOf(x.cropId) == (filterValue.length - 1) && _this.geographySelected[0].indexOf(x.regionId) > -1 && _this.geographySelected[1].indexOf(x.territoryId) > -1 && x.countryId == 0 && x.kpiId == _this.parameterId; });
                                        for (var i = 0; i < sor.length; i++) {
                                            if (flagSource[sor[i].sourceId]) {
                                                continue;
                                            }
                                            flagSource[sor[i].sourceId] = true;
                                            source.filterData.push(sor[i]);
                                        }
                                    }
                                }
                                else if (this.geographySelected[2].length > 0) {
                                    var sor = this.filtersRelationList.filter(function (x) { return filterValue.indexOf(x.cropId) == (filterValue.length - 1) && _this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && _this.geographySelected[2].indexOf(x.countryId) > -1 && x.kpiId == _this.parameterId; });
                                    for (var i = 0; i < sor.length; i++) {
                                        if (flagSource[sor[i].sourceId]) {
                                            continue;
                                        }
                                        flagSource[sor[i].sourceId] = true;
                                        source.filterData.push(sor[i]);
                                    }
                                }
                                else {
                                    var sor = this.filtersRelationList.filter(function (x) { return filterValue.indexOf(x.cropId) == (filterValue.length - 1) && _this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && x.countryId == 0 && x.kpiId == _this.parameterId; });
                                    for (var i = 0; i < sor.length; i++) {
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
                            source.filterData = source.filterData.filter(function (x) { return x.sourceId != 0; });
                            source.filterData.sort(function (a, b) {
                                if (a["sourceName"] < b["sourceName"])
                                    return -1;
                                else if (a["sourceName"] > b["sourceName"])
                                    return 1;
                                else
                                    return 0;
                            });
                            //for default value start //sortOrder=min  //childControlMappingId= max
                            var defaultValue_1 = source.filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                            if (defaultValue_1.length > 0) {
                                source.selectedData = defaultValue_1[0]["defaultSourceId"];
                                source.sortOrder = defaultValue_1[0]["minYear"];
                                source.childControlMappingId = defaultValue_1[0]["maxYear"];
                                //added for recommended
                                var index = source.filterData.findIndex(function (x) { return x["sourceId"] == defaultValue_1[0]["defaultSourceId"]; });
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
                var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = filterName;
                selectedValue["selectedData"] = filterValue;
                this.selectedValueEmit.emit(selectedValue);
            }
            if (filterValue.length == 0) {
                this.submitVisible.emit(true);
                //cropcascade 
                this.geography[0] = [];
                this.geographySelected[0] = [];
                this.geography[1] = [];
                this.geographySelected[1] = [];
                this.geography[2] = [];
                this.geographySelected[2] = [];
                this.sourceList = [];
                var selectedValue0 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue0["filterName"] = "Region";
                selectedValue0["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue0);
                var selectedValue1 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue1["filterName"] = "Territory";
                selectedValue1["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue1);
                var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue2);
            }
            else if (this.geographySelected[0].length == 0 && this.geographySelected[1].length == 0 && this.geographySelected[2].length == 0) {
                this.submitVisible.emit(true);
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
    };
    FilterComponent.prototype.onChangeGeographyMultiSelect = function (filterValue, filterName, filterObjects) {
        var _this = this;
        var sourceCheck = 1;
        var fullData = [];
        var cloned = this.filtersRelationList.map(function (x) { return Object.assign({}, x); });
        var _loop_7 = function(cropId) {
            var x = cloned.filter(function (x) { return x["cropId"] == cropId && x["kpiId"] == _this.parameterId; });
            for (var i = 0; i < x.length; i++) {
                fullData.push(x[i]);
            }
        };
        for (var _i = 0, _a = this.multiSelectValues.length > 0 ? this.multiSelectValues : []; _i < _a.length; _i++) {
            var cropId = _a[_i];
            _loop_7(cropId);
        }
        if (filterValue.length == 0) {
            if (filterName.toLocaleLowerCase() == "region") {
                this.geography[1] = [];
                this.geographySelected[1] = [];
                this.geography[2] = [];
                this.geographySelected[2] = [];
                var selectedValue1 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue1["filterName"] = "Territory";
                selectedValue1["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue1);
                var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = [];
                this.selectedValueEmit.emit(selectedValue2);
            }
            else if (filterName.toLocaleLowerCase() == "territory") {
                this.geography[2] = [];
                var Obj2 = this.geographySelected[2];
                this.geographySelected[2] = [];
                var conts = [];
                var _loop_8 = function(en) {
                    var con = fullData.filter(function (y) { return y.regionId == en && y.territoryId == 0 && y.countryId != 0; });
                    for (var i = 0; i < con.length; i++) {
                        if (conts[con[i].countryId])
                            continue;
                        conts[con[i].countryId] = true;
                        this_6.geography[2].push(con[i]);
                        if (Obj2.indexOf(con[i].countryId) > -1) {
                            this_6.geographySelected[2].push(con[i].countryId);
                        }
                    }
                };
                var this_6 = this;
                for (var _b = 0, _c = this.geographySelected[0]; _b < _c.length; _b++) {
                    var en = _c[_b];
                    _loop_8(en);
                }
                this.geography[2].sort(function (a, b) {
                    if (a["countryName"] < b["countryName"])
                        return -1;
                    else if (a["countryName"] > b["countryName"])
                        return 1;
                    else
                        return 0;
                });
                for (var i = 0; i < this.geography[2].length; i++) {
                    this.geography[2][i].label = this.geography[2][i].countryName;
                    this.geography[2][i].value = this.geography[2][i].countryId;
                }
                var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = this.geographySelected[2];
                this.selectedValueEmit.emit(selectedValue2);
            }
            var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = filterName;
            selectedValue["selectedData"] = filterValue;
            this.selectedValueEmit.emit(selectedValue);
        }
        else if (filterValue.length <= this.geographylimit) {
            var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = filterName;
            selectedValue["selectedData"] = filterValue;
            this.selectedValueEmit.emit(selectedValue);
            if (filterName.toLocaleLowerCase() == "region") {
                this.geography[1] = [];
                this.geography[2] = [];
                var Obj1 = this.geographySelected[1];
                var Obj2 = this.geographySelected[2];
                this.geographySelected[1] = [];
                this.geographySelected[2] = [];
                var flags = [];
                var flags2 = [];
                var _loop_9 = function(en) {
                    var ter = fullData.filter(function (y) { return y.regionId == en && y.territoryId != 0 && y["kpiId"] == _this.parameterId; });
                    var _loop_10 = function(i) {
                        if (flags[ter[i].territoryId]) {
                            if (ter[i].territoryShade == '0') {
                                var index = this_7.geography[1].findIndex(function (x) { return x['territoryId'] == ter[i].territoryId; });
                                if (index >= 0) {
                                    this_7.geography[1][index]['territoryShade'] == '0';
                                }
                            }
                            return "continue";
                        }
                        flags[ter[i].territoryId] = true;
                        this_7.geography[1].push(ter[i]);
                        if (Obj1.indexOf(ter[i].territoryId) > -1) {
                            this_7.geographySelected[1].push(ter[i].territoryId);
                        }
                    };
                    for (var i = 0; i < ter.length; i++) {
                        _loop_10(i);
                    }
                    var fullDataCloned = fullData.map(function (x) { return Object.assign({}, x); });
                    var con = fullDataCloned.filter(function (y) { return y.regionId == en && y.territoryId == 0 && y.countryId != 0 && y["kpiId"] == _this.parameterId; });
                    for (var i = 0; i < con.length; i++) {
                        if (flags2[con[i].countryId])
                            continue;
                        flags2[con[i].countryId] = true;
                        this_7.geography[2].push(con[i]);
                        if (Obj2.indexOf(con[i].countryId) > -1) {
                            this_7.geographySelected[2].push(con[i].countryId);
                        }
                    }
                    var _loop_11 = function(can) {
                        var con_1 = fullDataCloned.filter(function (y) { return y.regionId == en && y.territoryId == can && y.countryId != 0 && y["kpiId"] == _this.parameterId; });
                        for (var i = 0; i < con_1.length; i++) {
                            if (flags2[con_1[i].countryId])
                                continue;
                            flags2[con_1[i].countryId] = true;
                            this_7.geography[2].push(con_1[i]);
                            if (Obj2.indexOf(con_1[i].countryId) > -1) {
                                this_7.geographySelected[2].push(con_1[i].countryId);
                            }
                        }
                    };
                    for (var _d = 0, Obj1_1 = Obj1; _d < Obj1_1.length; _d++) {
                        var can = Obj1_1[_d];
                        _loop_11(can);
                    }
                };
                var this_7 = this;
                for (var _e = 0, filterValue_1 = filterValue; _e < filterValue_1.length; _e++) {
                    var en = filterValue_1[_e];
                    _loop_9(en);
                }
                var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = this.geographySelected[2];
                this.selectedValueEmit.emit(selectedValue2);
                var selectedValue1 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue1["filterName"] = "Territory";
                selectedValue1["selectedData"] = this.geographySelected[1];
                this.selectedValueEmit.emit(selectedValue1);
            }
            if (filterName.toLocaleLowerCase() == "territory") {
                this.geography[2] = [];
                var Obj2 = this.geographySelected[2];
                this.geographySelected[2] = [];
                var flags2 = [];
                var _loop_12 = function(en) {
                    var con = fullData.filter(function (y) { return y.territoryId == en && y.countryId != 0 && y["kpiId"] == _this.parameterId; });
                    for (var i = 0; i < con.length; i++) {
                        if (flags2[con[i].countryId])
                            continue;
                        flags2[con[i].countryId] = true;
                        this_8.geography[2].push(con[i]);
                        if (Obj2.indexOf(con[i].countryId) > -1) {
                            this_8.geographySelected[2].push(con[i].countryId);
                        }
                    }
                };
                var this_8 = this;
                for (var _f = 0, filterValue_2 = filterValue; _f < filterValue_2.length; _f++) {
                    var en = filterValue_2[_f];
                    _loop_12(en);
                }
                var _loop_13 = function(en) {
                    var con = fullData.filter(function (y) { return y.regionId == en && y.territoryId == 0 && y.countryId != 0 && y["kpiId"] == _this.parameterId; });
                    for (var i = 0; i < con.length; i++) {
                        if (flags2[con[i].countryId])
                            continue;
                        flags2[con[i].countryId] = true;
                        this_9.geography[2].push(con[i]);
                        if (Obj2.indexOf(con[i].countryId) > -1) {
                            this_9.geographySelected[2].push(con[i].countryId);
                        }
                    }
                };
                var this_9 = this;
                for (var _g = 0, _h = this.geographySelected[0]; _g < _h.length; _g++) {
                    var en = _h[_g];
                    _loop_13(en);
                }
                var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue2["filterName"] = "Country";
                selectedValue2["selectedData"] = this.geographySelected[2];
                this.selectedValueEmit.emit(selectedValue2);
            }
            this.geography[1].sort(function (a, b) {
                if (a["territoryName"] < b["territoryName"])
                    return -1;
                else if (a["territoryName"] > b["territoryName"])
                    return 1;
                else
                    return 0;
            });
            for (var i = 0; i < this.geography[1].length; i++) {
                this.geography[1][i].label = this.geography[1][i].territoryName;
                this.geography[1][i].value = this.geography[1][i].territoryId;
            }
            this.geography[2].sort(function (a, b) {
                if (a["countryName"] < b["countryName"])
                    return -1;
                else if (a["countryName"] > b["countryName"])
                    return 1;
                else
                    return 0;
            });
            for (var i = 0; i < this.geography[2].length; i++) {
                this.geography[2][i].label = this.geography[2][i].countryName;
                this.geography[2][i].value = this.geography[2][i].countryId;
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
            var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = filterName;
            selectedValue["selectedData"] = filterValue;
            this.selectedValueEmit.emit(selectedValue);
        }
        if (this.geographySelected[0].length == 0 && this.geographySelected[1].length == 0 && this.geographySelected[2].length == 0) {
            this.submitVisible.emit(true);
        }
        else if (this.multiSelectValues.length == 0) {
            this.submitVisible.emit(true);
        }
        else {
            if (this.sourceList.length > 0) {
                this.setSlider();
            }
            else {
                this.submitVisible.emit(false);
            }
        }
        //sources
        if (sourceCheck == 1) {
            if (this.multiselectlimit == 5) {
                var _loop_14 = function(j) {
                    var flagSource_1 = [];
                    this_10.sourceList[j].filterData = [];
                    if (this_10.geographySelected[0].length > 0) {
                        if (this_10.geographySelected[1].length > 0) {
                            if (this_10.geographySelected[2].length > 0) {
                                var sor = this_10.filtersRelationList.filter(function (x) { return _this.sourceList[j].id == x.cropId && _this.geographySelected[0].indexOf(x.regionId) > -1 && (_this.geographySelected[1].indexOf(x.territoryId) > -1 || x.territoryId == 0) && _this.geographySelected[2].indexOf(x.countryId) > -1 && x["kpiId"] == _this.parameterId; });
                                for (var i = 0; i < sor.length; i++) {
                                    if (flagSource_1[sor[i].sourceId]) {
                                        continue;
                                    }
                                    flagSource_1[sor[i].sourceId] = true;
                                    this_10.sourceList[j].filterData.push(sor[i]);
                                }
                            }
                            else {
                                var sor = this_10.filtersRelationList.filter(function (x) { return _this.sourceList[j].id == x.cropId && _this.geographySelected[0].indexOf(x.regionId) > -1 && _this.geographySelected[1].indexOf(x.territoryId) > -1 && x.countryId == 0 && x["kpiId"] == _this.parameterId; });
                                for (var i = 0; i < sor.length; i++) {
                                    if (flagSource_1[sor[i].sourceId]) {
                                        continue;
                                    }
                                    flagSource_1[sor[i].sourceId] = true;
                                    this_10.sourceList[j].filterData.push(sor[i]);
                                }
                            }
                        }
                        else if (this_10.geographySelected[2].length > 0) {
                            var sor = this_10.filtersRelationList.filter(function (x) { return _this.sourceList[j].id == x.cropId && _this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && _this.geographySelected[2].indexOf(x.countryId) > -1 && x["kpiId"] == _this.parameterId; });
                            for (var i = 0; i < sor.length; i++) {
                                if (flagSource_1[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource_1[sor[i].sourceId] = true;
                                this_10.sourceList[j].filterData.push(sor[i]);
                            }
                        }
                        else {
                            var sor = this_10.filtersRelationList.filter(function (x) { return _this.sourceList[j].id == x.cropId && _this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && x.countryId == 0 && x["kpiId"] == _this.parameterId; });
                            for (var i = 0; i < sor.length; i++) {
                                if (flagSource_1[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource_1[sor[i].sourceId] = true;
                                this_10.sourceList[j].filterData.push(sor[i]);
                            }
                        }
                    }
                    else {
                        this_10.sourceList[j].filterData = [];
                    }
                    // source sorting
                    this_10.sourceList[j].filterData = this_10.sourceList[j].filterData.filter(function (x) { return x.sourceId != 0; });
                    this_10.sourceList[j].filterData.sort(function (a, b) {
                        if (a["sourceName"] < b["sourceName"])
                            return -1;
                        else if (a["sourceName"] > b["sourceName"])
                            return 1;
                        else
                            return 0;
                    });
                    //for default value start //sortOrder=min  //childControlMappingId= max
                    var defaultValue = this_10.sourceList[j].filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                    if (defaultValue.length > 0) {
                        this_10.sourceList[j].selectedData = defaultValue[0]["defaultSourceId"];
                        this_10.sourceList[j].sortOrder = defaultValue[0]["minYear"];
                        this_10.sourceList[j].childControlMappingId = defaultValue[0]["maxYear"];
                        //added for recommended
                        var index = this_10.sourceList[j].filterData.findIndex(function (x) { return x["sourceId"] == defaultValue[0]["defaultSourceId"]; });
                        if (!this_10.sourceList[j].filterData[index]["sourceName"].includes("recommended"))
                            this_10.sourceList[j].filterData[index]["sourceName"] = this_10.sourceList[j].filterData[index]["sourceName"] + " (recommended)";
                    }
                    else if (this_10.sourceList[j].filterData.length > 0) {
                        this_10.sourceList[j].selectedData = this_10.sourceList[j].filterData[0]["sourceId"];
                        this_10.sourceList[j].sortOrder = this_10.sourceList[j].filterData[0]["minYear"];
                        this_10.sourceList[j].childControlMappingId = this_10.sourceList[j].filterData[0]["maxYear"];
                    }
                    else {
                        this_10.sourceList[j].selectedData = 0;
                        this_10.sourceList[j].sortOrder = 0;
                        this_10.sourceList[j].childControlMappingId = 0;
                    }
                    this_10.setSlider();
                    this_10.onSourceChange(this_10.sourceList[j].selectedData, this_10.sourceList[j].filterName, this_10.sourceList[j], 'code');
                };
                var this_10 = this;
                for (var j = 0; j < this.sourceList.length; j++) {
                    _loop_14(j);
                }
            }
            else {
                if (this.geographySelected[2].length > 0 && filterName == "Country") {
                    var flagSource = [];
                    //removing extra source dropdown
                    this.sourceList = this.sourceList.filter(function (x) { return x.filterType == "country"; });
                    if (this.sourceList.length > this.geographySelected[2].length) {
                        this.sourceList = this.sourceList.filter(function (x) { return _this.geographySelected[2].indexOf(x.id) > -1 && x.filterType == "country"; });
                        this.setSlider();
                        var SourceNames = [];
                        for (var _j = 0, _k = this.sourceList; _j < _k.length; _j++) {
                            var name_2 = _k[_j];
                            SourceNames.push(name_2.filterName);
                        }
                        var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue2["filterName"] = 'List';
                        selectedValue2["selectedData"] = SourceNames;
                        selectedValue2["filterType"] = this.sourceList[0].filterType;
                        this.selectedValueEmit.emit(selectedValue2);
                    }
                    else {
                        var source = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        source.filterName = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].label;
                        source.id = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].value;
                        if (this.geographySelected[2].length > 0) {
                            source.filterType = "country";
                        }
                        source.filterData = [];
                        if (this.geographySelected[1].length == 0) {
                            var sor = this.filtersRelationList.filter(function (x) { return _this.multiSelectValues[0] == x.cropId && _this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == 0 && filterValue[filterValue.length - 1] == x.countryId && x["kpiId"] == _this.parameterId; });
                            for (var i = 0; i < sor.length; i++) {
                                if (flagSource[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource[sor[i].sourceId] = true;
                                source.filterData.push(sor[i]);
                            }
                            source.filterData = source.filterData.filter(function (x) { return x.sourceId != 0; });
                            source.filterData.sort(function (a, b) {
                                if (a["sourceName"] < b["sourceName"])
                                    return -1;
                                else if (a["sourceName"] > b["sourceName"])
                                    return 1;
                                else
                                    return 0;
                            });
                            //for default value start //sortOrder=min  //childControlMappingId= max
                            var defaultValue_2 = source.filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                            if (defaultValue_2.length > 0) {
                                source.selectedData = defaultValue_2[0]["defaultSourceId"];
                                source.sortOrder = defaultValue_2[0]["minYear"];
                                source.childControlMappingId = defaultValue_2[0]["maxYear"];
                                //added for recommended
                                var index = source.filterData.findIndex(function (x) { return x["sourceId"] == defaultValue_2[0]["defaultSourceId"]; });
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
                            var sor = this.filtersRelationList.filter(function (x) { return _this.multiSelectValues[0] == x.cropId && _this.geographySelected[0].indexOf(x.regionId) > -1 && (_this.geographySelected[1].indexOf(x.territoryId) > -1 || x.territoryId == 0) && filterValue[filterValue.length - 1] == x.countryId && x["kpiId"] == _this.parameterId; });
                            for (var i = 0; i < sor.length; i++) {
                                if (flagSource[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource[sor[i].sourceId] = true;
                                source.filterData.push(sor[i]);
                            }
                            source.filterData = source.filterData.filter(function (x) { return x.sourceId != 0; });
                            source.filterData.sort(function (a, b) {
                                if (a["sourceName"] < b["sourceName"])
                                    return -1;
                                else if (a["sourceName"] > b["sourceName"])
                                    return 1;
                                else
                                    return 0;
                            });
                            //for default value start //sortOrder=min  //childControlMappingId= max
                            var defaultValue_3 = source.filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                            if (defaultValue_3.length > 0) {
                                source.selectedData = defaultValue_3[0]["defaultSourceId"];
                                source.sortOrder = defaultValue_3[0]["minYear"];
                                source.childControlMappingId = defaultValue_3[0]["maxYear"];
                                //added for recommended
                                var index = source.filterData.findIndex(function (x) { return x["sourceId"] == defaultValue_3[0]["defaultSourceId"]; });
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
                    this.sourceList = this.sourceList.filter(function (x) { return _this.geographySelected[2].indexOf(x.id) > -1 && x.filterType == "country"; });
                    this.setSlider();
                    //newly added
                    var SourceNames = [];
                    for (var _l = 0, _m = this.sourceList; _l < _m.length; _l++) {
                        var name_3 = _m[_l];
                        SourceNames.push(name_3.filterName);
                    }
                    var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue2["filterName"] = 'List';
                    selectedValue2["selectedData"] = SourceNames;
                    selectedValue2["filterType"] = this.sourceList[0].filterType;
                    this.selectedValueEmit.emit(selectedValue2);
                }
                else if (this.geographySelected[1].length > 0 && (filterName == "Territory" || filterName == "Country")) {
                    var flagSource = [];
                    //removing extra source dropdown
                    this.sourceList = this.sourceList.filter(function (x) { return x.filterType == "territory"; });
                    if (this.sourceList.length > this.geographySelected[1].length) {
                        this.sourceList = this.sourceList.filter(function (x) { return _this.geographySelected[1].indexOf(x.id) > -1 && x.filterType == "territory"; });
                        this.setSlider();
                        //newly added
                        var SourceNames = [];
                        for (var _o = 0, _p = this.sourceList; _o < _p.length; _o++) {
                            var name_4 = _p[_o];
                            SourceNames.push(name_4.filterName);
                        }
                        var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue2["filterName"] = 'List';
                        selectedValue2["selectedData"] = SourceNames;
                        selectedValue2["filterType"] = this.sourceList[0].filterType;
                        this.selectedValueEmit.emit(selectedValue2);
                    }
                    else if (filterName == "Country") {
                        var _loop_15 = function(ter) {
                            var flagSource2 = [];
                            var source = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            source.filterName = this_11.geography[1].filter(function (x) { return x.territoryId == ter; })[0].territoryName;
                            source.id = ter;
                            if (this_11.geographySelected[1].length > 0) {
                                source.filterType = "territory";
                            }
                            source.filterData = [];
                            var sor = this_11.filtersRelationList.filter(function (x) { return _this.multiSelectValues[0] == x.cropId && _this.geographySelected[0].indexOf(x.regionId) > -1 && x.territoryId == ter && x.countryId == 0 && x["kpiId"] == _this.parameterId; });
                            for (var i = 0; i < sor.length; i++) {
                                if (flagSource2[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource2[sor[i].sourceId] = true;
                                source.filterData.push(sor[i]);
                            }
                            source.filterData = source.filterData.filter(function (x) { return x.sourceId != 0; });
                            source.filterData.sort(function (a, b) {
                                if (a["sourceName"] < b["sourceName"])
                                    return -1;
                                else if (a["sourceName"] > b["sourceName"])
                                    return 1;
                                else
                                    return 0;
                            });
                            //for default value start //sortOrder=min  //childControlMappingId= max
                            var defaultValue = source.filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                            if (defaultValue.length > 0) {
                                source.selectedData = defaultValue[0]["defaultSourceId"];
                                source.sortOrder = defaultValue[0]["minYear"];
                                source.childControlMappingId = defaultValue[0]["maxYear"];
                                //added for recommended
                                var index = source.filterData.findIndex(function (x) { return x["sourceId"] == defaultValue[0]["defaultSourceId"]; });
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
                            this_11.sourceList.push(source);
                            this_11.onSourceChange(source.selectedData, source.filterName, source, 'code');
                            this_11.setSlider();
                        };
                        var this_11 = this;
                        for (var _q = 0, _r = this.geographySelected[1]; _q < _r.length; _q++) {
                            var ter = _r[_q];
                            _loop_15(ter);
                        }
                    }
                    else {
                        var source = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        source.filterName = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].label;
                        source.id = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].value;
                        if (this.geographySelected[1].length > 0) {
                            source.filterType = "territory";
                        }
                        source.filterData = [];
                        var sor = this.filtersRelationList.filter(function (x) { return _this.multiSelectValues[0] == x.cropId && _this.geographySelected[0].indexOf(x.regionId) > -1 && filterValue[filterValue.length - 1] == x.territoryId && x.countryId == 0 && x["kpiId"] == _this.parameterId; });
                        for (var i = 0; i < sor.length; i++) {
                            if (flagSource[sor[i].sourceId]) {
                                continue;
                            }
                            flagSource[sor[i].sourceId] = true;
                            source.filterData.push(sor[i]);
                        }
                        source.filterData = source.filterData.filter(function (x) { return x.sourceId != 0; });
                        source.filterData.sort(function (a, b) {
                            if (a["sourceName"] < b["sourceName"])
                                return -1;
                            else if (a["sourceName"] > b["sourceName"])
                                return 1;
                            else
                                return 0;
                        });
                        //for default value start //sortOrder=min  //childControlMappingId= max
                        var defaultValue_4 = source.filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                        if (defaultValue_4.length > 0) {
                            source.selectedData = defaultValue_4[0]["defaultSourceId"];
                            source.sortOrder = defaultValue_4[0]["minYear"];
                            source.childControlMappingId = defaultValue_4[0]["maxYear"];
                            //added for recommended
                            var index = source.filterData.findIndex(function (x) { return x["sourceId"] == defaultValue_4[0]["defaultSourceId"]; });
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
                    this.sourceList = this.sourceList.filter(function (x) { return _this.geographySelected[1].indexOf(x.id) > -1 && x.filterType == "territory"; });
                    this.setSlider();
                    var SourceNames = [];
                    for (var _s = 0, _t = this.sourceList; _s < _t.length; _s++) {
                        var name_5 = _t[_s];
                        SourceNames.push(name_5.filterName);
                    }
                    var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue2["filterName"] = 'List';
                    selectedValue2["selectedData"] = SourceNames;
                    selectedValue2["filterType"] = this.sourceList[0].filterType;
                    this.selectedValueEmit.emit(selectedValue2);
                }
                else if (this.geographySelected[0].length > 0) {
                    var flagSource = [];
                    //removing extra source dropdown
                    this.sourceList = this.sourceList.filter(function (x) { return x.filterType == "region"; });
                    if (this.sourceList.length > this.geographySelected[0].length) {
                        this.sourceList = this.sourceList.filter(function (x) { return _this.geographySelected[0].indexOf(x.id) > -1 && x.filterType == "region"; });
                        this.setSlider();
                        var SourceNames = [];
                        for (var _u = 0, _v = this.sourceList; _u < _v.length; _u++) {
                            var name_6 = _v[_u];
                            SourceNames.push(name_6.filterName);
                        }
                        var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue2["filterName"] = 'List';
                        selectedValue2["selectedData"] = SourceNames;
                        selectedValue2["filterType"] = this.sourceList[0].filterType;
                        this.selectedValueEmit.emit(selectedValue2);
                    }
                    else if (filterName == "Territory" || filterName == "Country") {
                        var _loop_16 = function(reg) {
                            var flagSource2 = [];
                            var source = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            source.filterName = this_12.geography[0].filter(function (x) { return x.regionId == reg; })[0].regionName;
                            source.id = reg;
                            if (this_12.geographySelected[0].length > 0) {
                                source.filterType = "region";
                            }
                            source.filterData = [];
                            var sor = this_12.filtersRelationList.filter(function (x) { return _this.multiSelectValues[0] == x.cropId && reg == x.regionId && x.territoryId == 0 && x.countryId == 0 && x["kpiId"] == _this.parameterId; });
                            for (var i = 0; i < sor.length; i++) {
                                if (flagSource2[sor[i].sourceId]) {
                                    continue;
                                }
                                flagSource2[sor[i].sourceId] = true;
                                source.filterData.push(sor[i]);
                            }
                            source.filterData = source.filterData.filter(function (x) { return x.sourceId != 0; });
                            source.filterData.sort(function (a, b) {
                                if (a["sourceName"] < b["sourceName"])
                                    return -1;
                                else if (a["sourceName"] > b["sourceName"])
                                    return 1;
                                else
                                    return 0;
                            });
                            //for default value start //sortOrder=min  //childControlMappingId= max
                            var defaultValue = source.filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                            if (defaultValue.length > 0) {
                                source.selectedData = defaultValue[0]["defaultSourceId"];
                                source.sortOrder = defaultValue[0]["minYear"];
                                source.childControlMappingId = defaultValue[0]["maxYear"];
                                //added for recommended
                                var index = source.filterData.findIndex(function (x) { return x["sourceId"] == defaultValue[0]["defaultSourceId"]; });
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
                            this_12.sourceList.push(source);
                            this_12.onSourceChange(source.selectedData, source.filterName, source, 'code');
                            this_12.setSlider();
                        };
                        var this_12 = this;
                        for (var _w = 0, _x = this.geographySelected[0]; _w < _x.length; _w++) {
                            var reg = _x[_w];
                            _loop_16(reg);
                        }
                    }
                    else {
                        var source = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        source.filterName = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].label;
                        source.id = filterObjects.filter(function (x) { return x.value == filterValue[filterValue.length - 1]; })[0].value;
                        if (this.geographySelected[0].length > 0) {
                            source.filterType = "region";
                        }
                        source.filterData = [];
                        var sor = this.filtersRelationList.filter(function (x) { return _this.multiSelectValues[0] == x.cropId && filterValue[filterValue.length - 1] == x.regionId && x.territoryId == 0 && x.countryId == 0 && x["kpiId"] == _this.parameterId; });
                        for (var i = 0; i < sor.length; i++) {
                            if (flagSource[sor[i].sourceId]) {
                                continue;
                            }
                            flagSource[sor[i].sourceId] = true;
                            source.filterData.push(sor[i]);
                        }
                        source.filterData = source.filterData.filter(function (x) { return x.sourceId != 0; });
                        source.filterData.sort(function (a, b) {
                            if (a["sourceName"] < b["sourceName"])
                                return -1;
                            else if (a["sourceName"] > b["sourceName"])
                                return 1;
                            else
                                return 0;
                        });
                        //for default value start //sortOrder=min  //childControlMappingId= max
                        var defaultValue_5 = source.filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                        if (defaultValue_5.length > 0) {
                            source.selectedData = defaultValue_5[0]["defaultSourceId"];
                            source.sortOrder = defaultValue_5[0]["minYear"];
                            source.childControlMappingId = defaultValue_5[0]["maxYear"];
                            //added for recommended
                            var index = source.filterData.findIndex(function (x) { return x["sourceId"] == defaultValue_5[0]["defaultSourceId"]; });
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
    };
    FilterComponent.prototype.onSourceChange = function (filterValue, filterName, filterObjects, type) {
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["filterType"] = 'Source';
        selectedValue["filterData"] = filterObjects.filterData;
        selectedValue["selectedData"] = filterValue;
        this.selectedValueEmit.emit(selectedValue);
        if (filterValue > 0 && type == 'html') {
            var sourceObject = filterObjects.filterData.filter(function (x) { return x.sourceId == filterValue; });
            //let sourceMap: IFilters[] = this.sourceList.filter(x => x.filterName == filterName);        
            var index = this.sourceList.findIndex(function (x) { return x['filterName'] == filterName; });
            this.sourceList[index].childControlMappingId = +sourceObject[0].maxYear;
            this.sourceList[index].sortOrder = +sourceObject[0].minYear;
            this.setSlider();
        }
        var SourceNames = [];
        for (var _i = 0, _a = this.sourceList; _i < _a.length; _i++) {
            var name_7 = _a[_i];
            SourceNames.push(name_7.filterName);
        }
        var selectedValue2 = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue2["filterName"] = 'List';
        selectedValue2["selectedData"] = SourceNames;
        selectedValue2["filterType"] = this.sourceList[0].filterType;
        this.selectedValueEmit.emit(selectedValue2);
    };
    FilterComponent.prototype.setSlider = function () {
        var filterSlider = this.sourceList.map(function (x) { return Object.assign({}, x); });
        var filterSliders = filterSlider.filter(function (x) { return x.childControlMappingId != 0 && x.sortOrder != 0; });
        if (filterSliders.length > 0) {
            this.sliderMaxValue = Math.max.apply(Math, filterSliders.map(function (o) { return o.childControlMappingId; }));
            this.sliderMinValue = Math.min.apply(Math, filterSliders.map(function (o) { return o.sortOrder; }));
            this.submitVisible.emit(false);
        }
        else {
            this.submitVisible.emit(true);
        }
    };
    FilterComponent.prototype.onOverViewSourceDropdownChange = function (filterValue, filterName, filterObjects, type) {
        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
        selectedValue["filterName"] = filterName;
        selectedValue["selectedData"] = filterValue;
        selectedValue["filterType"] = 'Source';
        this.selectedValueEmit.emit(selectedValue);
        if (filterValue > 0 && type == 'html') {
            var sourceObject = filterObjects.filterData.filter(function (x) { return x.sourceId == filterValue; });
            var index = this.multipleSourceData.findIndex(function (x) { return x['filterName'] == filterName; });
            this.multipleSourceData[index].childControlMappingId = +sourceObject[0].maxYear;
            this.multipleSourceData[index].sortOrder = +sourceObject[0].minYear;
            this.setOverViewSlider();
        }
    };
    FilterComponent.prototype.setOverViewSlider = function () {
        var filterSlider = this.multipleSourceData.map(function (x) { return Object.assign({}, x); });
        var filterSliders = filterSlider.filter(function (x) { return x.childControlMappingId != 0 && x.sortOrder != 0; });
        if (filterSliders.length > 0) {
            this.sliderMaxValue = Math.max.apply(Math, filterSliders.map(function (o) { return o.childControlMappingId; }));
            this.sliderMinValue = Math.min.apply(Math, filterSliders.map(function (o) { return o.sortOrder; }));
            this.submitVisible.emit(false);
        }
        else {
            this.submitVisible.emit(true);
        }
    };
    FilterComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var _loop_17 = function(entry) {
            if (entry.filterType.toLocaleLowerCase() === 'slidery') {
                if (this_13.sliderYear && entry.isVisible === true) {
                    this_13.renderer.setElementStyle(this_13.sliderYear.nativeElement, 'display', 'block');
                }
                else {
                    this_13.renderer.setElementStyle(this_13.sliderYear.nativeElement, 'display', 'none');
                }
                if (this_13.cascadeDependency == "default") {
                    var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = "PeriodYear";
                    selectedValue["selectedData"] = entry.filterData[0]["defaultValue"];
                    this_13.selectedValueEmit.emit(selectedValue);
                }
                else if (this_13.cascadeDependency == "crop" || this_13.cascadeDependency == "region" || this_13.cascadeDependency == "regionminussource") {
                    if (this_13.cascadeDependency != "crop") {
                        sliderData = this_13.filtersRelationList.filter(function (x) { return x["cropId"] == _this.cropId && x["regionId"] == _this.level1DefaultSelected && x.sourceId == _this.sourceDefaultSelected && x.territoryId == 0 && x.countryId == 0; });
                        if (sliderData.length > 0) {
                            this_13.sliderMinValue = +sliderData[0].minYear;
                            this_13.sliderMaxValue = +sliderData[0].maxYear;
                            this_13.sliderSelected = sliderData[0].defaultValue;
                        }
                        else {
                            this_13.sliderMinValue = entry.filterData[0]['minValue'];
                            this_13.sliderMaxValue = entry.filterData[0]['maxValue'];
                            this_13.sliderSelected = entry.filterData[0]['defaultValue'];
                        }
                    }
                    else if (this_13.cascadeDependency == "crop") {
                        var filterSlider = this_13.multipleSourceData.map(function (x) { return Object.assign({}, x); });
                        var filterSliders = filterSlider.filter(function (x) { return x.childControlMappingId != 0 && x.sortOrder != 0; });
                        if (filterSliders.length > 0) {
                            this_13.sliderMaxValue = Math.max.apply(Math, filterSliders.map(function (o) { return o.childControlMappingId; }));
                            this_13.sliderMinValue = Math.min.apply(Math, filterSliders.map(function (o) { return o.sortOrder; }));
                            this_13.sliderSelected = entry.filterData[0]['defaultValue'];
                        }
                        else {
                            this_13.sliderMinValue = entry.filterData[0]['minValue'];
                            this_13.sliderMaxValue = entry.filterData[0]['maxValue'];
                            this_13.sliderSelected = entry.filterData[0]['defaultValue'];
                        }
                    }
                    var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = "PeriodYear";
                    selectedValue["selectedData"] = this_13.sliderSelected;
                    this_13.selectedValueEmit.emit(selectedValue);
                }
                else if (this_13.cascadeDependency == "cropComparison") {
                    this_13.sliderMinValue = entry.filterData[0]['minValue'];
                    this_13.sliderMaxValue = entry.filterData[0]['maxValue'];
                    this_13.sliderSelected = entry.filterData[0]['defaultValue'];
                    this_13.defaultsliderMinValue = this_13.sliderMinValue;
                    this_13.defaultsliderMaxValue = this_13.sliderMaxValue;
                    this_13.defaultsliderSelected = this_13.sliderSelected;
                    var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = "PeriodYear";
                    selectedValue["selectedData"] = this_13.sliderSelected;
                    this_13.selectedValueEmit.emit(selectedValue);
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'sliderq') {
                if (this_13.sliderQuarter && entry.isVisible === true) {
                    this_13.renderer.setElementStyle(this_13.sliderQuarter.nativeElement, 'display', 'block');
                }
                else {
                    this_13.renderer.setElementStyle(this_13.sliderQuarter.nativeElement, 'display', 'none');
                }
                var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = "PeriodQuarter";
                selectedValue["selectedData"] = entry.filterData[0]["defaultValue"];
                this_13.selectedValueEmit.emit(selectedValue);
            }
            else if (entry.filterType.toLocaleLowerCase() === 'monthlydropdowns') {
                if (this_13.monthlyDropdowns && entry.isVisible === true) {
                    this_13.renderer.setElementStyle(this_13.monthlyDropdowns.nativeElement, 'display', 'block');
                }
                else {
                    this_13.renderer.setElementStyle(this_13.monthlyDropdowns.nativeElement, 'display', 'none');
                }
                for (var _i = 0, _a = entry.filterData; _i < _a.length; _i++) {
                    var en = _a[_i];
                    var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = en["filterName"];
                    if (en["selectedData"])
                        selectedValue["selectedData"] = en["selectedData"];
                    else
                        selectedValue["selectedData"] = en["filterData"][0]["labelId"];
                    if (en["filterName"].toLocaleLowerCase() == "from year")
                        this_13.monthly[0] = +selectedValue["selectedData"];
                    else if (en["filterName"].toLocaleLowerCase() == "from month" || en["filterName"].toLocaleLowerCase() == "from quarter")
                        this_13.monthly[1] = +selectedValue["selectedData"];
                    else if (en["filterName"].toLocaleLowerCase() == "to year")
                        this_13.monthly[2] = +selectedValue["selectedData"];
                    else if (en["filterName"].toLocaleLowerCase() == "to month" || en["filterName"].toLocaleLowerCase() == "to quarter")
                        this_13.monthly[3] = +selectedValue["selectedData"];
                    this_13.selectedValueEmit.emit(selectedValue);
                    this_13.selectedValueEmit.emit(selectedValue);
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdown' || entry.filterType.toLocaleLowerCase() === 'dropdownparent') {
                var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = entry.filterName;
                if (entry.filterName.toLocaleLowerCase() == 'crop') {
                    if (entry.selectedData) {
                        selectedValue["selectedData"] = entry.selectedData;
                        selectedValue["filterData"] = entry.filterData.filter(function (x) { return x["labelId"] == +entry.selectedData; });
                    }
                    else {
                        selectedValue["selectedData"] = global_util_1.GlobalUtil.getSession("CropId");
                        this_13.cropId = global_util_1.GlobalUtil.getSession("CropId");
                        selectedValue["filterData"] = entry.filterData.filter(function (x) { return x["labelId"] == +_this.cropId; });
                    }
                }
                else if (entry.filterName.toLocaleLowerCase() == 'source' && this_13.cascadeDependency != "default") {
                    if (this_13.sourceDefaultSelected) {
                        selectedValue["selectedData"] = +this_13.sourceDefaultSelected;
                        selectedValue["filterData"] = entry.filterData.filter(function (x) { return x["sourceId"] == +_this.sourceDefaultSelected; });
                    }
                    else {
                        selectedValue["selectedData"] = +this_13.sourceDefaultSelected;
                    }
                }
                else if (entry.filterName.toLocaleLowerCase() == 'parameter' && this_13.filtersRelationList.length > 0) {
                    this_13.multiSelectList = [];
                    flags = [];
                    if (entry.selectedData) {
                        this_13.parameterId = +entry.selectedData;
                        selectedValue["selectedData"] = entry.selectedData;
                        selectedValue["filterData"] = entry.filterData.filter(function (x) { return x["labelId"] == +entry.selectedData; });
                    }
                    else {
                        this_13.parameterId = +entry.filterData[0]["labelId"];
                        selectedValue["selectedData"] = entry.filterData[0]["labelId"];
                        selectedValue["filterData"] = entry.filterData.filter(function (x) { return x["labelId"] == +entry.filterData[0]["labelId"]; });
                    }
                    var reg = this_13.filtersRelationList.filter(function (y) { return y["kpiId"] == _this.parameterId; });
                    for (var i = 0; i < reg.length; i++) {
                        if (flags[reg[i].cropId]) {
                            continue;
                        }
                        flags[reg[i].cropId] = true;
                        this_13.multiSelectList.push(reg[i]);
                    }
                    this_13.multiSelectList.sort(function (a, b) {
                        if (a["cropName"] < b["cropName"])
                            return -1;
                        else if (a["cropName"] > b["cropName"])
                            return 1;
                        else
                            return 0;
                    });
                    for (var i = 0; i < this_13.multiSelectList.length; i++) {
                        this_13.multiSelectList[i].label = this_13.multiSelectList[i].cropName;
                        this_13.multiSelectList[i].value = this_13.multiSelectList[i].cropId;
                    }
                }
                else {
                    if (entry.selectedData) {
                        selectedValue["selectedData"] = entry.selectedData;
                        selectedValue["filterData"] = entry.filterData.filter(function (x) { return x["labelId"] == +entry.selectedData; });
                    }
                    else {
                        selectedValue["selectedData"] = entry.filterData[0]["labelId"];
                        selectedValue["filterData"] = entry.filterData.filter(function (x) { return x["labelId"] == +entry.filterData[0]["labelId"]; });
                    }
                }
                this_13.selectedValueEmit.emit(selectedValue);
                if (this_13.childdropdown) {
                    this_13.renderer.setElementStyle(this_13.childdropdown.nativeElement, 'display', 'none');
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'radiobutton' || entry.filterType.toLocaleLowerCase() === 'radiobuttonstatic') {
                var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = entry.filterName;
                selectedValue["selectedData"] = entry.selectedData;
                if (entry.filterName.toLocaleLowerCase() === 'choose via') {
                    this_13.cropComparison = entry.selectedData;
                    if (this_13.cropComparison == "Crop") {
                        this_13.multiselectlimit = 5;
                        this_13.geographylimit = 1;
                    }
                    else if (this_13.cropComparison == "Geography") {
                        this_13.multiselectlimit = 1;
                        this_13.geographylimit = 5;
                    }
                }
                this_13.selectedValueEmit.emit(selectedValue);
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdownmultiplesource') {
                for (var i = 0; i < this_13.multipleSourceData.length; i++) {
                    var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = this_13.multipleSourceData[i].filterName;
                    //selectedValue["selectedData"] = this.sourceOverViewDefault[i];
                    selectedValue["selectedData"] = this_13.multipleSourceData[i].selectedData;
                    selectedValue["filterType"] = 'Source';
                    this_13.selectedValueEmit.emit(selectedValue);
                }
            }
        };
        var this_13 = this;
        var sliderData, flags;
        for (var _b = 0, _c = this.filtersList; _b < _c.length; _b++) {
            var entry = _c[_b];
            _loop_17(entry);
        }
    };
    FilterComponent.prototype.ngOnChanges = function () {
        var _this = this;
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
        for (var _i = 0, _a = this.filtersList; _i < _a.length; _i++) {
            var ent = _a[_i];
            if (ent.filterType.toLocaleLowerCase() === 'dropdown') {
                if (ent.filterName.toLocaleLowerCase() == 'crop') {
                    if (ent.selectedData) {
                        this.cropId = +ent.selectedData;
                    }
                    else {
                        this.cropId = global_util_1.GlobalUtil.getSession("CropId");
                    }
                }
            }
            //for dropdownMultipleSource
            if (ent.filterType.toLocaleLowerCase() === 'dropdownmultiplesource') {
                this.multipleSourceData = ent.filterData;
            }
        }
        var _loop_18 = function(entry) {
            if (entry.filterType.toLocaleLowerCase() === 'multiselect') {
                //newly added
                this_14.multiSelectList = entry.filterData;
                if (entry.filterName.toLocaleLowerCase() == 'crop') {
                    if (entry.selectedData) {
                        if (entry.selectedData.toLocaleLowerCase() == "session") {
                            var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                            selectedValue["filterName"] = entry.filterName;
                            selectedValue["selectedData"] = [+global_util_1.GlobalUtil.getSession("CropId")];
                            this_14.selectedValueEmit.emit(selectedValue);
                            this_14.multiSelectValues = [+global_util_1.GlobalUtil.getSession("CropId")];
                        }
                    }
                }
                else if (entry.selectedData) {
                    this_14.multiSelectValues = [+entry.selectedData];
                    var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    selectedValue["filterName"] = entry.filterName;
                    selectedValue["selectedData"] = [+entry.selectedData];
                    this_14.selectedValueEmit.emit(selectedValue);
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'geographycascademultiselects') {
                this_14.sliderMinValue = 2000;
                this_14.sliderMaxValue = 2030;
                this_14.sliderSelected = [2012, 2016];
                this_14.cascadeDependency = "priceComparison";
                var checkArray = this_14.filtersRelationList.filter(function (x) { return x.kpiId == 48; });
                if (this_14.filtersRelationList.length !== checkArray.length) {
                    this_14.cascadeDependency = "cropComparison";
                }
                for (i = this_14.filtersRelationList.length; i--;) {
                    if (this_14.filtersRelationList[i] !== checkArray[i]) {
                        this_14.cascadeDependency = "cropComparison";
                        break;
                    }
                }
                for (var _b = 0, _c = entry.filterData ? entry.filterData : []; _b < _c.length; _b++) {
                    var en = _c[_b];
                    if (en["filterName"].toLocaleLowerCase() == "region") {
                        this_14.geographyFullData[0] = en["filterData"];
                        //commented for crop cascading
                        if (en["selectedData"]) {
                            this_14.geographySelected[0] = [+en["selectedData"]];
                        }
                        else {
                            this_14.geographySelected[0] = [];
                        }
                        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue["filterName"] = en["filterName"];
                        selectedValue["selectedData"] = this_14.geographySelected[0];
                        this_14.selectedValueEmit.emit(selectedValue);
                    }
                    if (en["filterName"].toLocaleLowerCase() == "territory") {
                        this_14.geographyFullData[1] = en["filterData"];
                        if (en["selectedData"]) {
                            this_14.geographySelected[1] = [+en["selectedData"]];
                        }
                        else {
                            this_14.geographySelected[1] = [];
                        }
                        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue["filterName"] = en["filterName"];
                        selectedValue["selectedData"] = this_14.geographySelected[1];
                        this_14.selectedValueEmit.emit(selectedValue);
                    }
                    if (en["filterName"].toLocaleLowerCase() == "country") {
                        this_14.geographyFullData[2] = en["filterData"];
                        if (en["selectedData"]) {
                            this_14.geographySelected[2] = [+en["selectedData"]];
                        }
                        else {
                            this_14.geographySelected[2] = [];
                        }
                        var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                        selectedValue["filterName"] = en["filterName"];
                        selectedValue["selectedData"] = this_14.geographySelected[2];
                        this_14.selectedValueEmit.emit(selectedValue);
                    }
                }
                if (this_14.cascadeDependency == "priceComparison") {
                    this_14.parameterId = 48;
                    this_14.regionId = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId;
                    this_14.geography[0] = [];
                    this_14.geographySelected[0] = [];
                    //adding source on the basis crop Id seession
                    var source = { id: 0, filterType: '', filterName: '', filterData: [], sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                    source.filterName = global_util_1.GlobalUtil.getSession("CropName");
                    source.id = +global_util_1.GlobalUtil.getSession("CropId");
                    source.filterData = [];
                    source.selectedData = 0;
                    this_14.sourceList.push(source);
                    this_14.onSourceChange(source.selectedData, source.filterName, source, 'code');
                    //adding source on the basis crop Id seession
                    flags = [];
                    //cloning problem
                    var cloned = this_14.filtersRelationList.map(function (x) { return Object.assign({}, x); });
                    var reg_1 = cloned.filter(function (y) { return y["cropId"] == global_util_1.GlobalUtil.getSession("CropId") && y["kpiId"] == 48; });
                    var _loop_19 = function(i_1) {
                        if (flags[reg_1[i_1].regionId]) {
                            if (reg_1[i_1].regionShade == '0') {
                                var index = this_14.geography[0].findIndex(function (x) { return x['regionId'] == reg_1[i_1].regionId; });
                                if (index >= 0) {
                                    this_14.geography[0][index]['regionShade'] == '0';
                                }
                            }
                            return "continue";
                        }
                        flags[reg_1[i_1].regionId] = true;
                        this_14.geography[0].push(reg_1[i_1]);
                    };
                    for (var i_1 = 0; i_1 < reg_1.length; i_1++) {
                        _loop_19(i_1);
                    }
                    this_14.geography[0].sort(function (a, b) {
                        if (a["regionName"] < b["regionName"])
                            return -1;
                        else if (a["regionName"] > b["regionName"])
                            return 1;
                        else
                            return 0;
                    });
                    //check user session region exist in region multiselect 
                    var present = false;
                    for (var i_2 = 0; i_2 < this_14.geography[0].length; i_2++) {
                        this_14.geography[0][i_2].label = this_14.geography[0][i_2].regionName;
                        this_14.geography[0][i_2].value = this_14.geography[0][i_2].regionId;
                        //delete this.geography[0][i].regionName;
                        if (this_14.geography[0][i_2].value == this_14.regionId) {
                            present = true;
                            this_14.geographySelected[0].push(this_14.regionId);
                        }
                    }
                    this_14.onChangeGeographyMultiSelect(this_14.geographySelected[0], "Region", this_14.geography[0]);
                }
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdownlevel1') {
                level1selectedId = 0;
                this_14.regionId = global_util_1.GlobalUtil.getAppSession("UserInfo").regionId;
                if (this_14.cascadeDependency == "region" || this_14.cascadeDependency == "regionminussource") {
                    this_14.cropId = 0;
                }
                if (this_14.cascadeDependency == 'default') {
                    if (entry.selectedData)
                        level1selectedId = +entry.selectedData;
                    else
                        level1selectedId = entry.filterData[0]["labelId"];
                    this_14.level1fullData = entry.filterData;
                    this_14.level1filterData = entry.filterData;
                }
                else if (this_14.cascadeDependency == 'crop' || this_14.cascadeDependency == 'region' || this_14.cascadeDependency == "regionminussource") {
                    this_14.level1fullData = entry.filterData;
                    this_14.level1filterData = [];
                    fullData = this_14.filtersRelationList.filter(function (x) { return x["cropId"] == _this.cropId; });
                    flags = [];
                    for (var i_3 = 0; i_3 < fullData.length; i_3++) {
                        if (flags[fullData[i_3].regionId])
                            continue;
                        flags[fullData[i_3].regionId] = true;
                        this_14.level1filterData.push(fullData[i_3]);
                    }
                    this_14.level1filterData.sort(function (a, b) {
                        if (a["regionName"] < b["regionName"])
                            return -1;
                        else if (a["regionName"] > b["regionName"])
                            return 1;
                        else
                            return 0;
                    });
                    if (this_14.level1filterData.filter(function (x) { return x["regionId"] == _this.regionId; }).length > 0)
                        level1selectedId = this_14.regionId;
                    else if (this_14.level1filterData.length > 0)
                        //level1selectedId = this.level1filterData[0]["regionId"];
                        level1selectedId = 0;
                    this_14.level1DefaultSelected = +level1selectedId;
                    //fullTerritoryData
                    fullTerritoryData = fullData.filter(function (x) { return x.regionId == level1selectedId; });
                }
                var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
                selectedValue["filterName"] = entry.filterName;
                selectedValue["selectedData"] = +level1selectedId;
                selectedValue["filterData"] = entry.filterData.filter(function (x) { return x["labelId"] == +level1selectedId; });
                this_14.selectedValueEmit.emit(selectedValue);
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdownlevel2') {
                this_14.level2fullData = entry.filterData;
                this_14.dropdownlevel2FilterName = entry.filterName;
            }
            else if (entry.filterType.toLocaleLowerCase() === 'dropdownlevel3') {
                this_14.level3fullData = entry.filterData;
                this_14.dropdownlevel3FilterName = entry.filterName;
            }
        };
        var this_14 = this;
        var i, flags, level1selectedId, fullData, , fullTerritoryData;
        for (var _d = 0, _e = this.filtersList; _d < _e.length; _d++) {
            var entry = _e[_d];
            _loop_18(entry);
        }
        var level2selectedId = 0;
        if (this.level2fullData.length > 0) {
            if (this.cascadeDependency == 'default') {
                this.level2filterData = this.level2fullData.filter(function (x) { return x["parent1Id"] == level1selectedId; });
                if (this.level2filterData.length > 0)
                    level2selectedId = this.level2filterData[0]["labelId"];
            }
            else if (this.cascadeDependency == 'crop' || this.cascadeDependency == 'region' || this.cascadeDependency == "regionminussource") {
                this.level2filterData = [];
                var ters = [];
                //var fullTerritoryData: any;
                //fullTerritoryData = fullData.filter((x: any) => x.regionId == level1selectedId); 
                for (var i_4 = 0; i_4 < fullTerritoryData.length; i_4++) {
                    if (ters[fullTerritoryData[i_4].territoryId])
                        continue;
                    ters[fullTerritoryData[i_4].territoryId] = true;
                    this.level2filterData.push(fullTerritoryData[i_4]);
                }
                this.level2filterData = this.level2filterData.filter(function (x) { return x.territoryId != 0; });
                this.level2filterData.sort(function (a, b) {
                    if (a["territoryName"] < b["territoryName"])
                        return -1;
                    else if (a["territoryName"] > b["territoryName"])
                        return 1;
                    else
                        return 0;
                });
                if (this.level2filterData.length > 0)
                    level2selectedId = this.level2filterData[0]["territoryId"];
            }
            var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = this.dropdownlevel2FilterName;
            //selectedValue["selectedData"] = +level2selectedId;
            selectedValue["selectedData"] = 0;
            this.selectedValueEmit.emit(selectedValue);
        }
        if (this.level3fullData.length > 0) {
            if (this.cascadeDependency == 'default') {
                this.level3filterData = this.level3fullData.filter(function (x) { return x["parent1Id"] == level1selectedId; });
            }
            else if (this.cascadeDependency == 'crop' || this.cascadeDependency == 'region' || this.cascadeDependency == "regionminussource") {
                var conts = [];
                var fullCountryData2;
                fullCountryData2 = fullTerritoryData;
                fullCountryData2 = fullCountryData2.filter(function (x) { return x.territoryId == 0; });
                for (var i_5 = 0; i_5 < fullCountryData2.length; i_5++) {
                    if (conts[fullCountryData2[i_5].countryId])
                        continue;
                    conts[fullCountryData2[i_5].countryId] = true;
                    this.level3filterData.push(fullCountryData2[i_5]);
                }
                this.level3filterData = this.level3filterData.filter(function (x) { return x.countryId != 0; });
                this.level3filterData.sort(function (a, b) {
                    if (a["countryName"] < b["countryName"])
                        return -1;
                    else if (a["countryName"] > b["countryName"])
                        return 1;
                    else
                        return 0;
                });
                //added for source
                if (this.cascadeDependency != "crop") {
                    var fullSourceData = fullTerritoryData;
                    fullSourceData = fullSourceData.filter(function (x) { return x.territoryId == 0 && x.countryId == 0; });
                    var src = [];
                    for (var i_6 = 0; i_6 < fullSourceData.length; i_6++) {
                        if (src[fullSourceData[i_6].sourceId])
                            continue;
                        src[fullSourceData[i_6].sourceId] = true;
                        this.sourceData.push(fullSourceData[i_6]);
                    }
                    this.sourceData = this.sourceData.filter(function (x) { return x.sourceId != 0; });
                    this.sourceData.sort(function (a, b) {
                        if (a["sourceName"] < b["sourceName"])
                            return -1;
                        else if (a["sourceName"] > b["sourceName"])
                            return 1;
                        else
                            return 0;
                    });
                    if (this.sourceData.length > 0)
                        this.sourceDefaultSelected = this.sourceData[0]["sourceId"];
                    else
                        this.sourceDefaultSelected = 0;
                    //forSliderHtmlload
                    var sliderData = this.filtersRelationList.filter(function (x) { return x["cropId"] == _this.cropId && x["regionId"] == _this.level1DefaultSelected && x.sourceId == _this.sourceDefaultSelected && x.territoryId == 0 && x.countryId == 0; });
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
                    var _loop_20 = function(i_7) {
                        fullSourceData = fullTerritoryData;
                        fullSourceData = fullSourceData.filter(function (x) { return x.territoryId == 0 && x.countryId == 0 && x.widgetName == _this.multipleSourceData[i_7].filterName; });
                        src = [];
                        for (var k = 0; k < fullSourceData.length; k++) {
                            if (src[fullSourceData[k].sourceId])
                                continue;
                            src[fullSourceData[k].sourceId] = true;
                            //this.sourceOverView[i].push(fullSourceData[i]);
                            this_15.multipleSourceData[i_7].filterData.push(fullSourceData[k]);
                        }
                        this_15.multipleSourceData[i_7].filterData = this_15.multipleSourceData[i_7].filterData.filter(function (x) { return x.sourceId != 0; });
                        this_15.multipleSourceData[i_7].filterData.sort(function (a, b) {
                            if (a["sourceName"] < b["sourceName"])
                                return -1;
                            else if (a["sourceName"] > b["sourceName"])
                                return 1;
                            else
                                return 0;
                        });
                        var defaultValue = this_15.multipleSourceData[i_7].filterData.filter(function (x) { return x.defaultSourceId == x.sourceId; });
                        if (defaultValue.length > 0) {
                            //this.sourceOverViewDefault[i] = defaultValue[0]["defaultSourceId"];
                            this_15.multipleSourceData[i_7].selectedData = defaultValue[0]["defaultSourceId"];
                            this_15.multipleSourceData[i_7].sortOrder = defaultValue[0]["minYear"];
                            this_15.multipleSourceData[i_7].childControlMappingId = defaultValue[0]["maxYear"];
                            //added for recommended
                            var index = this_15.multipleSourceData[i_7].filterData.findIndex(function (x) { return x["sourceId"] == defaultValue[0]["defaultSourceId"]; });
                            if (!this_15.multipleSourceData[i_7].filterData[index]["sourceName"].includes("recommended"))
                                this_15.multipleSourceData[i_7].filterData[index]["sourceName"] = this_15.multipleSourceData[i_7].filterData[index]["sourceName"] + " (recommended)";
                        }
                        else if (this_15.multipleSourceData[i_7].filterData.length > 0) {
                            this_15.multipleSourceData[i_7].selectedData = this_15.multipleSourceData[i_7].filterData[0]["sourceId"];
                            this_15.multipleSourceData[i_7].sortOrder = this_15.multipleSourceData[i_7].filterData[0]["minYear"];
                            this_15.multipleSourceData[i_7].childControlMappingId = this_15.multipleSourceData[i_7].filterData[0]["maxYear"];
                        }
                        else {
                            this_15.multipleSourceData[i_7].selectedData = 0;
                            this_15.multipleSourceData[i_7].sortOrder = 0;
                            this_15.multipleSourceData[i_7].childControlMappingId = 0;
                        }
                    };
                    var this_15 = this;
                    var fullSourceData, src;
                    for (var i_7 = 0; i_7 < this.multipleSourceData.length; i_7++) {
                        _loop_20(i_7);
                    }
                    this.sliderMinValue = 2000;
                    this.sliderMaxValue = 2020;
                    this.sliderSelected = [2012, 2016];
                    this.setOverViewSlider();
                }
            }
            var selectedValue = { id: 0, filterType: '', filterName: '', filterData: null, sortOrder: 0, selectedData: '', isVisible: true, childControlMappingId: 0 };
            selectedValue["filterName"] = this.dropdownlevel3FilterName;
            //selectedValue["selectedData"] = +level3selectedId;
            selectedValue["selectedData"] = 0;
            this.selectedValueEmit.emit(selectedValue);
        }
        if (this.childdropdown) {
            this.renderer.setElementStyle(this.childdropdown.nativeElement, 'display', 'none');
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FilterComponent.prototype, "filtersList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FilterComponent.prototype, "widgetId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FilterComponent.prototype, "monthlyTypeHtml", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FilterComponent.prototype, "maxQuarterLimit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], FilterComponent.prototype, "filtersRelationList", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FilterComponent.prototype, "selectedValueEmit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FilterComponent.prototype, "submitVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], FilterComponent.prototype, "submitMessage", void 0);
    __decorate([
        core_1.ViewChild('sliderYear'), 
        __metadata('design:type', core_1.ElementRef)
    ], FilterComponent.prototype, "sliderYear", void 0);
    __decorate([
        core_1.ViewChild('sliderQuarter'), 
        __metadata('design:type', core_1.ElementRef)
    ], FilterComponent.prototype, "sliderQuarter", void 0);
    __decorate([
        core_1.ViewChild('monthlyDropdowns'), 
        __metadata('design:type', core_1.ElementRef)
    ], FilterComponent.prototype, "monthlyDropdowns", void 0);
    __decorate([
        core_1.ViewChild('childdropdown'), 
        __metadata('design:type', core_1.ElementRef)
    ], FilterComponent.prototype, "childdropdown", void 0);
    __decorate([
        core_1.ViewChild('radio'), 
        __metadata('design:type', core_1.ElementRef)
    ], FilterComponent.prototype, "radio", void 0);
    __decorate([
        core_1.ViewChild('dropdown'), 
        __metadata('design:type', core_1.ElementRef)
    ], FilterComponent.prototype, "dropdown", void 0);
    FilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-filter',
            templateUrl: 'filter.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], FilterComponent);
    return FilterComponent;
}());
exports.FilterComponent = FilterComponent;
//# sourceMappingURL=filter.component.js.map