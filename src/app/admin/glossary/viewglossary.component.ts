import { Component, OnInit, Input, ViewChild, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { IGlossaryViewModel } from '../../widgets/glossary/glossary';
import { IALphabetCount } from '../../widgets/glossary/glossary';
import { glossaryData } from '../../widgets/glossary/glossary';
import { GlossaryService } from '../../widgets/glossary/glossary.service';
import { GlobalConfig } from '../../global/global.config';
import { GlobalUtil } from '../../global/global.util';

@Component({
    moduleId: module.id,
    templateUrl: 'viewglossary.component.html',

})
export class ViewGlossaryComponent {
    glossaryData: IGlossaryViewModel[];
    glossary: glossaryData;
    alphabetwisecount: IALphabetCount = {};
    totalcount: number = 0;;
    elementcount: number = GlobalConfig.glossaryloadcount;
    isAdmin: boolean = (GlobalUtil.getAppSession("UserInfo").roles[0] == "Portal Admin" || GlobalUtil.getAppSession("UserInfo").roles[0] == "Regional Admin")? true : false;
    startIndex: number = 1;
    linkclick: string = "javaScript:void(0)";
    endIndex: number = this.startIndex + this.elementcount;
    editIndex: number = -1;
    fixed: boolean = false;
    alphabets: any = { 'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0, 'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0, 's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0 };
    constructor(private glossaryService: GlossaryService, private router: Router) {
    };

    ngOnInit(): void {
        this.glossaryService.getterms(this.startIndex, this.endIndex, true).subscribe((result: any) => {
            this.glossary = JSON.parse(result);
            this.glossaryData = [];
            this.glossaryData = this.glossary.data;
            this.alphabetwisecount = this.glossary.alphabetcount;
            var prev = 1;
            var prevcount = 0;
            for (let key of this.listkeys(this.alphabets)) {
                if (this.checkkey(key)) {
                    if (key == "a") {
                        this.alphabets[key] = prev;
                        prevcount = this.alphabetwisecount[key];
                        this.totalcount = this.totalcount + this.alphabetwisecount[key];
                    }
                    else {
                        this.alphabets[key] = prevcount + prev;
                        prev = this.alphabets[key];
                        prevcount = this.alphabetwisecount[key];
                        this.totalcount = this.totalcount + this.alphabetwisecount[key];
                    }

                }

            }

            this.customAffix = {
                'aToXbottom38': false,
                'affix': false
            }
        });
    }


    checkkey(givenkey: string) {
        if (this.alphabetwisecount[givenkey])
            return true;
        else
            return false;
    }

    getKeyByValue(value: number): string {
        if (Object.keys(this.alphabets).find(key => this.alphabets[key] === value))
            return Object.keys(this.alphabets).find(key => this.alphabets[key] === value);
        else
            return "-1";
    }

    filterdata(a: string): any {
        return this.glossaryData.filter(x => x.term.toLocaleLowerCase().startsWith(a));
    }

    LoadTerms(start: number, end: number): void {
        this.glossaryService.getterms(start, end, false).subscribe((result: any) => {
            var index = 0;
            this.glossary = JSON.parse(result);
            for (var data in this.glossary.data) {
                this.glossaryData.push(this.glossary.data[index++]);
            }
        });
    }
    onSelect(alphabet: string, index: number) {

        this.editIndex = index + this.alphabets[alphabet];
    }

    onDelete(val: any) {
        let confirmationMessage: string;
        confirmationMessage = "Are you sure, you want to delete this glossary term and definition?";
        let res: boolean = confirm(confirmationMessage);
        if (res) {
            this.glossaryService.deleteGlossary(val.termId)
                .subscribe(data => {
                    if (data == 3) {
                        console.log("Server Error.");
                    }
                    else if (data == 0) {
                        alert("Term does not exist.");
                    }
                    else if (data == 1) {
                        alert("Term and definition have been deleted successfully");
                        this.ngOnInit();
                    }
                });
        }
    }

    onUpdate(updateddata: IGlossaryViewModel): void {
        this.glossaryData[this.editIndex - 1] = updateddata;
        this.editIndex = -1;
    }
    onCancel(): void {
        this.editIndex = -1;
    }

    getIndex(alphabet: string, index: number): number {
        return index + this.alphabets[alphabet];
    }

    listkeys(model: IALphabetCount): string[] {
        let keys: string[] = new Array();
        var objectKeys = Object.keys;
        keys = objectKeys(model);
        return keys;

    }

    onfocus(key: string): any {

        if (this.alphabets[key] > this.endIndex) {
            this.startIndex = this.endIndex + 1;
            this.endIndex = this.alphabets[key] + this.elementcount;
            this.LoadTerms(this.startIndex, this.endIndex);
        }




    }

    onalphabetclick(key: string): any {
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
    }
    customAffix: {
        'aToXbottom38': boolean,
        'affix':boolean
    }
    onScroll(event: any) {
        let scrollTop =  (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        let innerHeight = window.innerHeight;
        let docHeight = document.documentElement.offsetHeight;

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
            }
        }
        else if (scrollTop > 205) {
            this.customAffix = {
                'aToXbottom38': false,
                'affix': true
            }
        }
        else {
            this.customAffix = {
                'aToXbottom38': false,
                'affix': false
            }
        }
    }
}
