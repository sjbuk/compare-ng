import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-grid',
  templateUrl: './result-grid.component.html',
  styleUrls: ['./result-grid.component.scss']
})
export class ResultGridComponent implements OnInit {

  constructor() { }
  @Input() result: any;

  ngOnInit(): void {
  }

}
