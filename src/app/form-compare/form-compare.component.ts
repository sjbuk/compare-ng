// https://www.techiediaries.com/angular-material-dialogs/
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-form-compare',
    templateUrl: './form-compare.component.html',
    styleUrls: ['./form-compare.component.scss']
})
export class FormCompareComponent implements OnInit {
    other = 'HELLO';
    constructor(
        public dialogRef: MatDialogRef<FormCompareComponent>,  // Dialog Reference
        @Inject(MAT_DIALOG_DATA) public data: any) { } // Inject Data

    ngOnInit(): void {
    }

    formAction(): void {
        console.log(this.data);
        this.dialogRef.close(this.data);
    }



    close(): void {
        this.dialogRef.close();
    }
}
