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
export class HomeComponent implements OnInit, AfterViewInit {
    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['group', 'left', 'right', 'actions'];
    selectedGroup = '';
    groupList: string[];
    formActions: FormActions;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public rest: DataService, private matDialog: MatDialog) {
    }


    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    ngOnInit(): void {
        this.getComparisons();
        this.getGroupList();
    }


    onIconClick(action: FormActions, compare?: ICompare): void {
        const dialogConfig = new MatDialogConfig();

        if (compare === undefined){
            compare = {group: '', left: '', right: ''};
        }
        dialogConfig.data = ({ action, data: compare } as IFormData);
        console.log(dialogConfig.data);
        const dialogRef = this.matDialog.open(FormCompareComponent, dialogConfig);

        // Returned data on close
        dialogRef.afterClosed().subscribe(value => {
            if (value.action === 'Delete' || value.action === 'New') {
                this.getComparisons();
                this.getGroupList();
            }
        });

    }


    getComparisons(): void {
        this.rest.getComparisons(this.selectedGroup).subscribe((data: ICompare[]) => {
            this.dataSource.data = data;
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
