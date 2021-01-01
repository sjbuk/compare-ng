import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
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
    CompareList$ = new BehaviorSubject(this.CompareList);
    constructor(public rest: DataService) { }

    ngOnInit(): void {
    }
    onFileDrop(e: any): void {
        this.CompareList = [];
        this.files.map(async (value: any) => {
            value.validated = this.validateFile(value);
            if (value.validated) {
                const fileContents = await getFileContents(value);
                this.CompareList = this.CompareList.concat(csvToJson(fileContents));
                this.CompareList$.next(this.CompareList);
            }
        });
    }

    handleActionEvent(e: any): void {
        if (e.action === 'Delete') {
            const indexToRemove = this.CompareList.findIndex(((value, index) => value._id === e.data._id));

            if (indexToRemove !== -1) {
                this.CompareList.splice(indexToRemove, 1);
                this.CompareList = [...this.CompareList];
            }
        }
    }

    validateFile(file: any): boolean {
        return RegExp('\.(csv)$').test(file.name);
    }
    uploadRecords(): void{
        this.CompareList.map((value) => {
            const rec: ICompare = {group: value.group, left: value.left, right: value.right};
            this.rest.addComparison(rec).subscribe();
        });

    }
}
