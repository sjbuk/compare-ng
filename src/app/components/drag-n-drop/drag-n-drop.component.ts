import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';



@Component({
    selector: 'app-drag-n-drop',
    templateUrl: './drag-n-drop.component.html',
    styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent implements OnInit {
    @Input() files: any[];
    @Input() stuff: string;
    @Output() fileDrop: EventEmitter<any[]> = new EventEmitter();

    // files: any[] = [];

    constructor() { }

    ngOnInit(): void {
        if (this.files === undefined) {
            this.files = [];
        }
    }

    /**
     * on file drop handler
     */
    onFileDropped($event) {
        this.prepareFilesList($event);
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(files) {
        this.prepareFilesList(files);
    }

    /**
     * Delete file from files list
     * @param index (File index)
     */
    deleteFile(index: number) {
        this.files.splice(index, 1);
        this.fileDrop.emit(this.files);
    }

    /**
     * Simulate the upload process
     */


    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: Array<any>) {
        for (const item of files) {
            this.files.push(item);
        }
        this.fileDrop.emit(files);
    }

    formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}
