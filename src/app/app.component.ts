import { Component } from '@angular/core';
import {Point} from './classes';
import {Annotation} from './classes';
import {Annotations} from './classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  image: HTMLImageElement = null;
  imageName: string = null;
  draw: boolean = false;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  Point1: Point;
  Point2: Point;
  annotations: Array<Annotations> = [];

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
          this.imageName = file.name;
          this.annotations.push(new Annotations(file.name));
          this.context.drawImage(this.image, 0, 0, 700, 500);
        }
      };
    }
  }

  confirmSelected = (event: any, type: string) => {
    if (this.image == null) {
    } else {
      const index = this.annotations.findIndex(image => {
        return image.imageName === this.imageName;
      });
      const random = Math.floor((Math.random() * 10000) + 8).toString();
      this.annotations[index].add(new Annotation(random, this.Point1, this.Point2, type));
      this.drawSelected();
    }
  }

  drawSelected = () => {
    const index = this.annotations.findIndex(image => {
      return image.imageName === this.imageName;
    });
    this.context.drawImage(this.image, 0, 0, 700, 500);
    this.annotations[index].annotations.forEach(annotation => {
      this.context.beginPath();
      this.context.lineWidth = 2;
      if (annotation.type === 'Interested') {
        this.context.strokeStyle = 'green';
      } else {
        this.context.strokeStyle = 'orange';
      }
      this.context.strokeRect(
        annotation.upperLeft.x,
        annotation.upperLeft.y,
        Math.abs(annotation.upperLeft.x - annotation.lowerRight.x),
        Math.abs(annotation.upperLeft.y - annotation.lowerRight.y));
      this.context.strokeStyle = 'black';
      this.context.stroke();
    });
  }

  beginSelecting = (event: any) => {
    const rectangle = this.canvas.getBoundingClientRect();
    const random = Math.floor((Math.random() * 10000) + 8).toString();
    this.Point1 = new Point(random, event.pageX - rectangle.left, event.pageY - rectangle.top);
    this.draw = true;
  }

  select = (event: any) => {
    if (this.draw) {
      const rectangle = this.canvas.getBoundingClientRect();
      const xMiddle = event.pageX - rectangle.left;
      const yMiddle = event.pageY - rectangle.top;
      this.context.beginPath();
      this.context.lineWidth = 2;
      this.context.clearRect(this.Point1.x, this.Point1.y, Math.abs(xMiddle - this.Point1.x), Math.abs(yMiddle - this.Point1.y));
      this.drawSelected();
      this.context.strokeRect(this.Point1.x, this.Point1.y, Math.abs(xMiddle - this.Point1.x), Math.abs(yMiddle - this.Point1.y));
      this.context.stroke();
    }
  }

  finishSelecting = (event: any) => {
    const rectangle = this.canvas.getBoundingClientRect();
    const random = Math.floor((Math.random() * 10000) + 8).toString();
    this.Point2 = new Point(random, event.pageX - rectangle.left, event.pageY - rectangle.top);
    this.draw = false;
  }
}
