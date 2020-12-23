// https://www.techiediaries.com/angular-material-dialogs/
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { IFormData } from '../../services/interfaces';


@Component({
    selector: 'app-form-compare',
    templateUrl: './form-compare.component.html',
    styleUrls: ['./form-compare.component.scss']
})
export class FormCompareComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<FormCompareComponent>,  // Dialog Reference
        @Inject(MAT_DIALOG_DATA) public data: IFormData,
        public rest: DataService) { } // Inject Data

    ngOnInit(): void {
    }

    formAction(): void {
        // switch (this.data.action) {
        //     case 'Delete':
        //         this.rest.deleteComparison(this.data.data._id);
        //         break;

        //     case 'Update':
        //         this.rest.updateComparison(this.data.data);
        //         break;
        //     case 'Run':

        //         break;

        //     case 'New':
        //         this.rest.addComparison(this.data.data);
        //         break;
        //     default:
        //         break;
        // }
        this.dialogRef.close(this.data);
    }



    close(): void {
        this.dialogRef.close({action: ''});
    }
}
