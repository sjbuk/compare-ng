import { AfterViewInit, Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormActions, ICompare, IFormData } from '../../services/interfaces';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormCompareComponent } from '../../components/form-compare/form-compare.component';



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
        this.getGroupList();
    }


    onIconClick(e: IFormData): void {
        switch (e.action) {
            case 'New':
                this.rest.addComparison(e.data);
                this.getComparisons();
                break;
            case 'Update':
                this.rest.updateComparison(e.data);
                break;
            case 'Delete':
                this.rest.deleteComparison(e.data._id);
                this.getComparisons();
                break;
            case 'Run':
                // TODO: Impliment Run
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

    getGroupList(): void {
        this.rest.getGroups().subscribe((data: string[]) => {
            this.groupList = data;
        });
    }

    onGroupChange(e: Event): void {
        this.getComparisons();
    }
}
