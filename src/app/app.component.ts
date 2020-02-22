import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  image: string = null;
  draw: boolean = false;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  length: number;
  width: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  rectangle;

  uploadImage = (event: any) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        let newImage = new Image();
        newImage.src = fileReader.result as string;
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        newImage.onload = () => {
          this.context.drawImage(newImage, 0, 0, 700, 500);
        }
      };
    }
  }

  beginSelecting = (event: any) => {
    this.rectangle = this.canvas.getBoundingClientRect();
    this.x1 = event.pageX - this.rectangle.left;
    this.y1 = event.pageY - this.rectangle.top;
    this.draw = true;
  }

  finishSelecting = (event: any) => {
    this.x2 = event.pageX - this.rectangle.left;
    this.y2 = event.pageY - this.rectangle.top;
    if (this.draw) {
      this.context.beginPath();
      this.context.lineWidth = 4;
      this.context.strokeRect(this.x1, this.y1, Math.abs(this.x2 - this.x1), Math.abs(this.y2 - this.y1));
      this.context.stroke();
    }
    this.draw = false;
  }
}
