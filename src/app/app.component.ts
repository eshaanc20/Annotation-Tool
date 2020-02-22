import { Component } from '@angular/core';
import {Point} from './classes';
import {Annotation} from './classes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  image: HTMLImageElement = null;
  draw: boolean = false;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  length: number;
  width: number;
  Point1: Point;
  Point2: Point;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  annotations: Array<Annotation>;

  uploadImage = (event: any) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        this.image = new Image();
        this.image.src = fileReader.result as string;
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.image.onload = () => {
          this.context.drawImage(this.image, 0, 0, 700, 500);
        }
      };
    }
  }

  beginSelecting = (event: any) => {
    const rectangle = this.canvas.getBoundingClientRect();
    this.x1 = event.pageX - rectangle.left;
    this.y1 = event.pageY - rectangle.top;
    this.draw = true;
  }

  select = (event: any) => {
    const rectangle = this.canvas.getBoundingClientRect();
    const xMiddle = event.pageX - rectangle.left;
    const yMiddle = event.pageY - rectangle.top;
    if (this.draw) {
      if (this.draw) {
        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.clearRect(this.x1, this.y1, Math.abs(xMiddle - this.x1), Math.abs(yMiddle - this.y1));
        this.context.drawImage(this.image, 0, 0, 700, 500);
        this.context.strokeRect(this.x1, this.y1, Math.abs(xMiddle - this.x1), Math.abs(yMiddle - this.y1));
        this.context.stroke();
      }
    }
  }

  finishSelecting = (event: any) => {
    const rectangle = this.canvas.getBoundingClientRect();
    this.x2 = event.pageX - rectangle.left;
    this.y2 = event.pageY - rectangle.top;
    this.draw = false;
  }
}
