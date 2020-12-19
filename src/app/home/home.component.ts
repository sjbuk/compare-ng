import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { MatIcon} from '@angular/material/icon'
import { ICompare } from '../interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['group', 'left', 'right', 'actions'];
    selectedGroup: string = ""
    groupList: String[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(public rest: DataService) {
   }

    ngAfterViewInit(){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit() {
        this.getComparisons()
        this.getGroupList()
    }
    

    onIconClick(action: string, id: string){
        console.log (`Action:${action}  id:${id}`);
    }
    getComparisons() {
        this.rest.getComparisons(this.selectedGroup).subscribe((data: ICompare[]) => {
            this.dataSource.data = data;
        });
    }

    getGroupList(){
        this.rest.getGroups().subscribe((data: string[]) =>{
            this.groupList = data;
        })
    }

    onGroupChange (e: Event){
        this.getComparisons()
    }
}
