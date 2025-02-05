import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() processingData = new EventEmitter<{ mode: 'sample' | 'upload'; base64: string }>();
  @ViewChild('fileInput') myInput!: ElementRef;

  convertToBase64(file: File, mode: 'sample' | 'upload') {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const [_, result] = reader.result.split(',');
        this.processingData.emit({ mode, base64: result });
      }
    };
    reader.readAsDataURL(file);
  }

  handleImageClick(event: Event) {
    const target = event.target as HTMLImageElement;
    const url = target.src;

    fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const file = new File([blob], 'image.jpg', { type: blob.type });
      this.convertToBase64(file, 'sample');
    })
    .catch((error) => console.error('Error fetching image:', error));
  }

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.convertToBase64(file, 'upload');
    }
  }

  triggerFileInput() {
    this.myInput.nativeElement.click()
  }
}
