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
  // state variables to allow all methods to access them
  image: HTMLImageElement = null;
  imageName: string = null;
  draw: boolean = false;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  Point1: Point;
  Point2: Point;
  annotations: Array<Annotations> = [];
  JSONbutton: boolean = false;
  JSONoutput: string = null;

  // handles uploading images and drawing it on the canvas
  uploadImage = (event: any) => {
    if (event.target.files) {
      // gets the image uploaded
      const file = event.target.files[0];
      const fileReader = new FileReader();
      // turns the image into a string to be read by other elements
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        this.image = new Image(750, 500);
        // sets the new image to the image uploaded
        this.image.src = fileReader.result as string;
        // gets the canvas element from HTML file
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.image.onload = () => {
          // sets the state variable to be the name of the image uploaded
          this.imageName = file.name;
          // creates a new Annotations object to handle new annotations for this image
          this.annotations.push(new Annotations(file.name));
          // draws the uploaded image on the canvas
          this.context.drawImage(this.image, 0, 0, 750, 500);
        };
      };
    }
  }

  // confirms the selected rectangle on the canvas and adds the annotation given "Interesting" or "Uninteresting"
  // type is the parameter that holds either "Interesting" or "Uninteresting" annotation passed by button that is clicked in the HTML file
  confirmSelected = (event: any, type: string) => {
    if (this.image == null) {
    } else {
      // finds the index for the Annotations object of this current image
      const index = this.annotations.findIndex(image => {
        return image.imageName === this.imageName;
      });
      // creates a random string
      const random = Math.floor((Math.random() * 10000) + 8).toString();
      // adds a new Annotation to the Annotations object for this image using the add method defined in the class
      this.annotations[index].add(new Annotation(random, this.Point1, this.Point2, type));
      this.drawSelected();
      // updates the JSON output if button is clicked
      if (this.JSONbutton) {
        this.getOutput();
      }
    }
  }

  // draws the confirmed annotations for current image on canvas
  drawSelected = () => {
    // finds the index for the Annotations object of this current image
    const index = this.annotations.findIndex(image => {
      return image.imageName === this.imageName;
    });
    // draws the current image on canvas
    this.context.drawImage(this.image, 0, 0, 750, 500);

    // draws the confirmed rectangles on the canvas using the information about points in Annotation object
    this.annotations[index].annotations.forEach(annotation => {
      this.context.beginPath();
      this.context.lineWidth = 2;
      // decides the color of the rectangle based on type
      if (annotation.type === 'Interesting') {
        this.context.strokeStyle = 'green';
      } else {
        this.context.strokeStyle = 'orange';
      }
      // draws the rectangle based on the information in the Annotation object
      this.context.strokeRect(
        annotation.upperLeft.x,
        annotation.upperLeft.y,
        Math.abs(annotation.upperLeft.x - annotation.lowerRight.x),
        Math.abs(annotation.upperLeft.y - annotation.lowerRight.y));
      this.context.strokeStyle = 'black';
      this.context.stroke();
    });
  }

  // creates a new rectangle on canvas
  beginSelecting = (event: any) => {
    if (this.imageName != null) {
      const rectangle = this.canvas.getBoundingClientRect();
      const random = Math.floor((Math.random() * 10000) + 8).toString();
      // creates a new Point object to handle new starting point which is top left of the new rectangle on canvas
      this.Point1 = new Point(random, event.pageX - rectangle.left, event.pageY - rectangle.top);
      this.draw = true;
    }
  }

  // updates the size of the rectangle as the user drags the rectangle to increase/decrease the size of it when selecting
  select = (event: any) => {
    if (this.draw) {
      const rectangle = this.canvas.getBoundingClientRect();
      const xMiddle = event.pageX - rectangle.left;
      const yMiddle = event.pageY - rectangle.top;
      this.context.beginPath();
      this.context.lineWidth = 2;
      // clears previous rectangle
      this.context.clearRect(this.Point1.x, this.Point1.y, Math.abs(xMiddle - this.Point1.x), Math.abs(yMiddle - this.Point1.y));
      // redraws the confirmed rectangles
      this.drawSelected();
      // draws a new updated rectangle from the same starting point but larger or smaller rectangle
      this.context.strokeRect(this.Point1.x, this.Point1.y, Math.abs(xMiddle - this.Point1.x), Math.abs(yMiddle - this.Point1.y));
      this.context.stroke();
    }
  }

  // Makes the rectangle stay on the canvas after the user finishes changing the size of the rectangle
  finishSelecting = (event: any) => {
    if (this.draw) {
      const rectangle = this.canvas.getBoundingClientRect();
      // random string
      const random = Math.floor((Math.random() * 10000) + 8).toString();
      // creates a new Point object for the bottom right of the rectangle
      this.Point2 = new Point(random, event.pageX - rectangle.left, event.pageY - rectangle.top);
      this.draw = false;
    }
  }

  // sets the output of the JSONoutput state variable to data about the confirmed annotations in JSON format
  // the HTML element linked to this state variable in the HTML file will update its content when this variable changes
  getOutput = () => {
    const output: string = JSON.stringify(this.annotations);
    this.JSONoutput = output === '[]' ? null : output;
    this.JSONbutton = true;
  }

  // clears all annotations of this current image
  clear = (event: any) => {
    // finds the index of the Annotations object for this image
    const index = this.annotations.findIndex(image => {
      return image.imageName === this.imageName;
    });
    if (index !== -1) {
      // removes the Annotations object of this current image
      this.annotations.splice(index, 1);
      this.getOutput();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let fileElement = document.getElementById('imageUpload') as HTMLInputElement;
      fileElement.value = '';
      this.imageName = null;
      this.image = null;
      this.canvas = null;
      this.context = null;
      this.Point1 = null;
      this.Point2 = null;
    }
  }
}
