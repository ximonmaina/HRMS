import { NgFor, NgIf } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, numberAttribute, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  imports: [NgIf, NgFor],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  @Input({required: true}) label!: string;
  @Input({
    transform: (value: string) => value.split(',')
  }) accept: string[] = [];

  // for cases where type-casting for numbers or boolean values may be required, 
  // Angular provides some in-built transformer functions for this purpose
  // <some-component numberProperty="12" booleanProperty="true"></some-component>
  @Input({transform: booleanAttribute}) booleanProperty = false;
  @Input({transform: numberAttribute}) numberProperty = 0;

  @Output() selected = new EventEmitter<FileList>();
  errorMessage = '';

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.errorMessage = Array.from(files)
      .every(f => this.accept.includes(f.type))
      ? '' : 'Invalid file type';

      if(this.errorMessage === '') {
        this.selected.emit(files);
      }
  }
}
