import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormActions, ICompare, IFormData } from '../../services/interfaces';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    dataSource: ICompare[] = [];
    displayedColumns: string[] = ['group', 'left', 'right', 'actions'];
    selectedGroup = '';
    groupList: string[];
    formActions: FormActions;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public rest: DataService) {
    }




    ngOnInit(): void {
        this.getComparisons();

    }


    onIconClick(e: IFormData): void {
        switch (e.action) {
            case 'New':
                this.rest.addComparison(e.data)
                    .subscribe(_ => this.getComparisons());
                break;
            case 'Update':
                this.rest.updateComparison(e.data).subscribe();
                break;
            case 'Delete':
                this.rest.deleteComparison(e.data._id)
                    .subscribe(_ => this.getComparisons());
                break;
            case 'Run':
                this.rest.runCompare(e.data._id);
                this.getComparisons();
                break;
            default:
                break;
        }
    }


    getComparisons(): void {
        this.rest.getComparisons(this.selectedGroup).subscribe((data: ICompare[]) => {
            this.dataSource = data;
        });
    }
}
