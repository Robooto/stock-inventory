import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { Product } from '../../models/product.interface';

@Component({
    selector: 'stock-upload',
    styles: [''],
    templateUrl: './stock-upload.component.html'
})
export class StockUploadComponent {
    errors: Array<string> = [];
    dragAreaClass: string = 'dragarea';
    @Input() projectId: number;
    @Input() sectionId: number;
    @Input() fileExt: string = "JPG, GIF, PNG, PDF";
    @Input() maxFiles: number = 5;
    @Input() maxSize: number = 5; // 5MB
    @Output() uploadStatus = new EventEmitter();
    @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
    @Output() private filesInvalidEmiter: EventEmitter<File[]> = new EventEmitter();
    constructor() { }

    ngOnInit() { }

    onFileChange(event) {
        let files = event.target.files;
        this.saveFiles(files);
    }

    @HostListener('dragover', ['$event']) onDragOver(event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }

    @HostListener('dragenter', ['$event']) onDragEnter(event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }

    @HostListener('dragend', ['$event']) onDragEnd(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    @HostListener('drop', ['$event']) onDrop(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
        event.stopPropagation();
        var files = event.dataTransfer.files;
        this.saveFiles(files);
    }


    saveFiles(files) {
        let valid_files : Array<File> = [];
        this.errors = []; // Clear error
        // Validate file size and allowed extensions
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit(false);
            return;
        }

        if (files.length > 0) {
            let formData: FormData = new FormData();
            for (var j = 0; j < files.length; j++) {
                valid_files.push(files[j]);
            }
            this.filesChangeEmiter.emit(valid_files);
        }
    }


    private isValidFiles(files) {
        // Check Number of files
        if (files.length > this.maxFiles) {
            this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
            return;
        }
        this.isValidFileExtension(files);
        return this.errors.length === 0;
    }

    private isValidFileExtension(files) {
        // Make array of file extensions
        var extensions = (this.fileExt.split(','))
            .map(function (x) { return x.toLocaleUpperCase().trim() });

        for (var i = 0; i < files.length; i++) {
            // Get file extension
            var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            var exists = extensions.includes(ext);
            if (!exists) {
                this.errors.push("Error (Extension): " + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
    }


    private isValidFileSize(file) {
        var fileSizeinMB = file.size / (1024 * 1000);
        var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
        if (size > this.maxSize)
            this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
    }

}