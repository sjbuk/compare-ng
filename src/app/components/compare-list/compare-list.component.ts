import { AfterViewInit, Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormActions, ICompare, IFormData } from '../../services/interfaces';
import { FormCompareComponent } from '../../components/form-compare/form-compare.component';
import { EventEmitter } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';



@Component({
    selector: 'app-compare-list',
    templateUrl: './compare-list.component.html',
    styleUrls: ['./compare-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class CompareListComponent implements OnInit, AfterViewInit {
    private _compareList: ICompare[] = [];
    private _displayedColumns: string[] = ['group', 'left', 'right', 'status', 'actions'];
    @Input()
    get CompareList(): ICompare[] { return this._compareList; }
    set CompareList(CompareList: ICompare[]) {
        this._compareList = CompareList;

        // Check _compareList has data and add it to tabel datasource
        if (this._compareList) {
            this.dataSource.data = this._compareList;
        }
        // Get unique values of group for GroupList
        this.groupList = [... new Set(this._compareList.map(value => value.group))];
    }
    @Input() canUpdate = true;
    @Input() canAdd = true;
    @Input() canRun = true;
    @Input() canDelete = true;
    @Input() canGrouBy = true;
    @Input() showStatusCol = true;


    dataSource = new MatTableDataSource();

    selectedGroup = '';
    groupList: string[];
    formActions: FormActions;
    expandedElement: ICompare | null;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Output() newActionEvent = new EventEmitter<IFormData>();

    constructor(private matDialog: MatDialog) {
    }


    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onIconClick(action: FormActions, compare?: ICompare): void {
        const dialogConfig = new MatDialogConfig();

        if (compare === undefined) {
            compare = { group: '', left: '', right: '' };
        }
        dialogConfig.data = ({ action, data: compare } as IFormData);
        const dialogRef = this.matDialog.open(FormCompareComponent, dialogConfig);

        // Returned data on close
        dialogRef.afterClosed().subscribe(value => {
            this.newActionEvent.emit(value);
        });

    }
    onGroupChange(e): void {
        if (e.value === '') {
            this.dataSource.data = this._compareList;
        } else {
            this.dataSource.data = this._compareList.filter((element) => element.group === e.value);
        }
    }

    getDisplayColumns(): string[] {
        const showActionCol = this.canDelete || this.canRun || this.canUpdate;
        return this._displayedColumns.filter(col => ((col === 'actions' && !showActionCol)
            || (col === 'status' && !this.showStatusCol)) ? false : true);
    }

}
