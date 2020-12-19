import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormCompareComponent } from '../form-compare/form-compare.component';
import { ICompare } from '../interfaces';

@Component({
    selector: 'app-page-test',
    templateUrl: './page-test.component.html',
    styleUrls: ['./page-test.component.scss']
})

export class PageTestComponent implements OnInit {

    constructor(private matDialog: MatDialog) { }

    ngOnInit(): void {
    }

    openDialog(): void {
        const dialogConfig = new MatDialogConfig();
        const x: ICompare = { _id: '0000', group: 'BORG', left: 'LEFT', right: 'right' }
        dialogConfig.data = { action: 'Update', compare: x };
        dialogConfig.data.compare = x;
        const dialogRef = this.matDialog.open(FormCompareComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(value => {
            console.log(value);
        });

    }


}
