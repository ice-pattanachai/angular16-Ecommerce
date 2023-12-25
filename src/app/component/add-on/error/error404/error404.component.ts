import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})

export class Error404Component {

}
// export class Error404Component implements OnInit{
//   particles: MagicParticle[] = [];

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   ngOnInit() {
//     // Create and append particles to the component
//     for (let i = 0; i < 50; i++) {
//       const particle = new MagicParticle(
//         Math.random() * window.innerWidth,
//         Math.random() * window.innerHeight
//       );
//       this.particles.push(particle);
//       this.appendParticleToDOM(particle);
//     }
//   }

//   private appendParticleToDOM(particle: MagicParticle) {
//     const particleElement = this.renderer.createElement('div');
//     this.renderer.setStyle(particleElement, 'position', 'absolute');
//     this.renderer.setStyle(particleElement, 'left', `${particle.x}px`);
//     this.renderer.setStyle(particleElement, 'top', `${particle.y}px`);
//     this.renderer.setStyle(particleElement, 'width', `${particle.size}px`);
//     this.renderer.setStyle(particleElement, 'height', `${particle.size}px`);
//     this.renderer.setStyle(particleElement, 'border-radius', '50%');
//     this.renderer.setStyle(particleElement, 'background-color', particle.baseColor.toString());
//     this.renderer.appendChild(this.el.nativeElement, particleElement);
//   }
// }


// class MagicParticle {
//   x: number;
//   y: number;
//   size: number;
//   baseColor: string;
//   speedX: number = 1; // Add your desired speed values
//   speedY: number = 1; // Add your desired speed values

//   constructor(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//     this.size = Math.random() * (30 - 10) + 10;
//     this.baseColor = [
//       "#e84e66", "#67c69e", "#edf1f4", "#80acc9", "#73a8b0", "#fe817f", "#68d2a4", "#1d203f", "#c9a30d"
//     ][Math.floor(Math.random() * 9)];
//   }

//   update() {
//     this.x += this.speedX;
//     this.y += this.speedY;
//   }
// }