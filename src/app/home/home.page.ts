import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentTime: string = ""; // Inicializa la propiedad currentTime
  imagenParaMostrar: string = "";
  imagenTomada: any;

  constructor() {
    this.updateTime(); // Inicia el reloj
    setInterval(() => {
      this.updateTime(); // Actualiza el reloj cada segundo
    }, 1000);
  }

  ngOnInit(): void {
    Camera.requestPermissions(); // Solicita permisos de la cámara cuando la página se inicializa
  }

  async getPicture() {
    this.imagenTomada = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,

    });
    if (this.imagenTomada) {
      this.imagenParaMostrar = this.imagenTomada.webPath;
    }
  }

  updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes: any = now.getMinutes();
    let seconds: any = now.getSeconds();

    // Agrega ceros a la izquierda si es necesario para mantener el formato hh:mm:ss
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    this.currentTime = hours + ':' + minutes + ':' + seconds;
  }
}
