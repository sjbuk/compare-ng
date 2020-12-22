import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormActions, ICompare } from '../../services/interfaces';


@Component({
    selector: 'app-compare-list',
    templateUrl: './compare-list.component.html',
    styleUrls: ['./compare-list.component.scss']
})
export class CompareListComponent implements OnInit, AfterViewInit {
    private _compareList: ICompare[] = [];
    private _displayedColumns: string[] = ['group', 'left', 'right', 'actions'];
    @Input()
    get CompareList(): ICompare[] { return this._compareList; }
    set CompareList(CompareList: ICompare[]) {
        this._compareList = CompareList;

        // Check _compareList has data and add it to tabel datasource
        if (this._compareList) {
            this.dataSource.data = this._compareList;
        }
        this.groupList = [... new Set(this._compareList.map(value => value.group))];
    }
    @Input() canUpdate = true;
    @Input() canAdd = true;
    @Input() canRun = true;
    @Input() canDelete = true;
    @Input() canGrouBy = true;


    dataSource = new MatTableDataSource();

    selectedGroup = '';
    groupList: string[];
    formActions: FormActions;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor() {
    }


    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onIconClick(action: FormActions, compare?: ICompare): void {
    }

    getDisplayColumns(): string[] {
        const showActionCol = this.canDelete || this.canRun || this.canUpdate;
        return this._displayedColumns.filter(col => col !== 'actions' || showActionCol);
    }

}
