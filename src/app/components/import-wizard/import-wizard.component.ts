import { Component, OnInit } from '@angular/core';
import { csvToJson, getFileContents } from 'src/app/helper/utulity';
import { DataService } from 'src/app/services/data.service';
import { ICompare } from 'src/app/services/interfaces';


@Component({
    selector: 'app-import-wizard',
    templateUrl: './import-wizard.component.html',
    styleUrls: ['./import-wizard.component.scss']
})
export class ImportWizardComponent implements OnInit {
    files: File[] = [];
    CompareList: ICompare[] = [];
    constructor(public rest: DataService) { }

    ngOnInit(): void {
    }
    onFileDrop(e: any): void {
        console.log('Drop Event');
        this.CompareList = [];
        this.files.map(async (value: any) => {
            value.validated = this.validateFile(value);
            if (value.validated) {
                const fileContents = await getFileContents(value);
                this.CompareList = this.CompareList.concat(csvToJson(fileContents));
            }
        });
    }

    handleActionEvent(e: any): void {
        console.log(e);
        if (e.action === 'Delete') {
            const indexToRemove = this.CompareList.findIndex(((value, index) => value._id === e.data._id));
            console.log(`Index: ${indexToRemove}`);
            console.log(this.CompareList);

            if (indexToRemove !== -1) {
                this.CompareList.splice(indexToRemove, 1);
                this.CompareList = [...this.CompareList];
            }
            console.log(this.CompareList);

        }
    }
    validateFile(file: any): boolean {
        return RegExp('\.(csv)$').test(file.name);
    }
    uploadRecords(): void{
        this.CompareList.map((value) => {
            const rec: ICompare = {group: value.group, left: value.left, right: value.right};
            this.rest.addComparison(rec);
        });

    }
}
