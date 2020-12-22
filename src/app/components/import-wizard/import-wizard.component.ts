import { createElementCssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { csvToJson, getFileContents } from 'src/app/helper/utulity';
import { ICompare } from 'src/app/services/interfaces';


@Component({
    selector: 'app-import-wizard',
    templateUrl: './import-wizard.component.html',
    styleUrls: ['./import-wizard.component.scss']
})
export class ImportWizardComponent implements OnInit {
    files: any[] = [];
    CompareList: ICompare[];
    constructor() { }

    ngOnInit(): void {
    }
    async onFileDrop(e: Event): Promise<void> {
        console.log('Drop Event');
        this.files = this.files.map(async (value: any) => {
            value.validated = this.validateFile(value);
            if (value.validated) {
                const fileContents = await getFileContents(value);
                this.CompareList = csvToJson(fileContents);
                console.log(this.CompareList);
            }
        });
    }

    validateFile(file: any): boolean {
        return RegExp('\.(csv)$').test(file.name);
    }
}
