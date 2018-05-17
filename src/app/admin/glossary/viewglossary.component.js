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
var router_1 = require('@angular/router');
var glossary_service_1 = require('../../widgets/glossary/glossary.service');
var global_config_1 = require('../../global/global.config');
var global_util_1 = require('../../global/global.util');
var ViewGlossaryComponent = (function () {
    function ViewGlossaryComponent(glossaryService, router) {
        this.glossaryService = glossaryService;
        this.router = router;
        this.alphabetwisecount = {};
        this.totalcount = 0;
        this.elementcount = global_config_1.GlobalConfig.glossaryloadcount;
        this.isAdmin = (global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || global_util_1.GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin") ? true : false;
        this.startIndex = 1;
        this.linkclick = "javaScript:void(0)";
        this.endIndex = this.startIndex + this.elementcount;
        this.editIndex = -1;
        this.fixed = false;
        this.alphabets = { 'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0 };
    }
    ;
    ;
    ViewGlossaryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.glossaryService.getterms(this.startIndex, this.endIndex, true).subscribe(function (result) {
            _this.glossary = JSON.parse(result);
            _this.glossaryData = [];
            _this.glossaryData = _this.glossary.data;
            _this.alphabetwisecount = _this.glossary.alphabetcount;
            var prev = 1;
            var prevcount = 0;
            for (var _i = 0, _a = _this.listkeys(_this.alphabets); _i < _a.length; _i++) {
                var key = _a[_i];
                if (_this.checkkey(key)) {
                    if (key == "a") {
                        _this.alphabets[key] = prev;
                        prevcount = _this.alphabetwisecount[key];
                        _this.totalcount = _this.totalcount + _this.alphabetwisecount[key];
                    }
                    else {
                        _this.alphabets[key] = prevcount + prev;
                        prev = _this.alphabets[key];
                        prevcount = _this.alphabetwisecount[key];
                        _this.totalcount = _this.totalcount + _this.alphabetwisecount[key];
                    }
                }
            }
            _this.customAffix = {
                'aToXbottom38': false,
                'affix': false
            };
        });
    };
    ViewGlossaryComponent.prototype.checkkey = function (givenkey) {
        if (this.alphabetwisecount[givenkey])
            return true;
        else
            return false;
    };
    ViewGlossaryComponent.prototype.getKeyByValue = function (value) {
        var _this = this;
        if (Object.keys(this.alphabets).find(function (key) { return _this.alphabets[key] === value; }))
            return Object.keys(this.alphabets).find(function (key) { return _this.alphabets[key] === value; });
        else
            return "-1";
    };
    ViewGlossaryComponent.prototype.filterdata = function (a) {
        return this.glossaryData.filter(function (x) { return x.term.toLocaleLowerCase().startsWith(a); });
    };
    ViewGlossaryComponent.prototype.LoadTerms = function (start, end) {
        var _this = this;
        this.glossaryService.getterms(start, end, false).subscribe(function (result) {
            var index = 0;
            _this.glossary = JSON.parse(result);
            for (var data in _this.glossary.data) {
                _this.glossaryData.push(_this.glossary.data[index++]);
            }
        });
    };
    ViewGlossaryComponent.prototype.onSelect = function (alphabet, index) {
        this.editIndex = index + this.alphabets[alphabet];
    };
    ViewGlossaryComponent.prototype.onDelete = function (val) {
        var _this = this;
        var confirmationMessage;
        confirmationMessage = "Are you sure, you want to delete this glossary term and definition?";
        var res = confirm(confirmationMessage);
        if (res) {
            this.glossaryService.deleteGlossary(val.termId)
                .subscribe(function (data) {
                if (data == 3) {
                    console.log("Server Error.");
                }
                else if (data == 0) {
                    alert("Term does not exist.");
                }
                else if (data == 1) {
                    alert("Term and definition have been deleted successfully");
                    _this.ngOnInit();
                }
            });
        }
    };
    ViewGlossaryComponent.prototype.onUpdate = function (updateddata) {
        this.glossaryData[this.editIndex - 1] = updateddata;
        this.editIndex = -1;
    };
    ViewGlossaryComponent.prototype.onCancel = function () {
        this.editIndex = -1;
    };
    ViewGlossaryComponent.prototype.getIndex = function (alphabet, index) {
        return index + this.alphabets[alphabet];
    };
    ViewGlossaryComponent.prototype.listkeys = function (model) {
        var keys = new Array();
        var objectKeys = Object.keys;
        keys = objectKeys(model);
        return keys;
    };
    ViewGlossaryComponent.prototype.onfocus = function (key) {
        if (this.alphabets[key] > this.endIndex) {
            this.startIndex = this.endIndex + 1;
            this.endIndex = this.alphabets[key] + this.elementcount;
            this.LoadTerms(this.startIndex, this.endIndex);
        }
    };
    ViewGlossaryComponent.prototype.onalphabetclick = function (key) {
        //if (this.alphabets[key] <= this.endIndex) {
        //    this.linkclick = "#" + key;
        //    window.location.hash = this.linkclick;
        //}
        //else {
        //    this.startIndex = this.endIndex + 1;
        //    this.endIndex = this.alphabets[key] + this.elementcount;
        //    this.LoadTerms(this.startIndex, this.endIndex);
        //    this.linkclick = "#" + key;
        //    this.change = 1;
        //}
        this.linkclick = "#" + key;
    };
    ViewGlossaryComponent.prototype.onScroll = function (event) {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        var innerHeight = window.innerHeight;
        var docHeight = document.documentElement.offsetHeight;
        if ((window.innerHeight + scrollTop) >= document.body.offsetHeight && this.endIndex <= this.totalcount) {
            this.startIndex = this.endIndex + 1;
            this.endIndex = this.endIndex + this.elementcount;
            this.LoadTerms(this.startIndex, this.endIndex);
        }
        //if (scrollTop > 600) {
        //    this.fixed = true;
        //} else if (this.fixed && scrollTop < 600) {
        //    this.fixed = false;
        //}
        if ((scrollTop + innerHeight) > (docHeight - 200)) {
            this.customAffix = {
                'aToXbottom38': true,
                'affix': false
            };
        }
        else if (scrollTop > 205) {
            this.customAffix = {
                'aToXbottom38': false,
                'affix': true
            };
        }
        else {
            this.customAffix = {
                'aToXbottom38': false,
                'affix': false
            };
        }
    };
    ViewGlossaryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'viewglossary.component.html',
        }), 
        __metadata('design:paramtypes', [glossary_service_1.GlossaryService, router_1.Router])
    ], ViewGlossaryComponent);
    return ViewGlossaryComponent;
}());
exports.ViewGlossaryComponent = ViewGlossaryComponent;
//# sourceMappingURL=viewglossary.component.js.map