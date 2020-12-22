import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImportWizardComponent } from '../../components/import-wizard/import-wizard.component'


@Component({
    selector: 'app-page-test',
    templateUrl: './page-test.component.html',
    styleUrls: ['./page-test.component.scss']
})

export class PageTestComponent implements OnInit {

    constructor(private matDialog: MatDialog) { }

    ngOnInit(): void {
    }



}
