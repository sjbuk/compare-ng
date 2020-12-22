import { AfterViewInit, Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormActions, ICompare, IFormData } from '../../services/interfaces';


@Component({
    selector: 'app-compare-list',
    templateUrl: './compare-list.component.html',
    styleUrls: ['./compare-list.component.scss']
})
export class CompareListComponent implements OnInit, AfterViewInit {
    private _compareList: ICompare[] = [];
    @Input()
    get CompareList(): ICompare[] { return this._compareList; }
    set CompareList(CompareList: ICompare[]) {
        this._compareList = CompareList;
        if (this._compareList) {
            this.dataSource.data = this._compareList;
            //this.ref.detectChanges();
            console.log(this.dataSource.data);
        }

    }

    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['group', 'left', 'right', 'actions'];
    selectedGroup = '';
    groupList: string[];
    formActions: FormActions;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private ref: ChangeDetectorRef) {
    }


    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onIconClick(action: FormActions, compare?: ICompare): void {
    }



}
