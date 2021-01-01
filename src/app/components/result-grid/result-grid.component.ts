import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-result-grid',
    templateUrl: './result-grid.component.html',
    styleUrls: ['./result-grid.component.scss']
})
export class ResultGridComponent implements OnInit {
    kind = [
        { key: 'E' , value: 'Value change' },
        { key: 'D' , value: 'Deleted' },
        { key: 'N' , value: 'New/Added' },
        { key: 'A' , value: 'Array change' },
    ];
    constructor() { }
    @Input() result: any;

    ngOnInit(): void {
    }

    kindDescription(kind: string): string{
        return this.kind.find(e => e.key === kind).value;
    }

}
