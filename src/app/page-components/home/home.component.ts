import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormActions, ICompare, IFormData } from '../../services/interfaces';
import { Observable } from 'rxjs';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    displayedColumns: string[] = ['group', 'left', 'right', 'actions'];
    formActions: FormActions;

    dataSource$ = this.rest.comparisons$;
    groups$ = this.rest.groups$;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public rest: DataService) {
    }

    ngOnInit(): void{
        this.rest.refreshComparisons();
        this.rest.selectedGroupChange('');
    }

    onIconClick(e: IFormData): void {
        switch (e.action) {
            case 'New':
                this.rest.addComparison(e.data)
                    .subscribe();
                break;
            case 'Update':
                this.rest.updateComparison(e.data).subscribe();
                break;
            case 'Delete':
                this.rest.deleteComparison(e.data._id)
                    .subscribe();
                break;
            case 'Run':
                this.rest.runCompare(e.data._id);
                break;
            default:
                break;
        }
    }


}
