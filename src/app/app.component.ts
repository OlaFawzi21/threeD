import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThreeComponent } from "./components/three/three.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'metatask';
}
