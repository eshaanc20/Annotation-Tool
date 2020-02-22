import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  image: string = null;
  uploadImage = (event: any) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        let newImage = new Image(100,100);
        newImage.src = fileReader.result as string;
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext('2d');
        newImage.onload = () => {
          context.drawImage(newImage, 0, 0, 700, 500);
        }
      };
    }
  }
}
